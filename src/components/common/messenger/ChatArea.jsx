import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, Send, X } from 'lucide-react';
import MessageBubble from './MessageBubble';
import UserAvatar from './UserAvatar';

function ChatSkeleton() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          <div className={`h-12 rounded-2xl bg-gray-100 animate-pulse ${index % 2 === 0 ? 'w-2/3' : 'w-1/2'}`} />
        </div>
      ))}
    </div>
  );
}

export default function ChatArea({
  activeChat,
  messages,
  onBack,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onTyping,
  onStopTyping,
  isPartnerTyping,
  isSending,
  isLoading,
  sharedInbox,
  actionMessageId,
}) {
  const [inputText, setInputText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const isEditing = Boolean(editingMessageId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPartnerTyping]);

  useEffect(() => {
    setEditingMessageId(null);
    setInputText('');
  }, [activeChat?.id]);

  useEffect(() => {
    if (!editingMessageId) {
      return;
    }

    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      const length = input.value.length;
      input.focus();
      input.setSelectionRange(length, length);
    });
  }, [editingMessageId]);

  const startEdit = (message) => {
    setEditingMessageId(message.id);
    setInputText(message.text || '');
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setInputText('');
  };

  const handleSubmit = async () => {
    if (!inputText.trim() || isSending) {
      return;
    }

    if (isEditing) {
      const success = await onEditMessage?.(editingMessageId, inputText);
      if (success) {
        cancelEdit();
      }
      return;
    }

    const text = inputText;
    setInputText('');
    onTyping('');
    await onSendMessage(text);
  };

  if (!activeChat) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-white p-6 text-center">
        <div className="rounded-full bg-gray-50 p-6 mb-4">
          <Send size={32} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Your Messages</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          Select a conversation from the sidebar to start chatting with your concierge team.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-[97px] shrink-0 items-center gap-4 border-b border-gray-300 bg-white px-4 md:px-6 z-10">
        <button
          type="button"
          onClick={onBack}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="relative">
          <UserAvatar partner={activeChat.partner} className="h-10 w-10 md:h-12 md:w-12" textClassName="text-base" />
          {activeChat.online && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>
        <div>
          <h2 className="text-sm md:text-base font-bold text-[#257AFC]">{activeChat.name}</h2>
          {sharedInbox && activeChat.partner?.email && (
            <p className="text-[10px] md:text-xs font-medium text-gray-500 mt-0.5">
              {activeChat.partner.email}
            </p>
          )}
          {sharedInbox && !activeChat.partner?.email && (
            <p className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
              Shared inbox
            </p>
          )}
          {activeChat.online ? (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Active Now
              </span>
            </div>
          ) : isPartnerTyping ? (
            <p className="text-[10px] md:text-xs font-semibold text-[#257AFC] mt-0.5">Typing...</p>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {isLoading && !messages.length ? (
          <ChatSkeleton />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onStartEdit={startEdit}
                onDeleteMessage={onDeleteMessage}
                actionMessageId={actionMessageId}
                isBeingEdited={editingMessageId === message.id}
              />
            ))}
            {isPartnerTyping && (
              <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
                <UserAvatar partner={activeChat.partner} className="h-8 w-8" textClassName="text-xs" />
                <span>Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="bg-white p-4 mb-20 md:mb-0 md:p-6 md:pb-6 border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value);
              if (!isEditing) {
                onTyping?.(event.target.value);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
              }
              if (event.key === 'Escape' && isEditing) {
                event.preventDefault();
                cancelEdit();
              }
            }}
            onBlur={() => onStopTyping?.()}
            placeholder={isEditing ? 'Edit your message...' : 'Type your message here...'}
            disabled={isSending}
            className={`w-full rounded-2xl border bg-white py-3.5 pl-5 text-sm text-gray-900 outline-none shadow-sm transition-all disabled:opacity-60 ${
              isEditing
                ? 'border-[#257AFC] pr-24 ring-1 ring-[#257AFC]'
                : 'border-gray-100 pr-14 focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC]'
            }`}
          />

          {isEditing ? (
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={cancelEdit}
                disabled={isSending}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-60"
                aria-label="Cancel edit"
              >
                <X size={18} />
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSending || !inputText.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#257AFC] text-white hover:bg-blue-700 transition-colors disabled:opacity-60"
                aria-label="Save edit"
              >
                <Check size={18} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSending || !inputText.trim()}
              className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#257AFC] text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

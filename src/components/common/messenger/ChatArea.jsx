import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';

export default function ChatArea({ activeChat, messages, onBack, onSendMessage }) {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
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
      {/* Header */}
      <div className="flex h-[97px] shrink-0 items-center gap-4 border-b border-gray-300 bg-white px-4 md:px-6 z-10">
        <button 
          onClick={onBack}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="relative">
          <img 
            src={activeChat.avatar} 
            alt={activeChat.name} 
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border border-gray-100"
          />
          {activeChat.online && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>
        <div>
          <h2 className="text-sm md:text-base font-bold text-[#257AFC]">{activeChat.name}</h2>
          {activeChat.online && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="block h-1.5 w-1.5 rounded-full bg-green-500"></span>
              <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Now</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Date separator dummy */}
        <div className="flex justify-center mb-8 mt-2">
          <span className="rounded-full border border-gray-100 bg-white px-4 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase shadow-sm">
            Today
          </span>
        </div>

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 md:p-6 border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
            className="w-full rounded-2xl border border-gray-100 bg-white py-3.5 pl-5 pr-14 text-sm text-gray-900 outline-none focus:border-[#257AFC] focus:ring-1 focus:ring-[#257AFC] shadow-sm transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#257AFC] text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

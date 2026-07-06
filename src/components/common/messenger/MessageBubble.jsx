import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import UserAvatar from './UserAvatar';

function MessageActions({
  isOpen,
  onToggle,
  onClose,
  onEdit,
  onDelete,
  isActionLoading,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative shrink-0 self-center" ref={menuRef}>
      <button
        type="button"
        onClick={onToggle}
        disabled={isActionLoading}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 opacity-70 transition-opacity hover:bg-gray-100 hover:text-gray-600 hover:opacity-100 group-hover:opacity-100 disabled:opacity-40"
        aria-label="Message options"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1 min-w-[120px] overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete();
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({
  message,
  onStartEdit,
  onDeleteMessage,
  actionMessageId,
  isBeingEdited,
}) {
  const isOutgoing = message.sender === 'me';
  const displayText = message.isDeleted ? 'This message was deleted' : message.text;
  const [menuOpen, setMenuOpen] = useState(false);
  const isActionLoading = actionMessageId === message.id;

  const handleDelete = async () => {
    const success = await onDeleteMessage?.(message.id);
    if (success) {
      setMenuOpen(false);
    }
  };

  const bubbleClassName = message.isDeleted
    ? 'border border-gray-100 bg-gray-50 text-gray-400 italic'
    : isOutgoing
      ? 'bg-[#257AFC] text-white'
      : 'border border-gray-100 bg-white text-gray-700';

  const highlightClassName = isBeingEdited
    ? 'ring-2 ring-[#257AFC] ring-offset-2'
    : '';

  if (isOutgoing) {
    return (
      <div className="group mb-6 flex justify-end">
        <div className="flex max-w-[85%] flex-col items-end md:max-w-[70%]">
          <div className="flex items-start gap-1">
            {!message.isDeleted && !isBeingEdited && (
              <MessageActions
                isOpen={menuOpen}
                onToggle={() => setMenuOpen((open) => !open)}
                onClose={() => setMenuOpen(false)}
                onEdit={() => onStartEdit?.(message)}
                onDelete={handleDelete}
                isActionLoading={isActionLoading}
              />
            )}
            <div className={`w-fit max-w-full rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm shadow-sm ${bubbleClassName} ${highlightClassName}`}>
              <span className="whitespace-pre-wrap break-words">{displayText}</span>
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-gray-400">
            <span>{message.time}</span>
            {isBeingEdited && (
              <>
                <span>-</span>
                <span className="text-[#257AFC]">Editing</span>
              </>
            )}
            {message.editedAt && !message.isDeleted && (
              <>
                <span>-</span>
                <span>Edited</span>
              </>
            )}
            {message.status && (
              <>
                <span>-</span>
                <span>{message.status}</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-start gap-3">
      <UserAvatar partner={message.partner} className="mt-1 h-8 w-8 shrink-0" textClassName="text-xs" />
      <div className="flex min-w-0 max-w-[85%] flex-col items-start md:max-w-[70%]">
        <div className={`w-fit max-w-full rounded-2xl rounded-tl-sm px-5 py-3.5 text-sm shadow-sm ${bubbleClassName} ${highlightClassName}`}>
          <span className="whitespace-pre-wrap break-words">{displayText}</span>
        </div>
        <div className="mt-1.5 text-[12px] text-gray-400">
          <span>{message.time}</span>
          {message.editedAt && !message.isDeleted && (
            <>
              <span> · </span>
              <span>Edited</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

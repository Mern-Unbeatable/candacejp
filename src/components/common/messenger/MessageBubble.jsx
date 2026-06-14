import React from 'react';

export default function MessageBubble({ message }) {
  const isOutgoing = message.sender === 'me';

  if (isOutgoing) {
    return (
      <div className="flex flex-col items-end mb-6">
        <div className="max-w-[85%] md:max-w-[70%] rounded-2xl rounded-tr-sm bg-[#257AFC] px-5 py-3.5 text-sm text-white shadow-sm">
          {message.text}
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-400">
          <span>{message.time}</span>
          {message.status && (
            <>
              <span>-</span>
              <span>{message.status}</span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mb-6">
      <img 
        src={message.avatar} 
        alt="Sender" 
        className="h-8 w-8 rounded-full object-cover border border-gray-100 flex-shrink-0 mt-1"
      />
      <div className="flex flex-col items-start">
        <div className="max-w-[85%] md:max-w-[70%] rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-5 py-3.5 text-sm text-gray-700 shadow-sm">
          {message.text}
        </div>
        <div className="mt-1.5 text-[10px] text-gray-400">
          <span>{message.time}</span>
        </div>
      </div>
    </div>
  );
}

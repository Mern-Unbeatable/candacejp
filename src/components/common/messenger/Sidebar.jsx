import React from 'react';
import { Search } from 'lucide-react';

export default function Sidebar({ chats, activeChatId, onSelectChat }) {
  return (
    <div className="flex h-full flex-col bg-[#F8FAFC] border-r border-gray-100">
      {/* Header */}
      <div className="flex h-[97px] shrink-0 items-center border-b border-gray-300 px-6 hidden md:block">
        <h2 className="text-xl md:text-2xl font-bold text-[#257AFC]">Inboxes</h2>
      </div>

      <div className="p-4 md:p-6 pb-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations"
            className="w-full rounded-xl border border-gray-100 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-[#257AFC] shadow-sm transition-shadow"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors mb-1 ${
              activeChatId === chat.id
                ? 'bg-white shadow-sm border-l-4 border-[#257AFC]'
                : 'hover:bg-gray-100 border-l-4 border-transparent'
            }`}
          >
            <div className="relative flex-shrink-0">
              <img 
                src={chat.avatar} 
                alt={chat.name} 
                className="h-10 w-10 rounded-full object-cover border border-gray-100"
              />
              {chat.online && (
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-bold text-gray-900 truncate pr-2">{chat.name}</span>
                <span className="text-[12px] text-gray-400 flex-shrink-0">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

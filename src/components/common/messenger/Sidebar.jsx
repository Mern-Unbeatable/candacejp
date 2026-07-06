import React from 'react';
import { Search } from 'lucide-react';
import UserAvatar from './UserAvatar';

function SidebarSkeleton() {
  return (
    <div className="space-y-2 px-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 rounded-xl p-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/3 rounded bg-gray-200 animate-pulse" />
            <div className="h-2 w-full rounded bg-gray-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Sidebar({
  chats,
  activeChatId,
  search,
  onSearchChange,
  onSelectChat,
  isLoading,
}) {
  return (
    <div className="flex h-full flex-col bg-[#F8FAFC] border-r border-gray-100">
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
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search conversations"
            className="w-full rounded-xl border border-gray-100 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-[#257AFC] shadow-sm transition-shadow"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {isLoading ? (
          <SidebarSkeleton />
        ) : chats.length === 0 ? (
          <div className="px-3 py-8 text-center text-sm text-gray-500">
            No conversations found.
          </div>
        ) : (
          chats.map((chat) => (
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
                <UserAvatar partner={chat.partner} />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5 gap-2">
                  <span className="text-sm font-bold text-gray-900 truncate">{chat.name}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {chat.unreadCount > 0 && (
                      <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-[#257AFC] px-1.5 text-[10px] font-bold text-white">
                        {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                      </span>
                    )}
                    <span className="text-[12px] text-gray-400">{chat.time}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

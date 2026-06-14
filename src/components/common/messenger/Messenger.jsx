import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

export default function Messenger({ chats, messages }) {
  const [activeChatId, setActiveChatId] = useState(null);

  const activeChat = chats.find(chat => chat.id === activeChatId) || null;

  return (
    <div className="flex h-[calc(100vh-120px)] min-h-[600px] w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      
      {/* Sidebar - Hidden on mobile if a chat is active */}
      <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 ${activeChatId ? 'hidden md:block' : 'block'}`}>
        <Sidebar 
          chats={chats} 
          activeChatId={activeChatId} 
          onSelectChat={setActiveChatId} 
        />
      </div>

      {/* Chat Area - Hidden on mobile if NO chat is active */}
      <div className={`flex-1 min-w-0 ${!activeChatId ? 'hidden md:block' : 'block'}`}>
        <ChatArea 
          activeChat={activeChat} 
          messages={messages} 
          onBack={() => setActiveChatId(null)} 
        />
      </div>
      
    </div>
  );
}

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

export default function Messenger({ chats, messages: initialMessages }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState(initialMessages);

  const activeChat = chats.find(chat => chat.id === activeChatId) || null;

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      
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
          onSendMessage={handleSendMessage}
        />
      </div>
      
    </div>
  );
}

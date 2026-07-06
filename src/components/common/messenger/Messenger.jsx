import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

export default function Messenger({
  chats,
  messages,
  activePartnerId,
  activeChat,
  search,
  onSearchChange,
  onSelectChat,
  onSend,
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
  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 ${activePartnerId ? 'hidden md:block' : 'block'}`}>
        <Sidebar
          chats={chats}
          activeChatId={activePartnerId}
          search={search}
          onSearchChange={onSearchChange}
          onSelectChat={onSelectChat}
          isLoading={isLoading && !chats.length}
        />
      </div>

      <div className={`flex-1 min-w-0 ${!activePartnerId ? 'hidden md:block' : 'block'}`}>
        <ChatArea
          activeChat={activeChat}
          messages={messages}
          onBack={() => onSelectChat(null)}
          onSendMessage={onSend}
          onEditMessage={onEditMessage}
          onDeleteMessage={onDeleteMessage}
          onTyping={onTyping}
          onStopTyping={onStopTyping}
          isPartnerTyping={isPartnerTyping}
          isSending={isSending}
          isLoading={isLoading}
          sharedInbox={sharedInbox}
          actionMessageId={actionMessageId}
        />
      </div>
    </div>
  );
}

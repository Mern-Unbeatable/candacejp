import React from "react";
import useMessages from "../../../hooks/useMessages";
import Messenger from "../../../components/common/messenger/Messenger";

export default function Message() {
  const {
    chats,
    messages,
    activePartnerId,
    activeChat,
    search,
    setSearch,
    selectChat,
    sendMessage,
    editMessage,
    deleteMessage,
    handleTyping,
    stopTyping,
    isPartnerTyping,
    isSending,
    actionMessageId,
    isLoading,
    sharedInbox,
  } = useMessages();

  return (
    <div className="-mx-4 -mt-4 -mb-4 lg:-mx-8 lg:-mt-8 lg:-mb-8 h-[calc(100vh-56px)] lg:h-screen">
      <Messenger
        chats={chats}
        messages={messages}
        activePartnerId={activePartnerId}
        activeChat={activeChat}
        search={search}
        onSearchChange={setSearch}
        onSelectChat={selectChat}
        onSend={sendMessage}
        onEditMessage={editMessage}
        onDeleteMessage={deleteMessage}
        onTyping={handleTyping}
        onStopTyping={stopTyping}
        isPartnerTyping={isPartnerTyping}
        isSending={isSending}
        isLoading={isLoading}
        sharedInbox={sharedInbox}
        actionMessageId={actionMessageId}
      />
    </div>
  );
}

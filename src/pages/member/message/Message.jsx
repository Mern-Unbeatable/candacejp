import React from "react";
import useMessages from "../../../hooks/useMessages";
import Messenger from "../../../components/common/messenger/Messenger";

export default function Message() {

  const { chats, messages, sendMessage } = useMessages();

  return (
    <div className="-mx-4 -mt-4 -mb-4 lg:-mx-8 lg:-mt-8 lg:-mb-8 h-[calc(100vh-56px)] lg:h-screen">
      <Messenger chats={chats} messages={messages} onSend={sendMessage} />
    </div>
  );
}

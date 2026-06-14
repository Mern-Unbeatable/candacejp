import React, { useEffect } from 'react';
import Messenger from '../../components/common/messenger/Messenger';

const MOCK_CHATS = [
  { 
    id: 1, 
    name: 'Elena Rossi', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150', 
    online: true, 
    lastMessage: 'The mezzanine height looks perfect...', 
    time: '14:22' 
  },
  { 
    id: 2, 
    name: 'Marcus Webb', 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150', 
    online: false, 
    lastMessage: 'Can we schedule the flight visit for...', 
    time: 'Yest.' 
  },
  { 
    id: 3, 
    name: 'Sarah Jenkins', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150', 
    online: false, 
    lastMessage: 'The contract has been signed by all...', 
    time: 'Oct 12' 
  },
  { 
    id: 4, 
    name: 'Sarah Jenkins', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150', 
    online: false, 
    lastMessage: 'The contract has been signed by all...', 
    time: 'Oct 12' 
  },
  { 
    id: 5, 
    name: 'Sarah Jenkins', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150', 
    online: false, 
    lastMessage: 'The contract has been signed by all...', 
    time: 'Oct 12' 
  },
  { 
    id: 6, 
    name: 'Sarah Jenkins', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150', 
    online: false, 
    lastMessage: 'The contract has been signed by all...', 
    time: 'Oct 12' 
  },
  { 
    id: 7, 
    name: 'Sarah Jenkins', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150', 
    online: false, 
    lastMessage: 'The contract has been signed by all...', 
    time: 'Oct 12' 
  },
  { 
    id: 8, 
    name: 'Sarah Jenkins', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150', 
    online: false, 
    lastMessage: 'The contract has been signed by all...', 
    time: 'Oct 12' 
  }
];

const MOCK_MESSAGES = [
  { 
    id: 1, 
    text: 'Good morning, I want to book a flight manually, Can you help me with that?', 
    sender: 'other', 
    time: '11:04 AM', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' 
  },
  { 
    id: 2, 
    text: 'Good morning.\nYes, Surely I can help you with that. Can you tell me more about that?', 
    sender: 'me', 
    time: '11:15 AM', 
    status: 'Read' 
  },
  { 
    id: 3, 
    text: 'I want to book a flight from NYC to DAC, but I am unable to find it, can you find it for me?', 
    sender: 'other', 
    time: '14:22 PM', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' 
  }
];

export default function Message() {
  useEffect(() => {
    document.title = "Messages - Member | RAVEN";
  }, []);

  return (
    <div className="mx-auto pb-12 h-full">
      <Messenger chats={MOCK_CHATS} messages={MOCK_MESSAGES} />
    </div>
  );
}

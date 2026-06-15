import { useState, useCallback } from 'react';

// ─── Mock Data (will be replaced by API calls later) ───────────────────────
const MOCK_CHATS = [
  {
    id: 1,
    name: "Elena Rossi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    online: true,
    lastMessage: "The mezzanine height looks perfect...",
    time: "14:22",
  },
  {
    id: 2,
    name: "Marcus Webb",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    online: false,
    lastMessage: "Can we schedule the flight visit for...",
    time: "Yest.",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    online: false,
    lastMessage: "The contract has been signed by all...",
    time: "Oct 12",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    online: false,
    lastMessage: "The contract has been signed by all...",
    time: "Oct 12",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    online: false,
    lastMessage: "The contract has been signed by all...",
    time: "Oct 12",
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    online: false,
    lastMessage: "The contract has been signed by all...",
    time: "Oct 12",
  },
  {
    id: 7,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    online: false,
    lastMessage: "The contract has been signed by all...",
    time: "Oct 12",
  },
  {
    id: 8,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    online: false,
    lastMessage: "The contract has been signed by all...",
    time: "Oct 12",
  },
];

const MOCK_MESSAGES = [
  {
    id: 1,
    text: "Good morning, I want to book a flight manually, Can you help me with that?",
    sender: "other",
    time: "11:04 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 2,
    text: "Good morning.\nYes, Surely I can help you with that. Can you tell me more about that?",
    sender: "me",
    time: "11:15 AM",
    status: "Read",
  },
  {
    id: 3,
    text: "I want to book a flight from NYC to DAC, but I am unable to find it, can you find it for me?",
    sender: "other",
    time: "14:22 PM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

// ─── Hook ──────────────────────────────────────────────────────────────────
export default function useMessages() {
  const [chats] = useState(MOCK_CHATS);
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  // Send a new message (frontend-only for now, will call API later)
  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Sent",
    };

    setMessages((prev) => [...prev, newMessage]);
  }, []);

  return { chats, messages, sendMessage };
}

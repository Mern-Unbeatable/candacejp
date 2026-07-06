import { useEffect, useRef } from 'react'
import { queryKeys } from '../lib/query/queryKeys'
import {
  getPartnerIdFromMessage,
  isMessageInThread,
  sortConversations,
} from '../lib/messages/messageUtils'
import { connectSocket, disconnectSocket, emitWithAck, getSocket } from '../lib/socket/socketClient'

function updateConversationCaches(queryClient, updater) {
  queryClient.setQueriesData(
    { queryKey: queryKeys.messages.all, exact: false },
    (current) => {
      if (!current?.conversations) {
        return current
      }

      return {
        ...current,
        conversations: updater(current.conversations),
      }
    },
  )
}

function upsertConversation(conversations, message, currentUserId) {
  const partnerId = getPartnerIdFromMessage(message, currentUserId)
  const existingIndex = conversations.findIndex(
    (conversation) => conversation.partner.id === partnerId,
  )

  const partner = message.senderId === partnerId ? message.sender : message.receiver
  const unreadIncrement = message.receiverId === currentUserId ? 1 : 0

  if (existingIndex === -1) {
    return sortConversations([
      {
        partner: {
          ...partner,
          isOnline: partner?.isOnline ?? false,
        },
        lastMessage: message,
        unreadCount: unreadIncrement,
        sharedInbox: partner?.role === 'MEMBER',
        hasConversation: true,
      },
      ...conversations,
    ])
  }

  const next = conversations.map((conversation, index) => {
    if (index !== existingIndex) {
      return conversation
    }

    return {
      ...conversation,
      partner: {
        ...conversation.partner,
        ...partner,
        isOnline: conversation.partner?.isOnline,
      },
      lastMessage: message,
      unreadCount: unreadIncrement
        ? conversation.unreadCount + 1
        : conversation.unreadCount,
      hasConversation: true,
    }
  })

  return sortConversations(next)
}

function updateThreadCache(queryClient, partnerId, updater) {
  queryClient.setQueriesData(
    {
      queryKey: [...queryKeys.messages.all, 'thread', partnerId],
      exact: false,
    },
    (current) => {
      if (!current?.messages || !Array.isArray(current.messages)) {
        return current
      }

      return {
        ...current,
        messages: updater(current.messages),
      }
    },
  )
}

function updateThreadMetaCache(queryClient, partnerId, updater) {
  queryClient.setQueriesData(
    {
      queryKey: [...queryKeys.messages.all, 'thread', partnerId],
      exact: false,
    },
    (current) => {
      if (!current) {
        return current
      }

      return updater(current)
    },
  )
}

function replaceMessageInList(messages, nextMessage) {
  const index = messages.findIndex((message) => message.id === nextMessage.id)

  if (index === -1) {
    return [...messages, nextMessage]
  }

  const next = [...messages]
  next[index] = nextMessage
  return next
}

export default function useMessageSocket({
  userId,
  activePartnerId,
  queryClient,
  onPartnerPresenceChange,
  onPartnerTypingChange,
}) {
  const activePartnerIdRef = useRef(activePartnerId)

  useEffect(() => {
    activePartnerIdRef.current = activePartnerId
  }, [activePartnerId])

  useEffect(() => {
    if (!userId) {
      return undefined
    }

    const socket = connectSocket()
    if (!socket) {
      return undefined
    }

    const handleNewMessage = ({ message }) => {
      updateConversationCaches(queryClient, (conversations) =>
        upsertConversation(conversations, message, userId),
      )

      const partnerId = getPartnerIdFromMessage(message, userId)
      if (isMessageInThread(message, userId, partnerId)) {
        updateThreadCache(queryClient, partnerId, (messages) => {
          if (messages.some((item) => item.id === message.id)) {
            return messages
          }

          return [...messages, message]
        })
      }

      if (message.receiverId === userId) {
        socket.emit('message:delivered', { messageId: message.id })

        if (partnerId === activePartnerIdRef.current) {
          socket.emit('message:seen', { partnerId })
        }
      }
    }

    const handleUpdatedMessage = ({ message }) => {
      const partnerId = getPartnerIdFromMessage(message, userId)

      updateConversationCaches(queryClient, (conversations) =>
        conversations.map((conversation) => {
          if (conversation.lastMessage?.id !== message.id) {
            return conversation
          }

          return {
            ...conversation,
            lastMessage: message,
          }
        }),
      )

      updateThreadCache(queryClient, partnerId, (messages) =>
        replaceMessageInList(messages, message),
      )
    }

    const handleDeletedMessage = ({ message }) => {
      handleUpdatedMessage({ message })
    }

    const handleMessageStatus = ({ message }) => {
      const partnerId = getPartnerIdFromMessage(message, userId)

      updateConversationCaches(queryClient, (conversations) =>
        conversations.map((conversation) => {
          if (conversation.lastMessage?.id !== message.id) {
            return conversation
          }

          return {
            ...conversation,
            lastMessage: message,
          }
        }),
      )

      updateThreadCache(queryClient, partnerId, (messages) =>
        replaceMessageInList(messages, message),
      )
    }

    const handleMessagesSeen = ({ messages, viewerId }) => {
      if (!Array.isArray(messages) || !messages.length) {
        return
      }

      const partnerId = getPartnerIdFromMessage(messages[0], userId)

      if (viewerId === userId) {
        updateConversationCaches(queryClient, (conversations) =>
          conversations.map((conversation) => {
            if (conversation.partner.id !== partnerId) {
              return conversation
            }

            return {
              ...conversation,
              unreadCount: 0,
            }
          }),
        )
      }

      updateThreadCache(queryClient, partnerId, (threadMessages) =>
        threadMessages.map((threadMessage) => {
          const seenUpdate = messages.find((item) => item.id === threadMessage.id)
          return seenUpdate || threadMessage
        }),
      )
    }

    const handlePresenceUpdate = ({ userId: presenceUserId, isOnline }) => {
      updateConversationCaches(queryClient, (conversations) =>
        conversations.map((conversation) => {
          if (conversation.partner.id !== presenceUserId) {
            return conversation
          }

          return {
            ...conversation,
            partner: {
              ...conversation.partner,
              isOnline,
            },
          }
        }),
      )

      if (activePartnerIdRef.current === presenceUserId) {
        updateThreadMetaCache(queryClient, presenceUserId, (current) => ({
          ...current,
          partner: {
            ...current.partner,
            isOnline,
          },
        }))
      }

      onPartnerPresenceChange?.(presenceUserId, isOnline)
    }

    const handleTypingUpdate = ({ userId: typingUserId, isTyping }) => {
      if (typingUserId === activePartnerIdRef.current) {
        onPartnerTypingChange?.(typingUserId, isTyping)
      }
    }

    socket.on('message:new', handleNewMessage)
    socket.on('message:updated', handleUpdatedMessage)
    socket.on('message:deleted', handleDeletedMessage)
    socket.on('message:status', handleMessageStatus)
    socket.on('message:seen', handleMessagesSeen)
    socket.on('presence:update', handlePresenceUpdate)
    socket.on('typing:update', handleTypingUpdate)

    return () => {
      socket.off('message:new', handleNewMessage)
      socket.off('message:updated', handleUpdatedMessage)
      socket.off('message:deleted', handleDeletedMessage)
      socket.off('message:status', handleMessageStatus)
      socket.off('message:seen', handleMessagesSeen)
      socket.off('presence:update', handlePresenceUpdate)
      socket.off('typing:update', handleTypingUpdate)
    }
  }, [userId, queryClient, onPartnerPresenceChange, onPartnerTypingChange])

  useEffect(() => () => disconnectSocket(), [])
}

export function joinConversation(partnerId) {
  if (!partnerId) {
    return Promise.reject(new Error('Unable to join conversation'))
  }

  return emitWithAck('conversation:join', { partnerId })
}

export function leaveConversation(partnerId) {
  const socket = getSocket()
  if (!socket || !partnerId) {
    return
  }

  socket.emit('conversation:leave', { partnerId })
}

export function sendSocketMessage(receiverId, content) {
  return emitWithAck('message:send', { receiverId, content }).then((data) => data.message)
}

export function markConversationSeenSocket(partnerId) {
  if (!partnerId) {
    return Promise.resolve()
  }

  return emitWithAck('message:seen', { partnerId }).catch(() => undefined)
}

export function emitTyping(receiverId, isTyping) {
  const socket = getSocket()
  if (!socket || !receiverId) {
    return
  }

  socket.emit(isTyping ? 'typing:start' : 'typing:stop', { receiverId })
}

export function editSocketMessage(messageId, content) {
  return emitWithAck('message:edit', { messageId, content }).then((data) => data.message)
}

export function deleteSocketMessage(messageId) {
  return emitWithAck('message:delete', { messageId }).then((data) => data.message)
}

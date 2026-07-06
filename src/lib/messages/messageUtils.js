export function formatPartnerName(partner) {
  if (!partner) {
    return 'User'
  }

  return (
    partner.fullName
    || `${partner.firstName ?? ''} ${partner.lastName ?? ''}`.trim()
    || partner.email
    || 'User'
  )
}

export function getPartnerInitials(partner) {
  const name = formatPartnerName(partner)
  const parts = name.split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return name.slice(0, 2).toUpperCase()
}

export function formatMessageTime(dateString) {
  if (!dateString) {
    return ''
  }

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  if (date >= startOfToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (date >= startOfYesterday) {
    return 'Yest.'
  }

  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export function getTickLabel(tickType) {
  switch (tickType) {
    case 'double_green':
      return 'Read'
    case 'double_blue':
      return 'Delivered'
    default:
      return 'Sent'
  }
}

export function getPartnerIdFromMessage(message, currentUserId) {
  return message.senderId === currentUserId ? message.receiverId : message.senderId
}

export function isMessageInThread(message, currentUserId, partnerId) {
  if (!message || !currentUserId || !partnerId) {
    return false
  }

  return (
    (message.senderId === currentUserId && message.receiverId === partnerId)
    || (message.senderId === partnerId && message.receiverId === currentUserId)
  )
}

export function mapConversationToChat(conversation) {
  const { partner, lastMessage, unreadCount } = conversation

  return {
    id: partner.id,
    partner,
    name: formatPartnerName(partner),
    online: Boolean(partner.isOnline),
    lastMessage: lastMessage?.isDeleted
      ? 'Message deleted'
      : (lastMessage?.content || 'No messages yet'),
    time: formatMessageTime(lastMessage?.createdAt),
    unreadCount: unreadCount || 0,
    hasConversation: conversation.hasConversation ?? true,
    sharedInbox: conversation.sharedInbox ?? false,
  }
}

export function mapApiMessageToUi(message, currentUserId, partner) {
  const isMine = message.senderId === currentUserId

  return {
    id: message.id,
    text: message.isDeleted ? null : message.content,
    isDeleted: Boolean(message.isDeleted),
    sender: isMine ? 'me' : 'other',
    time: formatMessageTime(message.createdAt),
    status: isMine ? getTickLabel(message.tickType) : undefined,
    tickType: message.tickType,
    editedAt: message.editedAt,
    partner,
    partnerName: formatPartnerName(partner),
  }
}

export function sortConversations(conversations = []) {
  return [...conversations].sort((left, right) => {
    const leftTime = left.lastMessage?.createdAt
      ? new Date(left.lastMessage.createdAt).getTime()
      : 0
    const rightTime = right.lastMessage?.createdAt
      ? new Date(right.lastMessage.createdAt).getTime()
      : 0

    return rightTime - leftTime
  })
}

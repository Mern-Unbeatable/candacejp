import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { selectCurrentUser } from '../features/auth/authSlice'
import {
  useConversationsQuery,
  useMessageThreadQuery,
} from './api/useMessageQueries'
import { formatPartnerName, mapApiMessageToUi, mapConversationToChat } from '../lib/messages/messageUtils'
import { queryKeys } from '../lib/query/queryKeys'
import useMessageSocket, {
  deleteSocketMessage,
  editSocketMessage,
  emitTyping,
  joinConversation,
  leaveConversation,
  markConversationSeenSocket,
  sendSocketMessage,
} from './useMessageSocket'
import { getApiErrorMessage } from './useApiError'

const TYPING_STOP_DELAY_MS = 2000

export default function useMessages() {
  const user = useSelector(selectCurrentUser)
  const userId = user?.id
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [activePartnerId, setActivePartnerId] = useState(null)
  const [partnerHint, setPartnerHint] = useState(null)
  const [isPartnerTyping, setIsPartnerTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [actionMessageId, setActionMessageId] = useState(null)
  const typingStopTimerRef = useRef(null)
  const appliedNavigationKeyRef = useRef(null)

  const clearTypingStopTimer = useCallback(() => {
    if (typingStopTimerRef.current) {
      clearTimeout(typingStopTimerRef.current)
      typingStopTimerRef.current = null
    }
  }, [])

  const stopTyping = useCallback(() => {
    clearTypingStopTimer()
    if (activePartnerId) {
      emitTyping(activePartnerId, false)
    }
  }, [activePartnerId, clearTypingStopTimer])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim())
    }, 300)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    const applyPartnerFromNavigation = (partnerId, partnerName) => {
      setActivePartnerId(partnerId)
      setPartnerHint({ id: partnerId, name: partnerName || null })

      if (partnerName) {
        setSearchInput(partnerName)
        setSearch(partnerName)
      }
    }

    const partnerIdFromUrl =
      searchParams.get('memberId')
      || searchParams.get('partnerId')
      || searchParams.get('userId')

    if (partnerIdFromUrl) {
      const partnerName =
        searchParams.get('memberName')
        || searchParams.get('partnerName')

      applyPartnerFromNavigation(partnerIdFromUrl, partnerName)

      const nextParams = new URLSearchParams(searchParams)
      nextParams.delete('memberId')
      nextParams.delete('partnerId')
      nextParams.delete('userId')
      nextParams.delete('memberName')
      nextParams.delete('partnerName')
      setSearchParams(nextParams, { replace: true })
      appliedNavigationKeyRef.current = location.key
      return
    }

    const partnerIdFromState =
      location.state?.memberId
      || location.state?.partnerId
      || location.state?.userId

    if (!partnerIdFromState || appliedNavigationKeyRef.current === location.key) {
      return
    }

    appliedNavigationKeyRef.current = location.key
    applyPartnerFromNavigation(
      partnerIdFromState,
      location.state?.memberName || location.state?.partnerName || null,
    )
  }, [searchParams, location.key, location.state, setSearchParams])

  const {
    data: conversationsData,
    isLoading: isConversationsLoading,
    isFetching: isConversationsFetching,
  } = useConversationsQuery(search, {
    enabled: Boolean(userId),
  })

  const {
    data: threadData,
    isLoading: isThreadLoading,
    isFetching: isThreadFetching,
  } = useMessageThreadQuery(activePartnerId, { page: 1, limit: 100 }, {
    enabled: Boolean(userId && activePartnerId),
  })

  const handlePartnerTypingChange = useCallback((partnerId, isTyping) => {
    if (partnerId === activePartnerId) {
      setIsPartnerTyping(isTyping)
    }
  }, [activePartnerId])

  useMessageSocket({
    userId,
    activePartnerId,
    queryClient,
    onPartnerTypingChange: handlePartnerTypingChange,
  })

  const chats = useMemo(
    () => (conversationsData?.conversations ?? []).map(mapConversationToChat),
    [conversationsData?.conversations],
  )

  const activeChat = useMemo(() => {
    const fromList = chats.find((chat) => chat.id === activePartnerId)
    if (fromList) {
      return fromList
    }

    const fromRawList = conversationsData?.conversations?.find(
      (conversation) => conversation.partner?.id === activePartnerId,
    )
    if (fromRawList) {
      return mapConversationToChat(fromRawList)
    }

    if (!activePartnerId) {
      return null
    }

    const hintName = partnerHint?.id === activePartnerId ? partnerHint.name : null
    const threadPartner = threadData?.partner?.id === activePartnerId
      ? threadData.partner
      : null
    const partner = threadPartner || {
      id: activePartnerId,
      fullName: hintName || undefined,
    }

    return {
      id: activePartnerId,
      partner,
      name: formatPartnerName(partner),
      online: Boolean(threadPartner?.isOnline),
      lastMessage: 'No messages yet',
      time: '',
      unreadCount: 0,
      hasConversation: false,
      sharedInbox: threadData?.sharedInbox ?? true,
    }
  }, [chats, activePartnerId, conversationsData?.conversations, partnerHint, threadData])

  const displayActiveChat = useMemo(() => {
    if (!activeChat) {
      return null
    }

    const threadPartner = threadData?.partner?.id === activeChat.id
      ? threadData.partner
      : null

    if (!threadPartner) {
      return activeChat
    }

    const mergedPartner = { ...activeChat.partner, ...threadPartner }

    return {
      ...activeChat,
      partner: mergedPartner,
      name: formatPartnerName(mergedPartner),
      online: Boolean(mergedPartner.isOnline),
    }
  }, [activeChat, threadData?.partner])

  const partner = displayActiveChat?.partner ?? threadData?.partner ?? null

  useEffect(() => {
    if (activePartnerId && threadData && !Array.isArray(threadData.messages)) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.messages.thread(activePartnerId),
      })
    }
  }, [activePartnerId, threadData, queryClient])

  const messages = useMemo(() => {
    const threadMessages = Array.isArray(threadData?.messages) ? threadData.messages : []

    return threadMessages.map((message) => {
      const messagePartner = message.senderId === userId ? partner : (message.sender ?? partner)
      return mapApiMessageToUi(message, userId, messagePartner)
    })
  }, [threadData?.messages, userId, partner])

  useEffect(() => {
    if (!activePartnerId) {
      return undefined
    }

    let cancelled = false

    const setupConversation = async () => {
      try {
        await joinConversation(activePartnerId)
        if (!cancelled) {
          await markConversationSeenSocket(activePartnerId)
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(getApiErrorMessage(error, 'Unable to open conversation'))
        }
      }
    }

    setupConversation()
    setIsPartnerTyping(false)

    return () => {
      cancelled = true
      clearTypingStopTimer()
      emitTyping(activePartnerId, false)
      leaveConversation(activePartnerId)
    }
  }, [activePartnerId, clearTypingStopTimer])

  const selectChat = useCallback((partnerId) => {
    setActivePartnerId(partnerId)
  }, [])

  const sendMessage = useCallback(async (text) => {
    const content = text.trim()
    if (!content || !activePartnerId || isSending) {
      return
    }

    setIsSending(true)
    stopTyping()

    try {
      await sendSocketMessage(activePartnerId, content)
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to send message'))
    } finally {
      setIsSending(false)
    }
  }, [activePartnerId, isSending, stopTyping])

  const handleTyping = useCallback((text) => {
    if (!activePartnerId) {
      return
    }

    clearTypingStopTimer()

    if (!text.trim()) {
      emitTyping(activePartnerId, false)
      return
    }

    const partnerId = activePartnerId

    emitTyping(partnerId, true)
    typingStopTimerRef.current = setTimeout(() => {
      emitTyping(partnerId, false)
      typingStopTimerRef.current = null
    }, TYPING_STOP_DELAY_MS)
  }, [activePartnerId, clearTypingStopTimer])

  const editMessage = useCallback(async (messageId, content) => {
    const trimmed = content.trim()
    if (!trimmed || actionMessageId) {
      return false
    }

    setActionMessageId(messageId)

    try {
      await editSocketMessage(messageId, trimmed)
      toast.success('Message updated')
      return true
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to edit message'))
      return false
    } finally {
      setActionMessageId(null)
    }
  }, [actionMessageId])

  const deleteMessage = useCallback(async (messageId) => {
    const result = await Swal.fire({
      title: 'Delete message?',
      text: 'This message will be removed for everyone in the conversation.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#257AFC',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    })

    if (!result.isConfirmed || actionMessageId) {
      return false
    }

    setActionMessageId(messageId)

    try {
      await deleteSocketMessage(messageId)
      toast.success('Message deleted')
      return true
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to delete message'))
      return false
    } finally {
      setActionMessageId(null)
    }
  }, [actionMessageId])

  return {
    chats,
    messages,
    activePartnerId,
    activeChat: displayActiveChat,
    search: searchInput,
    setSearch: setSearchInput,
    selectChat,
    sendMessage,
    editMessage,
    deleteMessage,
    handleTyping,
    stopTyping,
    isPartnerTyping,
    isSending,
    actionMessageId,
    isLoading: isConversationsLoading || isThreadLoading,
    isFetching: isConversationsFetching || isThreadFetching,
    sharedInbox: threadData?.sharedInbox ?? displayActiveChat?.sharedInbox ?? false,
  }
}

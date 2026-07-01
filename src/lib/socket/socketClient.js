import { io } from 'socket.io-client'
import { env } from '../../config/env'
import { tokenStorage } from '../api/tokenStorage'

let socket = null

export function getSocket() {
  return socket
}

export function connectSocket() {
  const token = tokenStorage.getAccessToken()
  if (!token) {
    return null
  }

  if (socket) {
    socket.auth = { token }
    if (!socket.connected) {
      socket.connect()
    }
    return socket
  }

  socket = io(env.socketUrl, {
    auth: { token },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10,
  })

  return socket
}

export function disconnectSocket() {
  if (!socket) {
    return
  }

  socket.removeAllListeners()
  socket.disconnect()
  socket = null
}

export function emitWithAck(event, payload) {
  const activeSocket = connectSocket()

  if (!activeSocket) {
    return Promise.reject(new Error('Not authenticated'))
  }

  return new Promise((resolve, reject) => {
    activeSocket.timeout(10000).emit(event, payload, (err, response) => {
      if (err) {
        reject(new Error(err.message || 'Request timed out'))
        return
      }

      if (!response) {
        reject(new Error('No response from server'))
        return
      }

      if (response.success) {
        resolve(response.data)
        return
      }

      reject(new Error(response.message || 'Request failed'))
    })
  })
}

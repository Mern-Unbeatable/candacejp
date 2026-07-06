import { ApiError } from './ApiError'

/**
 * Normalizes Raven API responses: { success, message, data }
 */
export function unwrapResponse(response) {
  const body = response?.data

  if (body?.success === false) {
    throw new ApiError(body.message, response.status, body)
  }

  if (body && Object.prototype.hasOwnProperty.call(body, 'data')) {
    return body.data
  }

  return body
}

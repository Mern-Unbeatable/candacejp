export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message || 'Request failed')
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }

  static fromAxios(error) {
    const status = error.response?.status ?? 0
    const payload = error.response?.data
    const message = payload?.message || error.message || 'Request failed'

    return new ApiError(message, status, payload)
  }

  get isUnauthorized() {
    return this.status === 401
  }

  get isForbidden() {
    return this.status === 403
  }

  get isNotFound() {
    return this.status === 404
  }

  get isValidationError() {
    return this.status === 400 || this.status === 422
  }
}

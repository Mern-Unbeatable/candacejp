let unauthorizedHandler = null

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler
}

export function handleUnauthorized() {
  if (typeof unauthorizedHandler === 'function') {
    unauthorizedHandler()
  }
}

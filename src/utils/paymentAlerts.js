import Swal from 'sweetalert2'

const swalBase = {
  confirmButtonColor: '#2563eb',
  cancelButtonColor: '#64748b',
  customClass: {
    popup: 'rounded-2xl',
    confirmButton: 'rounded-lg px-5 py-2.5 text-sm font-semibold',
    cancelButton: 'rounded-lg px-5 py-2.5 text-sm font-semibold',
  },
}

export async function showPaymentRequiredAlert(message) {
  const result = await Swal.fire({
    ...swalBase,
    icon: 'warning',
    title: 'Payment required',
    text: message || 'Please complete your registration payment to continue.',
    showCancelButton: true,
    confirmButtonText: 'Pay $199',
    cancelButtonText: 'Not now',
    reverseButtons: true,
  })

  return result.isConfirmed
}

export function showPaymentRedirectAlert() {
  return Swal.fire({
    ...swalBase,
    icon: 'info',
    title: 'Redirecting to Stripe',
    text: 'You will be taken to our secure checkout page.',
    showConfirmButton: false,
    timer: 1800,
    didOpen: () => {
      Swal.showLoading()
    },
  })
}

export async function showPaymentSuccessAlert(message) {
  return Swal.fire({
    ...swalBase,
    icon: 'success',
    title: 'Payment verified',
    text: message || 'Your registration payment was successful.',
    confirmButtonText: 'OK',
  })
}

export async function showPaymentFailedAlert(message) {
  return Swal.fire({
    ...swalBase,
    icon: 'error',
    title: 'Payment not completed',
    text: message || 'We could not verify your payment. Please try again or contact support.',
    confirmButtonText: 'OK',
  })
}

export async function showSuccessAlert({
  title = 'Success',
  text,
  confirmButtonText = 'OK',
} = {}) {
  return Swal.fire({
    ...swalBase,
    icon: 'success',
    title,
    text,
    confirmButtonText,
  })
}

export async function showErrorAlert({
  title = 'Something went wrong',
  text,
  confirmButtonText = 'OK',
} = {}) {
  return Swal.fire({
    ...swalBase,
    icon: 'error',
    title,
    text,
    confirmButtonText,
  })
}

export function redirectToCheckout(checkoutUrl) {
  if (!checkoutUrl) {
    throw new Error('Checkout URL is missing')
  }
  window.location.assign(checkoutUrl)
}

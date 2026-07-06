import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { authApi } from '../../../api/auth.api'
import { ApiError } from '../../../lib/api/ApiError'
import { showPaymentFailedAlert } from '../../../utils/paymentAlerts'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('Verifying your payment...')

  useEffect(() => {
    document.title = 'Payment Success - RAVEN'

    async function verify() {
      if (!sessionId) {
        setStatus('error')
        setMessage('Missing payment session. Please try registering again.')
        return
      }

      try {
        await authApi.verifyPayment(sessionId)
        setStatus('success')
        setMessage('Your registration payment was verified successfully.')
        navigate('/login', {
          replace: true,
          state: { paymentVerified: true },
        })
      } catch (error) {
        const errorMessage = error instanceof ApiError
          ? error.message
          : 'We could not verify your payment.'
        setStatus('error')
        setMessage(errorMessage)
        await showPaymentFailedAlert(errorMessage)
      }
    }

    verify()
  }, [navigate, sessionId])
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {status === 'loading' && (
          <>
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[#2563eb]" />
            <h1 className="mb-2 text-xl font-semibold text-gray-900">Verifying payment</h1>
            <p className="text-sm text-gray-500">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h1 className="mb-2 text-xl font-semibold text-gray-900">Payment successful</h1>
            <p className="text-sm text-gray-500">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h1 className="mb-2 text-xl font-semibold text-gray-900">Verification failed</h1>
            <p className="mb-6 text-sm text-gray-500">{message}</p>
            <div className="flex flex-col gap-3">
              <Link
                to="/register"
                className="rounded-md bg-[#2563eb] px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                Back to registration
              </Link>
              <Link
                to="/login"
                className="rounded-md border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Go to login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

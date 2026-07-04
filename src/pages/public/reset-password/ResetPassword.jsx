import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import PasswordInput from '../../../components/common/PasswordInput'
import { authApi } from '../../../api/auth.api'
import { getApiErrorMessage } from '../../../hooks/useApiError'

export default function ResetPassword() {
  useEffect(() => {
    document.title = "Reset Password - RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Securely set a new password for your Raven Private Aviation membership account.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Securely set a new password for your Raven Private Aviation membership account.';
      document.head.appendChild(newMeta);
    }
  }, []);

  const navigate = useNavigate()
  const location = useLocation()
  const resetToken = location.state?.resetToken

  useEffect(() => {
    if (!resetToken) {
      navigate('/forgot-password', { replace: true })
    }
  }, [resetToken, navigate])

  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!resetToken) return
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (passwords.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)

    try {
      await authApi.resetPassword({
        resetToken,
        password: passwords.newPassword,
      })
      toast.success('Password reset successfully!')
      navigate('/login')
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to reset password.'))
    } finally {
      setIsLoading(false)
    }
  }

  if (!resetToken) {
    return null
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans">
      {/* Left side - Image */}
      <div className="relative hidden w-1/2 flex-col justify-center lg:flex">
        <img
          src="/login_page.webp"
          alt="Private Aviation"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-16 text-center text-white">
          <h1 className="mb-4 font-serif text-[42px] font-bold tracking-tight">Begin Your Journey</h1>
          <p className="text-[15px] leading-relaxed text-gray-200 px-4">
            Experience private travel with unmatched<br />
            comfort, exclusivity, and concierge support.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex relative w-full items-center justify-center lg:w-1/2">
        
        {/* Back Button */}
        <Link 
          to="/login" 
          className="absolute left-8 top-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <div className="w-full max-w-xl px-8 py-12 mt-10 lg:mt-0">
          <h2 className="mb-2 font-serif text-3xl font-medium text-gray-900">Reset Password</h2>
          <p className="mb-8 text-sm text-gray-500">Enter a new password for your account.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="mb-2 block text-sm lg:text-base font-medium text-gray-700">
                New Password
              </label>
              <PasswordInput
                id="newPassword"
                name="newPassword"
                required
                minLength={8}
                value={passwords.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm lg:text-base font-medium text-gray-700">
                Confirm Password
              </label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                required
                minLength={8}
                value={passwords.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !passwords.newPassword || !passwords.confirmPassword}
              className="mt-2 w-full rounded-md bg-[#2563eb] py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

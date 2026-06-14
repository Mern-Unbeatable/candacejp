import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to OTP verification page, optionally passing the email in state
      navigate('/verify-otp', { state: { email } })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans">
      {/* Left side - Image */}
      <div className="relative hidden w-1/2 flex-col justify-center lg:flex">
        <img
          src="/login_page.png"
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
        
        {/* Back to Home Button */}
        <Link 
          to="/login" 
          className="absolute left-8 top-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <div className="w-full max-w-md px-8 py-12 mt-10 lg:mt-0">
          <h2 className="mb-2 font-serif text-3xl font-medium text-gray-900">Forgot Password</h2>
          <p className="mb-8 text-sm text-gray-500">Enter your email address to receive an OTP verification code.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm lg:text-base font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your E-mail here"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="mt-2 w-full rounded-md bg-[#2563eb] py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

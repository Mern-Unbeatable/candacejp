import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function VerifyOTP() {
  useEffect(() => {
    document.title = "Verify OTP - RAVEN";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Verify your identity to reset your Raven Private Aviation account password.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Verify your identity to reset your Raven Private Aviation account password.';
      document.head.appendChild(newMeta);
    }
  }, []);

  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || 'your email'
  
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef([])

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 4) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpCode = otp.join('')
    if (otpCode.length < 5) return
    
    setIsLoading(true)
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false)
      navigate('/reset-password')
    }, 1000)
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
          to="/forgot-password" 
          className="absolute left-8 top-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div className="w-full max-w-xl px-8 py-12 mt-10 lg:mt-0">
          <h2 className="mb-2 font-serif text-3xl font-medium text-gray-900">Verify Email</h2>
          <p className="mb-8 text-sm text-gray-500">We have sent a 5-digit verification code to <span className="font-semibold text-gray-800">{email}</span></p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-4 block text-sm lg:text-base font-medium text-gray-700">
                Verification Code
              </label>
              <div className="flex justify-center gap-4 sm:gap-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => inputRefs.current[index] = el}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 md:w-16 h-10 md:h-16 text-center text-xl font-semibold rounded-md border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.join('').length < 5}
              className="mt-2 w-full rounded-md bg-[#2563eb] py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

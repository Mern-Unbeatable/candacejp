import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import gsap from "gsap";
import toast from "react-hot-toast";
import { dummyRegister } from "../../features/auth/dummyAuth";

export default function Register() {
  const formRef = useRef(null);
  
  useEffect(() => {
    document.title = "Register - RAVEN";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create your Raven Private Aviation membership account to access exclusive charter flight opportunities and luxury travel features.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Create your Raven Private Aviation membership account to access exclusive charter flight opportunities and luxury travel features.';
      document.head.appendChild(newMeta);
    }
    
    // GSAP Animation for the form entering
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      dummyRegister({ name: `${form.firstName} ${form.lastName}`, email: form.email });
      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans overflow-hidden">
      {/* Left side - Image */}
      <div className="relative hidden w-1/2 flex-col justify-center lg:flex h-screen sticky top-0">
        <img
          src="/login_page.png"
          alt="Private Aviation"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-16 text-center text-white">
          <h1 className="mb-4 font-serif text-[42px] font-bold tracking-tight">
            Become a Raven Member
          </h1>
          <p className="text-[15px] leading-relaxed text-gray-200 px-4">
            Complete your registration and gain access to exclusive<br />
            charter flight opportunities.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex relative w-full items-start justify-center lg:w-1/2 overflow-y-auto max-h-screen py-10" ref={formRef}>
        {/* Back to Home Button */}
        <Link
          to="/"
          className="absolute left-8 top-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="w-full max-w-xl px-8 mt-24 lg:mt-16 pb-10">
          {/* Toggle buttons */}
          <div className="mb-16 flex w-64 rounded-full bg-[#f1f5f9] p-1">
            <Link
              to="/login"
              className="flex w-1/2 items-center justify-center rounded-full py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
            >
              Log In
            </Link>
            <button className="w-1/2 rounded-full bg-[#3b82f6] py-2.5 text-sm font-semibold text-white shadow-sm">
              Sign Up
            </button>
          </div>

          <h2 className="mb-2 font-serif text-3xl font-medium text-gray-900">
            Personal Information
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            Please enter your details as they appear on your ID.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">First Name</label>
                <input required type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter your first name" />
              </div>
              <div>
                <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">Last Name</label>
                <input required type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter your last name" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">Address</label>
              <input required type="text" name="address" value={form.address} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter your full address" />
            </div>

            <div>
              <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">Zip Code</label>
              <input required type="text" name="zipCode" value={form.zipCode} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter Zip Code" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">City</label>
                <input required type="text" name="city" value={form.city} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="New York City" />
              </div>
              <div>
                <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">State</label>
                <input required type="text" name="state" value={form.state} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="New York" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">Phone Number</label>
                <input required type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter your phone number" />
              </div>
              <div>
                <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">Email</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter your email" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">Password</label>
              <input required type="password" name="password" value={form.password} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="enter your password" />
            </div>

            <div>
              <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">Confirm Password</label>
              <input required type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Confirm password" />
            </div>

            {/* Registration Fee Block */}
            <div className="mt-8 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 shadow-sm">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Registration Fee</h3>
                  <p className="text-sm text-gray-500">One-time registration fee</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">$199</p>
                <p className="text-sm font-medium text-gray-500">USD</p>
              </div>
            </div>

            {/* Secure Payment Alert */}
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
              <Lock className="h-4 w-4" />
              <p>Your payment information is secure and encrypted.</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-md bg-[#2563eb] py-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? "Processing..." : "Continue to Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

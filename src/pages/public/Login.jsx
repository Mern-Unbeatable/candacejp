import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { login, isLoginLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

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
          <h1 className="mb-4 font-serif text-[42px] font-bold tracking-tight">
            Begin Your Journey
          </h1>
          <p className="text-[15px] leading-relaxed text-gray-200 px-4">
            Experience private travel with unmatched
            <br />
            comfort, exclusivity, and concierge support.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex relative w-full items-center justify-center lg:w-1/2">
        {/* Back to Home Button */}
        <Link
          to="/"
          className="absolute left-8 top-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="w-full max-w-xl px-8 py-12 mt-10 lg:mt-0">
          {/* Toggle buttons */}
          <div className="mb-16 flex w-64 rounded-full bg-[#f1f5f9] p-1">
            <button className="w-1/2 rounded-full bg-[#3b82f6] py-2.5 text-sm font-semibold text-white shadow-sm">
              Login
            </button>
            <Link
              to="/register"
              className="flex w-1/2 items-center justify-center rounded-full py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
            >
              Sign Up
            </Link>
          </div>

          <h2 className="mb-2 font-serif text-3xl font-medium text-gray-900">
            Login Your Account
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            Sign in to access your membership account
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm lg:text-base font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your E-mail here"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm lg:text-base font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <div className="mt-1 text-right">
                <Link to="/forgot-password" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoginLoading}
              className="mt-2 w-full rounded-md bg-[#2563eb] py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoginLoading ? "Signing in..." : "Next"}
            </button>
          </form>

          {/* <p className="mt-4 text-center text-sm text-gray-700">
            Not A Member Yet?{" "}
            <Link
              to="/register"
              className="font-bold text-gray-900 underline underline-offset-2 hover:text-black"
            >
              SignUp
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}

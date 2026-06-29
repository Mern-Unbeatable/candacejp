import { useState, useEffect, useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import PasswordInput from "../../../components/common/PasswordInput";

import gsap from "gsap";

import useAuth from "../../../hooks/useAuth";

import { ApiError } from "../../../lib/api/ApiError";

import {

  redirectToCheckout,

  showPaymentRedirectAlert,

  showPaymentRequiredAlert,

} from "../../../utils/paymentAlerts";

import { getApiErrorMessage } from "../../../hooks/useApiError";

import toast from "react-hot-toast";



export default function Login() {

  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.paymentVerified) return

    toast.success('Payment verified successfully. You can now log in.', {
      id: 'payment-verified',
    })
    navigate(location.pathname, { replace: true, state: null })
  }, [location.pathname, location.state?.paymentVerified, navigate]);



  useEffect(() => {

    document.title = "Login - RAVEN";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {

      metaDescription.setAttribute('content', 'Sign in to your Raven Private Aviation membership account to access curated travel routes and premium private flight opportunities.');

    } else {

      const newMeta = document.createElement('meta');

      newMeta.name = 'description';

      newMeta.content = 'Sign in to your Raven Private Aviation membership account to access curated travel routes and premium private flight opportunities.';

      document.head.appendChild(newMeta);

    }



    gsap.fromTo(

      formRef.current,

      { opacity: 0, x: -30 },

      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }

    );

  }, []);



  const { login, resumePayment, isLoginLoading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });

  const [isPaying, setIsPaying] = useState(false);



  const handleChange = (e) => {

    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };



  const handleResumePayment = async () => {

    setIsPaying(true);

    try {

      const data = await resumePayment({

        email: form.email.trim(),

        password: form.password,

      });

      showPaymentRedirectAlert();

      redirectToCheckout(data.checkoutUrl);

    } catch (error) {

      toast.error(getApiErrorMessage(error, 'Unable to start payment checkout'));

    } finally {

      setIsPaying(false);

    }

  };



  const handlePaymentRequired = async (error) => {

    const shouldPay = await showPaymentRequiredAlert(error.message);

    if (shouldPay) {

      await handleResumePayment();

    }

  };



  const handleSubmit = async (e) => {

    e.preventDefault();



    try {

      await login({

        email: form.email.trim(),

        password: form.password,

      });

    } catch (error) {

      if (error instanceof ApiError && error.isPaymentRequired) {

        await handlePaymentRequired(error);

      }

    }

  };



  return (

    <div className="flex min-h-screen w-full bg-white font-sans">

      <div className="relative hidden w-1/2 flex-col justify-center lg:flex">

        <img

          src="/login_page.webp"

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



      <div className="flex relative w-full items-center justify-center lg:w-1/2" ref={formRef}>

        <Link

          to="/"

          className="absolute left-8 top-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"

        >

          <ArrowLeft className="w-4 h-4 mr-2" />

          Back to Home

        </Link>



        <div className="w-full max-w-xl px-8 py-12 mt-24 lg:mt-16">

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

              <PasswordInput
                id="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
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

              disabled={isLoginLoading || isPaying}

              className="mt-2 w-full rounded-md bg-[#2563eb] py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"

            >

              {isLoginLoading ? "Signing in..." : isPaying ? "Redirecting to payment..." : "Next"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}


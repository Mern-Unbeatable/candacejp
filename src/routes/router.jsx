import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import PublicLayout from "../components/layout/public/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import AuthPageSkeleton from "../components/common/skeletons/AuthPageSkeleton";

const PageSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#257AFC]" />
  </div>
);

const Loadable = (Component, fallback = <PageSpinner />) => (props) => (
  <Suspense fallback={fallback}>
    <Component {...props} />
  </Suspense>
);

const Home = Loadable(lazy(() => import("../pages/public/Home/Home")));
const Membership = Loadable(lazy(() => import("../pages/public/Membership/Membership")));
const Terms = Loadable(lazy(() => import("../pages/public/Terms/Terms")));
const FAQ = Loadable(lazy(() => import("../pages/public/FAQ/FAQ")));
const Contact = Loadable(lazy(() => import("../pages/public/Contact/Contact")));
const Login = Loadable(lazy(() => import("../pages/public/login/Login")), <AuthPageSkeleton variant="login" />);
const Register = Loadable(lazy(() => import("../pages/public/register/Register")), <AuthPageSkeleton variant="register" />);
const ForgotPassword = Loadable(lazy(() => import("../pages/public/forgot-password/ForgotPassword")));
const VerifyOTP = Loadable(lazy(() => import("../pages/public/varify-otp/VerifyOTP")));
const ResetPassword = Loadable(lazy(() => import("../pages/public/reset-password/ResetPassword")));
const PaymentSuccess = Loadable(lazy(() => import("../pages/public/payment-success/PaymentSuccess")));

const Overview = Loadable(lazy(() => import("../pages/member/overview/Overview")));
const TravelOpportunities = Loadable(lazy(() => import("../pages/member/travel-opportunities/TravelOpportunities")));
const PendingReservations = Loadable(lazy(() => import("../pages/member/pending-reservations/PendingReservations")));
const UpcomingTrips = Loadable(lazy(() => import("../pages/member/upcoming-trips/UpcomingTrips")));
const TravelPreferences = Loadable(lazy(() => import("../pages/member/travel-preferences/TravelPreferences")));
const CustomTravel = Loadable(lazy(() => import("../pages/member/custom-travel/CustomTravel")));
const Message = Loadable(lazy(() => import("../pages/member/message/Message")));
const Notification = Loadable(lazy(() => import("../pages/member/notification/Notification")));
const Profile = Loadable(lazy(() => import("../pages/member/profile/Profile")));

const ConciergeDashboard = Loadable(lazy(() => import("../pages/concierge/dashboard/Dashboard")));
const CalendarDemand = Loadable(lazy(() => import("../pages/concierge/calendar-demand/CalendarDemand")));
const MembersInterest = Loadable(lazy(() => import("../pages/concierge/member-interest/MembersInterest")));
const MemberInterestDetails = Loadable(lazy(() => import("../pages/concierge/member-interest/MemberInterestDetails")));
const ConciergeOpportunities = Loadable(lazy(() => import("../pages/concierge/opportunities/Opportunities")));
const OpportunitiesDetails = Loadable(lazy(() => import("../pages/concierge/opportunities/opportunities-details/OpportunitiesDetails")));
const NewOpportunity = Loadable(lazy(() => import("../pages/concierge/opportunities/components/NewOpportunity")));
const ConciergeTravelPreferences = Loadable(lazy(() => import("../pages/concierge/travel-preferences/TravelPreferences")));
const ConciergeMessage = Loadable(lazy(() => import("../pages/concierge/message/Message")));
const ConciergeProfile = Loadable(lazy(() => import("../pages/concierge/Profile")));

const AdminDashboardOverview = Loadable(lazy(() => import("../pages/admin/dashboard-overview/DashboardOverview")));
const Members = Loadable(lazy(() => import("../pages/admin/members/Members")));
const ConciergeStaff = Loadable(lazy(() => import("../pages/admin/concierge-staff/ConciergeStaff")));
const AddConcierge = Loadable(lazy(() => import("../pages/admin/add-concierge/AddConcierge")));
const Setting = Loadable(lazy(() => import("../pages/admin/settings/Settings")));
const FlightDemandCalendar = Loadable(lazy(() => import("../components/flight-demand-calendar/FlightDemandCalendar")));

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/membership", element: <Membership /> },
      { path: "/terms", element: <Terms /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-otp", element: <VerifyOTP /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/member",
    element: <ProtectedRoute allowedRoles={["member"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <Overview /> },
          { path: "travel-opportunities", element: <TravelOpportunities /> },
          { path: "pending-reservations", element: <PendingReservations /> },
          { path: "upcoming-trips", element: <UpcomingTrips /> },
          { path: "travel-preferences", element: <TravelPreferences /> },
          { path: "custom-travel", element: <CustomTravel /> },
          { path: "message", element: <Message /> },
          { path: "notification", element: <Notification /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "/concierge",
    element: <ProtectedRoute allowedRoles={["concierge"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <ConciergeDashboard /> },
          { path: "calendar-demand", element: <FlightDemandCalendar /> },
          { path: "demand-details", element: <CalendarDemand /> },
          { path: "members-interest", element: <MembersInterest /> },
          { path: "members-interest/:id", element: <MemberInterestDetails /> },
          { path: "opportunities", element: <ConciergeOpportunities /> },
          { path: "opportunities/new", element: <NewOpportunity /> },
          { path: "opportunities/:id", element: <OpportunitiesDetails /> },
          {
            path: "travel-preferences",
            element: <ConciergeTravelPreferences />,
          },
          { path: "message", element: <ConciergeMessage /> },
          { path: "profile", element: <ConciergeProfile /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard-overview" replace />,
          },
          { path: "dashboard-overview", element: <AdminDashboardOverview /> },
          { path: "members", element: <Members /> },
          { path: "concierge-staff", element: <ConciergeStaff /> },
          { path: "add-concierge", element: <AddConcierge /> },
          { path: "setting", element: <Setting /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

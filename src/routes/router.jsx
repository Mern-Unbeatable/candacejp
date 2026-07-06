import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import PublicLayout from "../components/layout/public/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import AuthPageSkeleton from "../components/common/skeletons/AuthPageSkeleton";
import HomePageSkeleton from "../components/common/skeletons/HomePageSkeleton";
import MembershipPageSkeleton from "../components/common/skeletons/MembershipPageSkeleton";
import AdminDashboardSkeleton from "../components/common/skeletons/AdminDashboardSkeleton";
import MembersPageSkeleton from "../components/common/skeletons/MembersPageSkeleton";
import SupportPageSkeleton from "../components/common/skeletons/SupportPageSkeleton";
import SettingsPageSkeleton from "../components/common/skeletons/SettingsPageSkeleton";
import ConciergeDashboardSkeleton, {
  ConciergeCalendarPageSkeleton,
  CalendarDemandPageSkeleton,
} from "../components/common/skeletons/ConciergeDashboardSkeleton";
import MemberOverviewSkeleton from "../components/common/skeletons/MemberOverviewSkeleton";
import TravelOpportunitiesPageSkeleton from "../components/common/skeletons/TravelOpportunitiesPageSkeleton";
import PendingReservationsPageSkeleton from "../components/common/skeletons/PendingReservationsPageSkeleton";
import UpcomingTripsPageSkeleton from "../components/common/skeletons/UpcomingTripsPageSkeleton";
import NotificationPageSkeleton from "../components/common/skeletons/NotificationPageSkeleton";
import MemberProfilePageSkeleton from "../components/common/skeletons/MemberProfilePageSkeleton";
import TravelPreferencesPageSkeleton from "../components/common/skeletons/TravelPreferencesPageSkeleton";
import CustomTravelPageSkeleton from "../components/common/skeletons/CustomTravelPageSkeleton";

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

const Home = Loadable(lazy(() => import("../pages/public/Home/Home")), <HomePageSkeleton />);
const Membership = Loadable(lazy(() => import("../pages/public/Membership/Membership")), <MembershipPageSkeleton />);
const Terms = Loadable(lazy(() => import("../pages/public/Terms/Terms")));
const FAQ = Loadable(lazy(() => import("../pages/public/FAQ/FAQ")));
const Contact = Loadable(lazy(() => import("../pages/public/Contact/Contact")));
const Login = Loadable(lazy(() => import("../pages/public/login/Login")), <AuthPageSkeleton variant="login" />);
const Register = Loadable(lazy(() => import("../pages/public/register/Register")), <AuthPageSkeleton variant="register" />);
const ForgotPassword = Loadable(lazy(() => import("../pages/public/forgot-password/ForgotPassword")), <AuthPageSkeleton variant="forgot-password" />);
const VerifyOTP = Loadable(lazy(() => import("../pages/public/varify-otp/VerifyOTP")), <AuthPageSkeleton variant="verify-otp" />);
const ResetPassword = Loadable(lazy(() => import("../pages/public/reset-password/ResetPassword")), <AuthPageSkeleton variant="reset-password" />);
const PaymentSuccess = Loadable(lazy(() => import("../pages/public/payment-success/PaymentSuccess")));

const Overview = Loadable(
  lazy(() => import("../pages/member/overview/Overview")),
  <MemberOverviewSkeleton />,
);
const TravelOpportunities = Loadable(
  lazy(() => import("../pages/member/travel-opportunities/TravelOpportunities")),
  <TravelOpportunitiesPageSkeleton />,
);
const PendingReservations = Loadable(
  lazy(() => import("../pages/member/pending-reservations/PendingReservations")),
  <PendingReservationsPageSkeleton />,
);
const UpcomingTrips = Loadable(
  lazy(() => import("../pages/member/upcoming-trips/UpcomingTrips")),
  <UpcomingTripsPageSkeleton />,
);
const TravelPreferences = Loadable(
  lazy(() => import("../pages/member/travel-preferences/TravelPreferences")),
  <TravelPreferencesPageSkeleton />,
);
const CustomTravel = Loadable(
  lazy(() => import("../pages/member/custom-travel/CustomTravel")),
  <CustomTravelPageSkeleton />,
);
const Message = Loadable(lazy(() => import("../pages/member/message/Message")));
const Notification = Loadable(
  lazy(() => import("../pages/member/notification/Notification")),
  <NotificationPageSkeleton />,
);
const Profile = Loadable(
  lazy(() => import("../pages/member/profile/Profile")),
  <MemberProfilePageSkeleton />,
);

const ConciergeDashboard = Loadable(
  lazy(() => import("../pages/concierge/dashboard/Dashboard")),
  <ConciergeDashboardSkeleton />,
);
const CalendarDemand = Loadable(
  lazy(() => import("../pages/concierge/calendar-demand/CalendarDemand")),
  <CalendarDemandPageSkeleton />,
);
const MembersInterest = Loadable(
  lazy(() => import("../pages/concierge/member-interest/MembersInterest")),
  <MembersPageSkeleton />,
);
const MemberInterestDetails = Loadable(
  lazy(() => import("../pages/concierge/member-interest/MemberInterestDetails")),
  <CalendarDemandPageSkeleton />,
);
const ConciergeOpportunities = Loadable(
  lazy(() => import("../pages/concierge/opportunities/Opportunities")),
  null,
);
const OpportunitiesDetails = Loadable(
  lazy(() => import("../pages/concierge/opportunities/opportunities-details/OpportunitiesDetails")),
  <CalendarDemandPageSkeleton />,
);
const NewOpportunity = Loadable(
  lazy(() => import("../pages/concierge/opportunities/components/NewOpportunity")),
  <CalendarDemandPageSkeleton />,
);
const ConciergeTravelPreferences = Loadable(
  lazy(() => import("../pages/concierge/travel-preferences/TravelPreferences")),
  null,
);
const ConciergeMessage = Loadable(lazy(() => import("../pages/concierge/message/Message")));
const ConciergeProfile = Loadable(
  lazy(() => import("../pages/concierge/Profile")),
  <SettingsPageSkeleton />,
);

const AdminDashboardOverview = Loadable(
  lazy(() => import("../pages/admin/dashboard-overview/DashboardOverview")),
  <AdminDashboardSkeleton />,
);
const Members = Loadable(
  lazy(() => import("../pages/admin/members/Members")),
  <MembersPageSkeleton />,
);
const ConciergeStaff = Loadable(
  lazy(() => import("../pages/admin/concierge-staff/ConciergeStaff")),
  <MembersPageSkeleton />,
);
const Support = Loadable(
  lazy(() => import("../pages/admin/support/Support")),
  <SupportPageSkeleton />,
);
const Setting = Loadable(
  lazy(() => import("../pages/admin/settings/Settings")),
  <SettingsPageSkeleton />,
);
const FlightDemandCalendar = Loadable(
  lazy(() => import("../components/flight-demand-calendar/FlightDemandCalendar")),
  <ConciergeCalendarPageSkeleton />,
);

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
          { path: "opportunities/:id/edit", element: <NewOpportunity /> },
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
          { path: "support", element: <Support /> },
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

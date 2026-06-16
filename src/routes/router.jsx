import { createBrowserRouter, Navigate } from "react-router-dom";

import PublicLayout from "../components/layout/public/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Home from "../pages/public/Home/Home";
import Membership from "../pages/public/Membership/Membership";
import Terms from "../pages/public/Terms/Terms";
import FAQ from "../pages/public/FAQ/FAQ";
import Contact from "../pages/public/Contact/Contact";
import Login from "../pages/public/login/Login";
import Register from "../pages/public/register/Register";
import ForgotPassword from "../pages/public/forgot-password/ForgotPassword";
import VerifyOTP from "../pages/public/varify-otp/VerifyOTP";
import ResetPassword from "../pages/public/reset-password/ResetPassword";

import Overview from "../pages/member/overview/Overview";
import TravelOpportunities from "../pages/member/travel-opportunities/TravelOpportunities";
import PendingReservations from "../pages/member/pending-reservations/PendingReservations";
import UpcomingTrips from "../pages/member/upcoming-trips/UpcomingTrips";
import TravelPreferences from "../pages/member/travel-preferences/TravelPreferences";
import CustomTravel from "../pages/member/custom-travel/CustomTravel";
import Message from "../pages/member/message/Message";
import Notification from "../pages/member/notification/Notification";
import Profile from "../pages/member/profile/Profile";

import ConciergeDashboard from "../pages/concierge/dashboard/Dashboard";
import CalendarDemand from "../pages/concierge/calendar-demand/CalendarDemand";
import MembersInterest from "../pages/concierge/member-interest/MembersInterest";
import MemberInterestDetails from "../pages/concierge/member-interest/MemberInterestDetails";
import ConciergeOpportunities from "../pages/concierge/opportunities/Opportunities";
import OpportunitiesDetails from "../pages/concierge/opportunities/opportunities-details/OpportunitiesDetails";
import NewOpportunity from "../pages/concierge/opportunities/components/NewOpportunity";
import ConciergeTravelPreferences from "../pages/concierge/travel-preferences/TravelPreferences";
import ConciergeMessage from "../pages/concierge/message/Message";
import ConciergeProfile from "../pages/concierge/Profile";

import AdminDashboardOverview from "../pages/admin/dashboard-overview/DashboardOverview";
import Members from "../pages/admin/members/Members";
import ConciergeStaff from "../pages/admin/concierge-staff/ConciergeStaff";
import AddConcierge from "../pages/admin/AddConcierge";
import Setting from "../pages/admin/Setting";
import FlightDemandCalendar from "../components/flight-demand-calendar/FlightDemandCalendar";

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

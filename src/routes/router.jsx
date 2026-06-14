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
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import ForgotPassword from "../pages/public/ForgotPassword";
import VerifyOTP from "../pages/public/VerifyOTP";
import ResetPassword from "../pages/public/ResetPassword";

import Overview from "../pages/member/overview/Overview";
import TravelOpportunities from "../pages/member/travel-opportunities/TravelOpportunities";
import PendingReservations from "../pages/member/pending-reservations/PendingReservations";
import UpcomingTrips from "../pages/member/upcoming-trips/UpcomingTrips";
import TravelPreferences from "../pages/member/travel-preferences/TravelPreferences";
import CustomTravel from "../pages/member/custom-travel/CustomTravel";
import Message from "../pages/member/message/Message";
import Notification from "../pages/member/notification/Notification";
import Profile from "../pages/member/Profile";

import ConciergeDashboard from "../pages/concierge/Dashboard";
import CalendarDemand from "../pages/concierge/CalendarDemand";
import MembersInterest from "../pages/concierge/MembersInterest";
import ConciergeOpportunities from "../pages/concierge/Opportunities";
import ConciergeTravelPreferences from "../pages/concierge/TravelPreferences";
import ConciergeMessage from "../pages/concierge/Message";
import ConciergeProfile from "../pages/concierge/Profile";

import AdminDashboardOverview from "../pages/admin/DashboardOverview";
import Members from "../pages/admin/Members";
import ConciergeStaff from "../pages/admin/ConciergeStaff";
import AddConcierge from "../pages/admin/AddConcierge";
import Setting from "../pages/admin/Setting";

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
          { path: "calendar-demand", element: <CalendarDemand /> },
          { path: "members-interest", element: <MembersInterest /> },
          { path: "opportunities", element: <ConciergeOpportunities /> },
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

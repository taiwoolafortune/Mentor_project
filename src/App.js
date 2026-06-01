import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";

// Auth Flows - Create Account
import LandingPage from "./components/landingpage/LandingPage";
import Registration from "./components/authentication/create-account/Registration";
import Upload from "./components/authentication/create-account/Upload";

// Auth Flows - Login & Password Reset Ecosystem (Based on Screenshot 2026-06-01 111229.png)
import Login from "./components/authentication/login/Login";
import ForgetPassword from "./components/authentication/login/ForgetPassword";
import ResetCode from "./components/authentication/login/ResetCode";
import VerificationSuccessful from "./components/authentication/login/VerificationSuccessful";
import PasswordReset from "./components/authentication/login/PasswordReset";

// Dashboard layout imports
import Layout from "./components/Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import MenteeRequest from "./components/pages/mentees-request/MenteeRequest";

// 👑 FIXED: Temporary Lightweight Placeholders to prevent 'is not defined' compilation crashes
const MyMentees = () => <div className="p-4 font-semibold text-slate-700">My Mentees Content Coming Soon...</div>;
const Materials = () => <div className="p-4 font-semibold text-slate-700">Materials Content Coming Soon...</div>;
const Chat = () => <div className="p-4 font-semibold text-slate-700">Chat Content Coming Soon...</div>;
const Meetings = () => <div className="p-4 font-semibold text-slate-700">Meetings Content Coming Soon...</div>;
const Profile = () => <div className="p-4 font-semibold text-slate-700">Profile & Settings Content Coming Soon...</div>;
const Notifications = () => <div className="p-4 font-semibold text-slate-700">Notifications Content Coming Soon...</div>;

// A small wrapper component to safely access the React Router 'useNavigate' context
const LandingPageRouteWrapper = () => {
  const navigate = useNavigate();
  return <LandingPage onProceed={() => navigate("/registration")} />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirecting to landing page */}
        <Route path="/" element={<Navigate to="/landingpage" replace />} />

        {/* Account Creation Routes - Now linked properly via onProceed */}
        <Route path="/landingpage" element={<LandingPageRouteWrapper />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/upload" element={<Upload />} />

        {/* Connected Login & Password Recovery Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-code" element={<ResetCode />} />
        <Route path="/verify-code" element={<VerificationSuccessful />} />
        <Route path="/password-reset-success" element={<PasswordReset />} />

        {/* TEAM DASHBOARD ECOSYSTEM SECTION */}
        <Route
          element={
            <Layout logoSrc="./images/logo.png" brandName="EXEDC" logoutTo="/login" />
          }
        >
          {/* Main Views linked to Sidebar Navigation */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentees-request" element={<MenteeRequest />} />
          <Route path="/my-mentee" element={<MyMentees />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meetings" element={<Meetings />} />
          
          {/* Header Actions & Settings Navigation */}
          <Route path="/settings" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
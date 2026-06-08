import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";

// Auth Flows - Create Account
import LandingPage from "./components/landingpage/LandingPage";
import Registration from "./components/authentication/create-account/Registration";
import Upload from "./components/authentication/create-account/Upload";
import EmailVerificationCard from "./components/authentication/create-account/EmailVerificationCard";
import RegistrationSuccess from "./components/authentication/create-account/VerificationSuccessful"; // 👈 IMPORTED HERE

// Auth Flows - Login & Password Reset Ecosystem
import Login from "./components/authentication/login/Login";
import ForgetPassword from "./components/authentication/login/ForgetPassword";
import ResetCode from "./components/authentication/login/ResetCode";
import VerificationSuccessful from "./components/authentication/login/VerificationSuccessful";
import PasswordReset from "./components/authentication/login/PasswordReset";

// Dashboard layout imports
import Layout from "./components/Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import MenteeRequest from "./components/pages/mentees-request/MenteeRequest";
import MyMentee from "./components/pages/mentees-request/MyMentee";
import Materials from "./components/pages/materials/Material";
import Chat from "./components/pages/chat/Chat";
import Meetings from "./components/pages/meetings/Meetings";
import Profile from "./components/pages/profile/Profile";
import Notification from "./components/pages/dashboard/Notification";
// 👑 FIXED: Temporary Lightweight Placeholders to prevent 'is not defined' compilation crashes
// const Materials = () => <div className="p-4 font-semibold text-slate-700">Materials Content Coming Soon...</div>;
// const Chat = () => <div className="p-4 font-semibold text-slate-700">Chat Content Coming Soon...</div>;
// const Meetings = () => <div className="p-4 font-semibold text-slate-700">Meetings Content Coming Soon...</div>;
// const Profile = () => <div className="p-4 font-semibold text-slate-700">Profile & Settings Content Coming Soon...</div>;
// const Notifications = () => <div className="p-4 font-semibold text-slate-700">Notifications Content Coming Soon...</div>;
// Temporary Lightweight Placeholders to prevent compilation crashes
const MyMentees = () => <div className="p-4 font-semibold text-slate-700"></div>;
const Material = () => <div className="p-4 font-semibold text-slate-700"></div>;
const Chats = () => <div className="p-4 font-semibold text-slate-700"></div>;
const Meeting = () => <div className="p-4 font-semibold text-slate-700"></div>;
const Profiles = () => <div className="p-4 font-semibold text-slate-700"></div>;
const Notifications = () => <div className="p-4 font-semibold text-slate-700"></div>;

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

        {/* Account Creation Routes */}
        <Route path="/landingpage" element={<LandingPageRouteWrapper />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/verify-email" element={<EmailVerificationCard />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} /> {/* 👈 NEW PATH ADDED */}

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentees-request" element={<MenteeRequest />} />
          <Route path="/my-mentee" element={<MyMentee />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meetings" element={<Meetings />} />
          
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Auth Flows
import LandingPage from "./components/landingpage/LandingPage";
import Registration from "./components/authentication/create-account/Registration";
import Upload from "./components/authentication/create-account/Upload";

// Dashboard layout imports
import Layout from "./components/Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
// ... (keep the rest of your dashboard imports exactly the same)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* STEP 1: Landing selection interface */}
        <Route path="/landingpage" element={<LandingPage />} />
        
        {/* STEP 2: The standard Signup Form */}
        <Route path="/registration" element={<Registration />} />
        
        {/* STEP 3: The Profile Upload Page */}
        <Route path="/upload" element={<Upload />} />

        {/* TEAM DASHBOARD ECOSYSTEM SECTION */}
        <Route
          element={
            <Layout logoSrc="./images/logo.png" brandName="EXEDC" logoutTo="/" />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ... (keep your other dashboard sub-routes here) */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Details } from "./pages/Details";
import { Monitoring } from "./pages/Monitoring";
import { Admin } from "./pages/Admin";
import { UserManagement } from "./pages/UserManagement";
import { Summary } from "./pages/Summary";
import { Configuration } from "./pages/Configuration";

// Main app for the Flood Monitoring System
// now responsible for routing between multiple screens
// split App into router wrapper and content so we can read location
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* only show nav when not on login screen */}
      {location.pathname !== "/login" && <NavBar />}

      <Routes>
        {/* authentication screen */}
        <Route path="/login" element={<Login />} />

        {/* dashboard acts as the home screen after login */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* sub‑views off of the dashboard */}
        <Route path="/details" element={<Details />} />
        <Route path="/monitoring" element={<Monitoring />} />

        {/* administrative section */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<UserManagement />} />

        {/* summary/configuration flows */}
        <Route path="/summary" element={<Summary />} />
        <Route path="/configuration" element={<Configuration />} />

        {/* redirect bare root to login as well as any unknown URL */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

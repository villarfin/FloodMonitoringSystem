import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppShell } from "./components/AppShell";
import { LoginScreen } from "./screens/LoginScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { AdminScreen } from "./screens/AdminScreen";
import { UserManagementScreen } from "./screens/UserManagementScreen";
import { MonitoringScreen } from "./screens/MonitoringScreen";
import { IncidentReportScreen } from "./screens/IncidentReportScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { SummaryScreen } from "./screens/SummaryScreen";
import { ConfigurationScreen } from "./screens/ConfigurationScreen";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "admin", label: "Admin" },
  { key: "monitoring", label: "Monitoring" },
  { key: "incident-report", label: "Incident Report" },
  { key: "notifications", label: "Notifications" },
  { key: "summary", label: "Summary" },
];

const SCREEN_COMPONENTS = {
  dashboard: DashboardScreen,
  admin: AdminScreen,
  "user-management": UserManagementScreen,
  monitoring: MonitoringScreen,
  "incident-report": IncidentReportScreen,
  notifications: NotificationsScreen,
  summary: SummaryScreen,
  configuration: ConfigurationScreen,
};

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeRoute, setActiveRoute] = useState("dashboard");

  const ActiveScreen = SCREEN_COMPONENTS[activeRoute] || DashboardScreen;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {!isSignedIn ? (
        <LoginScreen
          onLogin={() => {
            setIsSignedIn(true);
            setActiveRoute("dashboard");
          }}
        />
      ) : (
        <AppShell
          activeRoute={activeRoute}
          navItems={NAV_ITEMS}
          onNavigate={setActiveRoute}
          onLogout={() => {
            setIsSignedIn(false);
            setActiveRoute("dashboard");
          }}
        >
          <ActiveScreen onNavigate={setActiveRoute} />
        </AppShell>
      )}
    </SafeAreaProvider>
  );
}

import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "*",
    Component: Dashboard, // Fallback to dashboard for now
  }
]);

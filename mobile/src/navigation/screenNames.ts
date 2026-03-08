import { RootStackParamList } from "../types";

export const appScreens: Array<Exclude<keyof RootStackParamList, "AdminLogin">> = [
  "Dashboard",
  "Admin",
  "UserManagement",
  "Monitoring",
  "IncidentReport",
  "Notifications",
  "Summary",
  "Configuration",
];


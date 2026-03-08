export type WaterStatus = "Safe" | "Warning" | "Danger";
export type WaterTrend = "Rising" | "Stable" | "Falling";

export interface MonitoredWater {
  id: string;
  locationName: string;
  locationType: "River" | "Creek" | "Canal";
  barangay: string;
  municipality: string;
  currentLevel: number;
  maxLevel: number;
  status: WaterStatus;
  sensorId: string;
  trend: WaterTrend;
  lastUpdated: string;
  notes: string;
}

export type NotificationType = "Tsunami" | "Flood" | "Rainfall";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  isRead: boolean;
}

export type RootStackParamList = {
  AdminLogin: undefined;
  Dashboard: undefined;
  Admin: undefined;
  UserManagement: undefined;
  Monitoring: undefined;
  IncidentReport: undefined;
  Notifications: undefined;
  Summary: undefined;
  Configuration: undefined;
};



import { AlertTriangle, Info, CheckCircle, Bell, User, CloudRain, Thermometer, Wifi, Battery, Activity } from "lucide-react";

export interface WaterLevel {
  id: string;
  name: string;
  level: number; // meters
  percentage: number;
  status: "Normal" | "Alert" | "Warning" | "Critical";
  lastUpdate: string;
  lat: number; // relative % for map placement
  lng: number; // relative % for map placement
}

export const waterLevels: WaterLevel[] = [
  { id: "1", name: "River Station A", level: 3.2, percentage: 45, status: "Normal", lastUpdate: "10 mins ago", lat: 30, lng: 40 },
  { id: "2", name: "Coastal Point B", level: 5.8, percentage: 75, status: "Warning", lastUpdate: "2 mins ago", lat: 60, lng: 70 },
  { id: "3", name: "Dam Overflow C", level: 8.9, percentage: 92, status: "Critical", lastUpdate: "Just now", lat: 45, lng: 20 },
  { id: "4", name: "Creek D", level: 1.5, percentage: 20, status: "Normal", lastUpdate: "15 mins ago", lat: 20, lng: 80 },
  { id: "5", name: "Reservoir E", level: 6.1, percentage: 65, status: "Alert", lastUpdate: "5 mins ago", lat: 75, lng: 30 },
];

export const trendData = [
  { time: "06:00", level: 2.1 },
  { time: "08:00", level: 2.3 },
  { time: "10:00", level: 2.8 },
  { time: "12:00", level: 3.5 },
  { time: "14:00", level: 4.2 },
  { time: "16:00", level: 5.8 }, // Spike
  { time: "18:00", level: 6.1 },
  { time: "20:00", level: 5.9 },
];

export const alerts = [
  { id: 1, area: "Dam Overflow C", status: "Critical", time: "14:35", response: "Evacuation Ordered" },
  { id: 2, area: "Coastal Point B", status: "Warning", time: "14:10", response: "Monitoring Team Dispatched" },
  { id: 3, area: "Reservoir E", status: "Alert", time: "13:45", response: "Standby" },
];

export const evacuationCenters = [
  { name: "City High School Gym", capacity: "85%", status: "Open", type: "Primary" },
  { name: "Community Center Hall", capacity: "40%", status: "Open", type: "Secondary" },
  { name: "North District Sports Complex", capacity: "0%", status: "Standby", type: "Backup" },
];

export const systemStatus = {
  sensorsOnline: 48,
  sensorsTotal: 50,
  lastSync: "2024-10-24 14:45:00",
  batteryLevel: "94%",
  networkStrength: "Strong",
};

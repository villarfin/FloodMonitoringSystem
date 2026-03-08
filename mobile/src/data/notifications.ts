import { NotificationItem } from "../types";

export const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Tsunami Sensor Spike",
    message: "Offshore buoy detected unusual pressure change.",
    type: "Tsunami",
    time: "08:31",
    isRead: false,
  },
  {
    id: "n2",
    title: "River Level Warning",
    message: "Cagayan De Oro River reached warning threshold.",
    type: "Flood",
    time: "08:12",
    isRead: false,
  },
];

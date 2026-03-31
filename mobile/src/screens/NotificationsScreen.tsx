import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import { MobileCard } from "../components/MobileCard";
import { initialNotifications } from "../data/notifications";
import { useMobileWeather } from "../hooks/useMobileWeather";
import { deriveMobileWeatherAlerts } from "../utils/weatherAlerts";
import { NotificationItem } from "../types";
import { styles } from "../styles/pages/NotificationsScreen.styles";

export function NotificationsScreen() {
  const { status, payload } = useMobileWeather();
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [readOverrides, setReadOverrides] = useState<Record<string, boolean>>({});

  const liveWeatherItems = useMemo<NotificationItem[]>(() => {
    if (!payload) return [];
    return deriveMobileWeatherAlerts(payload).map((alert) => ({
      id: `live-${alert.id}`,
      title: `[Live Weather] ${alert.title}`,
      message: alert.message,
      type: alert.type === "danger" ? "Flood" : "Rainfall",
      time: new Date(payload.observedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
    }));
  }, [payload]);

  const mergedItems = useMemo(() => {
    return [...liveWeatherItems, ...items].map((item) => ({
      ...item,
      isRead: readOverrides[item.id] ?? item.isRead,
    }));
  }, [items, liveWeatherItems, readOverrides]);

  const filteredItems = mergedItems;

  const unreadCount = mergedItems.filter((item) => !item.isRead).length;

  const toggleRead = (id: string) => {
    setReadOverrides((previous) => ({
      ...previous,
      [id]: !(previous[id] ?? mergedItems.find((item) => item.id === id)?.isRead ?? false),
    }));
  };

  const markAllAsRead = () => {
    const updates: Record<string, boolean> = {};
    mergedItems.forEach((item) => {
      updates[item.id] = true;
    });
    setReadOverrides((previous) => ({ ...previous, ...updates }));
  };

  const clearAll = () => setItems([]);

  return (
    <ScreenLayout title="Notifications" subtitle="Manage tsunami/flood alerts and read state.">
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={markAllAsRead}>
          <Text style={styles.actionText}>Mark all as read</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={clearAll}>
          <Text style={styles.actionText}>Clear all</Text>
        </Pressable>
      </View>

      <Text style={styles.unreadText}>Unread notifications: <Text style={styles.unreadValue}>{unreadCount}</Text></Text>

      {filteredItems.length === 0 ? (
        <Text style={styles.empty}>No notifications to show.</Text>
      ) : (
        filteredItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              if (!item.isRead) toggleRead(item.id);
            }}
          >
            <MobileCard style={!item.isRead ? styles.cardUnread : undefined}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>
              <Text style={styles.cardMessage}>{item.message}</Text>
              <Text style={styles.cardType}>{item.type}</Text>
              <Pressable style={styles.cardButton} onPress={() => toggleRead(item.id)}>
                <Text style={styles.cardButtonText}>{item.isRead ? "Mark as unread" : "Mark as read"}</Text>
              </Pressable>
            </MobileCard>
          </Pressable>
        ))
      )}
    </ScreenLayout>
  );
}

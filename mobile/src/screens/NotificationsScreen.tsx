import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import { MobileCard } from "../components/MobileCard";
import { initialNotifications } from "../data/notifications";
import { useMobileWeather } from "../hooks/useMobileWeather";
import { deriveMobileWeatherAlerts } from "../utils/weatherAlerts";
import { NotificationItem, NotificationType } from "../types";
import { colors } from "../styles/theme";

export function NotificationsScreen() {
  const { status, payload } = useMobileWeather();
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [readOverrides, setReadOverrides] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState<"All" | NotificationType>("All");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

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

  const filteredItems = useMemo(
    () =>
      mergedItems.filter((item) => {
        const typeOk = filterType === "All" || item.type === filterType;
        const unreadOk = !showUnreadOnly || !item.isRead;
        return typeOk && unreadOk;
      }),
    [mergedItems, filterType, showUnreadOnly],
  );

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
      <Text style={styles.liveText}>Live weather feed: <Text style={styles.liveValue}>{status === "loading" ? "Updating..." : "Synced"}</Text></Text>
      <Text style={styles.label}>Filter Type</Text>
      <View style={styles.filtersRow}>
        {["All", "Tsunami", "Flood", "Rainfall"].map((value) => {
          const isActive = value === filterType;
          return (
            <Pressable
              key={value}
              onPress={() => setFilterType(value as "All" | NotificationType)}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{value}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Unread only</Text>
        <Switch value={showUnreadOnly} onValueChange={setShowUnreadOnly} />
      </View>

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
          <MobileCard key={item.id}>
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
        ))
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  liveText: {
    color: colors.textMuted,
    marginBottom: 8,
  },
  liveValue: {
    color: colors.brand,
    fontWeight: "700",
  },
  label: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: 8,
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  filterChipActive: {
    borderColor: colors.brand,
    backgroundColor: "#e7efff",
  },
  filterText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  filterTextActive: {
    color: colors.brand,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  switchLabel: {
    color: colors.text,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.brand,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#eef4ff",
  },
  actionText: {
    color: colors.brand,
    fontWeight: "700",
    fontSize: 12,
  },
  unreadText: {
    color: colors.textMuted,
    marginBottom: 10,
  },
  unreadValue: {
    color: colors.text,
    fontWeight: "800",
  },
  empty: {
    color: colors.textMuted,
    fontStyle: "italic",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 16,
    flex: 1,
  },
  cardTime: {
    color: colors.textMuted,
    fontSize: 12,
  },
  cardMessage: {
    color: colors.textMuted,
    marginTop: 6,
    lineHeight: 20,
  },
  cardType: {
    marginTop: 8,
    color: colors.brand,
    fontWeight: "700",
  },
  cardButton: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: colors.brand,
    fontWeight: "700",
  },
});

import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const initialNotifications = [
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
  {
    id: "n3",
    title: "Heavy Rainfall Forecast",
    message: "Weather system predicts intense rain in 2 hours.",
    type: "Rainfall",
    time: "07:55",
    isRead: true,
  },
];

const FILTER_OPTIONS = ["All", "Tsunami", "Flood", "Rainfall"];

export function NotificationsScreen() {
  const [items, setItems] = useState(initialNotifications);
  const [filterType, setFilterType] = useState("All");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const typeOk = filterType === "All" || item.type === filterType;
      const unreadOk = !showUnreadOnly || !item.isRead;
      return typeOk && unreadOk;
    });
  }, [filterType, items, showUnreadOnly]);

  const unreadCount = items.filter((item) => !item.isRead).length;

  const toggleRead = (id) => {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, isRead: !item.isRead } : item)),
    );
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Notifications Center</Text>
      <Text style={styles.pageText}>
        Manage tsunami/flood alerts and mark updates as read/unread.
      </Text>

      <View style={styles.toolbarCard}>
        <Text style={styles.fieldLabel}>Filter Type</Text>
        <View style={styles.filterList}>
          {FILTER_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[styles.filterChip, filterType === option && styles.filterChipActive]}
              onPress={() => setFilterType(option)}
            >
              <Text style={[styles.filterChipText, filterType === option && styles.filterChipTextActive]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.checkboxRow} onPress={() => setShowUnreadOnly((value) => !value)}>
          <View style={[styles.checkbox, showUnreadOnly && styles.checkboxActive]}>
            {showUnreadOnly ? <Text style={styles.checkboxMark}>X</Text> : null}
          </View>
          <Text style={styles.checkboxLabel}>Unread only</Text>
        </Pressable>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.actionButton}
            onPress={() => setItems((previous) => previous.map((item) => ({ ...item, isRead: true })))}
          >
            <Text style={styles.actionButtonText}>Mark all as read</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => setItems([])}>
            <Text style={styles.actionButtonText}>Clear all</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.pageText}>
        Unread notifications: <Text style={styles.strong}>{unreadCount}</Text>
      </Text>

      {filteredItems.length === 0 ? (
        <Text style={styles.emptyText}>No notifications to show.</Text>
      ) : (
        filteredItems.map((item) => (
          <View key={item.id} style={[styles.notificationCard, item.isRead && styles.notificationCardRead]}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
            <Text style={styles.pageText}>{item.message}</Text>
            <Text style={styles.notificationType}>{item.type}</Text>
            <Pressable onPress={() => toggleRead(item.id)}>
              <Text style={styles.linkButton}>{item.isRead ? "Mark as unread" : "Mark as read"}</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  title: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  pageText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  toolbarCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 14,
  },
  fieldLabel: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 10,
  },
  filterList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  filterChip: {
    backgroundColor: "#e2e8f0",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: "#0ea5e9",
  },
  filterChipText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  filterChipTextActive: {
    color: "#ffffff",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: "#0ea5e9",
    borderColor: "#0ea5e9",
  },
  checkboxMark: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },
  checkboxLabel: {
    color: "#334155",
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  actionButtonText: {
    color: "#0284c7",
    fontSize: 13,
    fontWeight: "700",
  },
  strong: {
    fontWeight: "800",
    color: "#0f172a",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 15,
    fontStyle: "italic",
  },
  notificationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 12,
  },
  notificationCardRead: {
    opacity: 0.65,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  notificationTitle: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
    flex: 1,
    paddingRight: 12,
  },
  notificationTime: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },
  notificationType: {
    color: "#0284c7",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  linkButton: {
    color: "#0284c7",
    fontSize: 13,
    fontWeight: "700",
  },
});

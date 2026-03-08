import { View, Text, StyleSheet } from "react-native";

export function AlertCard({ title, message, type }) {
  const variant = type === "warning" ? "warning" : type === "danger" ? "danger" : "info";

  const colors = {
    warning: { bg: "#fffbeb", border: "#fde68a", icon: "Warning", iconBg: "#fef3c7", title: "#92400e" },
    danger: { bg: "#fef2f2", border: "#fecaca", icon: "Alert", iconBg: "#fee2e2", title: "#991b1b" },
    info: { bg: "#eff6ff", border: "#bfdbfe", icon: "Info", iconBg: "#dbeafe", title: "#1e40af" },
  };

  const c = colors[variant];

  return (
    <View style={[styles.card, { backgroundColor: c.bg, borderColor: c.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: c.iconBg }]}>
        <Text style={styles.icon}>{c.icon}</Text>
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { color: c.title }]}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 10,
    alignItems: "flex-start",
    gap: 12,
  },
  iconWrap: {
    minWidth: 36,
    minHeight: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  icon: {
    fontSize: 12,
    fontWeight: "700",
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 3,
  },
  message: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
  },
});

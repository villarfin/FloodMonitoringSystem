import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export function AdminScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Admin View</Text>
        <Text style={styles.pageText}>
          Administrative actions such as configuration or user management are accessible here.
        </Text>
        <View style={styles.graphPlaceholder}>
          <Text style={styles.graphTitle}>IoT Alert History Graph (Prototype)</Text>
          <Text style={styles.pageText}>
            This section is reserved for past tsunami/flood alert records from the IoT device.
          </Text>
        </View>
        <Pressable onPress={() => onNavigate("user-management")}>
          <Text style={styles.pageLink}>User Management</Text>
        </Pressable>
      </View>
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  title: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  pageText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  graphPlaceholder: {
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 12,
  },
  graphTitle: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  pageLink: {
    color: "#0284c7",
    fontSize: 14,
    fontWeight: "700",
  },
});

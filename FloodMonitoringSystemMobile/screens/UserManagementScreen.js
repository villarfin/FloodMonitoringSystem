import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export function UserManagementScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>User Management</Text>
        <Text style={styles.pageText}>
          Here an admin can add, remove, or modify users in the system.
        </Text>
        <Pressable onPress={() => onNavigate("admin")}>
          <Text style={styles.pageLink}>Back to Admin</Text>
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
  pageLink: {
    color: "#0284c7",
    fontSize: 14,
    fontWeight: "700",
  },
});

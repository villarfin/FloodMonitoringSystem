import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenLayout } from "../components/ScreenLayout";
import { RootStackParamList } from "../types";
import { colors } from "../styles/theme";

export function AdminScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenLayout
      title="Admin"
      subtitle="Administrative actions such as configuration or user management are accessible here."
    >
      <View style={styles.graphPlaceholder}>
        <Text style={styles.graphTitle}>IoT Alert History Graph (Prototype)</Text>
        <Text style={styles.graphText}>
          This section is reserved for past tsunami/flood alert records from the IoT device.
        </Text>
      </View>

      <Pressable style={styles.action} onPress={() => navigation.navigate("UserManagement")}>
        <Text style={styles.actionText}>User Management</Text>
      </Pressable>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  graphPlaceholder: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  graphTitle: {
    color: colors.text,
    fontWeight: "800",
    marginBottom: 4,
  },
  graphText: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  action: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.brand,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#e7efff",
  },
  actionText: {
    color: colors.brand,
    fontWeight: "700",
  },
});


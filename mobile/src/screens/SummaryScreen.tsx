import { StyleSheet, Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import { colors } from "../styles/theme";

export function SummaryScreen() {
  return (
    <ScreenLayout title="Summary" subtitle="A high-level summary of system state can be shown here.">
      <View style={styles.card}>
        <Text style={styles.label}>Daily Situation Summary</Text>
        <Text style={styles.value}>2 Danger, 2 Warning, 2 Safe monitored waters</Text>
        <Text style={styles.note}>Use Monitoring and Notifications for detailed updates.</Text>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    backgroundColor: colors.surface,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
  },
  value: {
    color: colors.text,
    fontWeight: "700",
    marginTop: 3,
  },
  note: {
    color: colors.textMuted,
    marginTop: 8,
  },
});

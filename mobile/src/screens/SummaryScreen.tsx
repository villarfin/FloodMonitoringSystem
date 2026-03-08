import { Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import { styles } from "../styles/pages/SummaryScreen.styles";

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

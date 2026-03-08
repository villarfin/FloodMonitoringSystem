import { Text, View } from "react-native";
import { MobileCard } from "./MobileCard";
import { styles } from "../styles/components/StatsCard.styles";

interface StatsCardProps {
  label: string;
  value: string;
  icon: string;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <MobileCard>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Text style={styles.icon}>{icon}</Text>
      </View>
    </MobileCard>
  );
}

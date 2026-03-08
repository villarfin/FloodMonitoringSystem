import { Text, View } from "react-native";
import { MobileCard } from "./MobileCard";
import { colors } from "../styles/theme";
import { styles } from "../styles/components/AlertCard.styles";

interface AlertCardProps {
  title: string;
  message: string;
  type: "warning" | "danger" | "info";
}

export function AlertCard({ title, message, type }: AlertCardProps) {
  const tint = type === "danger" ? colors.danger : type === "warning" ? colors.warning : colors.brand;
  const bg = type === "danger" ? "#f7eded" : type === "warning" ? "#f4f0df" : "#eaf2ff";

  return (
    <View style={[styles.wrap, { borderLeftColor: tint, backgroundColor: bg }]}>
      <MobileCard>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </MobileCard>
    </View>
  );
}

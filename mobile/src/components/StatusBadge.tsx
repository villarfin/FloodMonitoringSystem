import { Text, View } from "react-native";
import { styles } from "../styles/components/StatusBadge.styles";
import { WaterStatus } from "../types";
import { colors } from "../styles/theme";

interface StatusBadgeProps {
  status: WaterStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const color =
    status === "Danger" ? colors.danger : status === "Warning" ? colors.warning : colors.safe;

  return (
    <View style={[styles.badge, { borderColor: color, backgroundColor: `${color}18` }]}>
      <Text style={[styles.label, { color }]}>{status}</Text>
    </View>
  );
}

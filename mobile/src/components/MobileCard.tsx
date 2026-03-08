import { PropsWithChildren } from "react";
import { View } from "react-native";
import { styles } from "../styles/components/MobileCard.styles";

export function MobileCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

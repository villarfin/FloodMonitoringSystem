import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { styles } from "../styles/components/MobileCard.styles";

export function MobileCard({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

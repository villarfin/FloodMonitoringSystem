import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../styles/theme";

export function MobileCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
});


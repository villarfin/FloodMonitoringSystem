import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 28,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 12,
  },
  nav: {
    marginBottom: 12,
  },
  tab: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  tabActive: {
    borderColor: colors.brand,
    backgroundColor: "#e7efff",
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  tabTextActive: {
    color: colors.brand,
  },
  body: {
    marginTop: 4,
  },
});


import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  cover: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  levelText: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
  },
  maxText: {
    color: colors.textMuted,
    marginTop: 2,
  },
  progressTrack: {
    marginTop: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  percentText: {
    marginTop: 8,
    color: colors.textMuted,
    fontSize: 12,
  },
  expandedWrap: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});


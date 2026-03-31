import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.brand,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#eef4ff",
  },
  actionText: {
    color: colors.brand,
    fontWeight: "700",
    fontSize: 12,
  },
  unreadText: {
    color: colors.textMuted,
    marginBottom: 10,
  },
  unreadValue: {
    color: colors.text,
    fontWeight: "800",
  },
  empty: {
    color: colors.textMuted,
    fontStyle: "italic",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 16,
    flex: 1,
  },
  cardTime: {
    color: colors.textMuted,
    fontSize: 12,
  },
  cardUnread: {
    backgroundColor: "#e8f0fe",
    borderColor: "#accbff",
    borderWidth: 1,
  },
  cardMessage: {
    color: colors.textMuted,
    marginTop: 6,
    lineHeight: 20,
  },
  cardType: {
    marginTop: 8,
    color: colors.brand,
    fontWeight: "700",
  },
  cardButton: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: colors.brand,
    fontWeight: "700",
  },
});


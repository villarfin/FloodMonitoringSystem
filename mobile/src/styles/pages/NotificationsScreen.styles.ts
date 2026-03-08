import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  liveText: {
    color: colors.textMuted,
    marginBottom: 8,
  },
  liveValue: {
    color: colors.brand,
    fontWeight: "700",
  },
  label: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: 8,
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  filterChipActive: {
    borderColor: colors.brand,
    backgroundColor: "#e7efff",
  },
  filterText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  filterTextActive: {
    color: colors.brand,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  switchLabel: {
    color: colors.text,
  },
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


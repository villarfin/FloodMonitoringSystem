import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  panel: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2e3e57",
    padding: 12,
    backgroundColor: "#101927",
  },
  label: {
    color: "#b7c7df",
    fontSize: 12,
  },
  location: {
    color: "#f8fbff",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  temp: {
    fontSize: 38,
    fontWeight: "800",
    color: "#f8fbff",
  },
  metric: {
    color: "#c2d4f0",
    lineHeight: 20,
  },
  weatherText: {
    marginTop: 10,
    color: "#f8fbff",
    fontWeight: "700",
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  action: {
    color: "#d6e5fd",
    fontWeight: "700",
  },
  tabs: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8,
  },
  tab: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#facc15",
  },
  tabText: {
    color: "#b4c8e5",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#f8fbff",
  },
  chartWrap: {
    marginTop: 10,
  },
  chartItem: {
    width: 44,
    alignItems: "center",
    marginRight: 10,
  },
  chartValue: {
    color: "#d7e3f7",
    fontWeight: "700",
  },
  chartTime: {
    color: "#8fa4c4",
    fontSize: 11,
  },
  dailyWrap: {
    marginTop: 10,
  },
  dailyItem: {
    borderWidth: 1,
    borderColor: "#324560",
    borderRadius: 10,
    backgroundColor: "#132134",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    minWidth: 88,
    alignItems: "center",
  },
  dailyDay: {
    color: "#d8e5f8",
    fontWeight: "700",
  },
  dailyTemp: {
    color: "#c2d4f0",
    fontSize: 12,
    marginTop: 3,
  },
  linkedRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkedTitle: {
    color: "#f0f6ff",
    fontWeight: "700",
  },
  linkedCount: {
    color: "#b8cae5",
    marginTop: 4,
  },
  link: {
    color: "#93c5fd",
    fontWeight: "700",
  },
  errorText: {
    color: "#fca5a5",
    marginTop: 6,
  },
});


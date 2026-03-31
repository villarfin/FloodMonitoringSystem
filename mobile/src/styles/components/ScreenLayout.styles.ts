import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#4267B2",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.16)",
  },
  brand: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
  },
  notificationButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 4,
    backgroundColor: "transparent",
  },
  headerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#4267B2",
  },
  headerNavItem: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  headerNavItemActive: {
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  headerNavText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  headerNavTextActive: {
    color: "#ffffff",
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#4267B2",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
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
  body: {
    marginTop: 4,
    paddingBottom: 80,
  },
});

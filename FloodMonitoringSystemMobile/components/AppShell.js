import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AppShell({ activeRoute, navItems, onNavigate, onLogout, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const handleNavigate = (key) => {
    onNavigate(key);
    setMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.app}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Flood Monitoring System</Text>
            <Text style={styles.subtitle}>Real-time water level monitoring and alerts</Text>
          </View>
          <Pressable
            style={styles.toggle}
            onPress={() => setMenuOpen((open) => !open)}
            accessibilityRole="button"
            accessibilityLabel="Toggle navigation"
          >
            <View style={styles.hamburgerBar} />
            <View style={styles.hamburgerBar} />
            <View style={styles.hamburgerBar} />
          </Pressable>
        </View>

        <View style={styles.workspace}>
          {menuOpen ? (
            <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
              <View />
            </Pressable>
          ) : null}

          {menuOpen ? (
            <View style={styles.sidebar}>
              <Text style={styles.sidebarTitle}>Navigation</Text>
              <ScrollView>
                {navItems.map((item) => (
                  <Pressable
                    key={item.key}
                    style={[styles.navLink, activeRoute === item.key && styles.navLinkActive]}
                    onPress={() => handleNavigate(item.key)}
                  >
                    <Text style={[styles.navLinkText, activeRoute === item.key && styles.navLinkTextActive]}>
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
                <Pressable style={[styles.navLink, styles.logoutButton]} onPress={onLogout}>
                  <Text style={[styles.navLinkText, styles.logoutButtonText]}>Log Out</Text>
                </Pressable>
              </ScrollView>
            </View>
          ) : null}

          <View style={styles.main}>{children}</View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Flood Monitoring System {currentYear}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e2e8f0",
  },
  app: {
    flex: 1,
    backgroundColor: "#e2e8f0",
  },
  header: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerCopy: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 18,
  },
  toggle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  hamburgerBar: {
    width: 20,
    height: 2,
    backgroundColor: "#f8fafc",
    marginVertical: 2,
    borderRadius: 999,
  },
  workspace: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    zIndex: 20,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderRightColor: "#cbd5e1",
    paddingHorizontal: 16,
    paddingVertical: 20,
    zIndex: 30,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 16,
  },
  navLink: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#f8fafc",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  navLinkActive: {
    backgroundColor: "#0ea5e9",
    borderColor: "#0ea5e9",
  },
  navLinkText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "700",
  },
  navLinkTextActive: {
    color: "#ffffff",
  },
  logoutButton: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
    marginTop: 8,
  },
  logoutButtonText: {
    color: "#b91c1c",
  },
  main: {
    flex: 1,
    padding: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#cbd5e1",
  },
  footerText: {
    color: "#334155",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});

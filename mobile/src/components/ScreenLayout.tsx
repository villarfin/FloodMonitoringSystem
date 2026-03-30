import { PropsWithChildren, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { appScreens } from "../navigation/screenNames";
import { RootStackParamList } from "../types";
import { styles } from "../styles/components/ScreenLayout.styles";

interface ScreenLayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

const screenLabels: Record<(typeof appScreens)[number], string> = {
  Dashboard: "Dashboard",
  Monitoring: "Monitoring",
  IncidentReport: "Incident Report",
  Notifications: "Notifications",
};

export function ScreenLayout({ title, subtitle, children }: ScreenLayoutProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [route.name]);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.menuAnchor}>
        <Pressable
          onPress={() => setMenuOpen((current) => !current)}
          style={styles.menuButton}
          accessibilityRole="button"
          accessibilityLabel="Open navigation menu"
          accessibilityState={{ expanded: menuOpen }}
        >
          <View style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </Pressable>
      </View>

      {menuOpen ? <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} /> : null}

      <View pointerEvents={menuOpen ? "auto" : "none"} style={[styles.menuPanel, menuOpen && styles.menuPanelOpen]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Navigation</Text>
          <Pressable onPress={() => setMenuOpen(false)} style={styles.menuClose} accessibilityRole="button">
            <Text style={styles.menuCloseText}>×</Text>
          </Pressable>
        </View>

        {appScreens.map((screen) => {
          const isActive = route.name === screen;
          return (
            <Pressable
              key={screen}
              onPress={() => navigation.navigate(screen)}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
            >
              <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>{screenLabels[screen]}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <View style={styles.body}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

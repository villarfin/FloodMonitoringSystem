import { PropsWithChildren } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../types";
import { styles } from "../styles/components/ScreenLayout.styles";

const bottomTabs: Array<{
  screen: keyof RootStackParamList;
  label: string;
}> = [
  { screen: "Dashboard", label: "Dashboard" },
  { screen: "Monitoring", label: "Monitoring" },
  { screen: "IncidentReport", label: "Incident Report" },
];

export function ScreenLayout({ title, subtitle, children }: PropsWithChildren<{ title: string; subtitle?: string }>) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.brand}>FMS</Text>
        <Pressable
          onPress={() => navigation.navigate("Notifications")}
          style={styles.notificationButton}
          accessibilityRole="button"
          accessibilityLabel="Open notifications"
        >
          <MaterialCommunityIcons name="bell-outline" size={22} color="#ffffff" />
          <View style={styles.notificationBadge} />
        </Pressable>
      </View>

      <View style={styles.headerNav}>
        {bottomTabs.map((tab) => {
          const isActive = route.name === tab.screen;
          return (
            <Pressable
              key={tab.screen}
              onPress={() => navigation.navigate(tab.screen)}
              style={[styles.headerNavItem, isActive && styles.headerNavItemActive]}
            >
              <Text style={[styles.headerNavText, isActive && styles.headerNavTextActive]}>{tab.label}</Text>
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

import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { appScreens } from "../navigation/screenNames";
import { RootStackParamList } from "../types";
import { colors } from "../styles/theme";

interface ScreenLayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export function ScreenLayout({ title, subtitle, children }: ScreenLayoutProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nav}>
        {appScreens.map((screen) => {
          const isActive = route.name === screen;
          return (
            <Pressable
              key={screen}
              onPress={() => navigation.navigate(screen)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{screen}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.body}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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


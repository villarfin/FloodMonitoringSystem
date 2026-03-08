import { PropsWithChildren } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { appScreens } from "../navigation/screenNames";
import { RootStackParamList } from "../types";
import { styles } from "../styles/components/ScreenLayout.styles";

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

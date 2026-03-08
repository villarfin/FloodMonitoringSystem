import { Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenLayout } from "../components/ScreenLayout";
import { RootStackParamList } from "../types";
import { colors } from "../styles/theme";

export function SummaryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenLayout title="Summary" subtitle="A high-level summary of system state can be shown here.">
      <Pressable style={styles.action} onPress={() => navigation.navigate("Configuration")}>
        <Text style={styles.actionText}>Go to Configuration</Text>
      </Pressable>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  action: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.brand,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#e7efff",
  },
  actionText: {
    color: colors.brand,
    fontWeight: "700",
  },
});


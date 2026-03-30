import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { MonitoringScreen } from "./src/screens/MonitoringScreen";
import { IncidentReportScreen } from "./src/screens/IncidentReportScreen";
import { NotificationsScreen } from "./src/screens/NotificationsScreen";
import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: "#ffffff" },
            headerTintColor: "#0f172a",
            headerTitleStyle: { fontWeight: "700" },
          }}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Monitoring" component={MonitoringScreen} />
          <Stack.Screen name="IncidentReport" component={IncidentReportScreen} options={{ title: "Incident Report" }} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

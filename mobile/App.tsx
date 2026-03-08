import "react-native-gesture-handler";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AdminLoginScreen } from "./src/screens/AdminLoginScreen";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { AdminScreen } from "./src/screens/AdminScreen";
import { UserManagementScreen } from "./src/screens/UserManagementScreen";
import { MonitoringScreen } from "./src/screens/MonitoringScreen";
import { IncidentReportScreen } from "./src/screens/IncidentReportScreen";
import { NotificationsScreen } from "./src/screens/NotificationsScreen";
import { SummaryScreen } from "./src/screens/SummaryScreen";
import { ConfigurationScreen } from "./src/screens/ConfigurationScreen";
import { RootStackParamList } from "./src/types";
import { colors } from "./src/styles/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {!isSignedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AdminLogin">
            {() => <AdminLoginScreen onLogin={() => setIsSignedIn(true)} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerStyle: { backgroundColor: "#ffffff" },
            headerTintColor: colors.text,
            headerTitleStyle: { fontWeight: "700" },
            headerRight: () => (
              <Pressable onPress={() => setIsSignedIn(false)}>
                <Text style={{ color: colors.brand, fontWeight: "700" }}>Log Out</Text>
              </Pressable>
            ),
          }}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="UserManagement" component={UserManagementScreen} options={{ title: "User Management" }} />
          <Stack.Screen name="Monitoring" component={MonitoringScreen} />
          <Stack.Screen name="IncidentReport" component={IncidentReportScreen} options={{ title: "Incident Report" }} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
          <Stack.Screen name="Configuration" component={ConfigurationScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}


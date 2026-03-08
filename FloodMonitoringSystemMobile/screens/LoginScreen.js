import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      onLogin();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Flood Monitoring System</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Login</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="username@gmail.com"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
          />

          <Pressable style={styles.forgotButton}>
            <Text style={styles.forgotButtonText}>Forgot Password?</Text>
          </Pressable>

          <Pressable style={styles.submitButton} onPress={handleLogin}>
            <Text style={styles.submitButtonText}>Sign in</Text>
          </Pressable>

          <Text style={styles.divider}>or continue with</Text>

          <View style={styles.socials}>
            {["Google", "GitHub", "Facebook"].map((item) => (
              <Pressable key={item} style={styles.socialButton}>
                <Text style={styles.socialButtonText}>{item}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.registerText}>
            {"Don't have an account yet? "}
            <Text style={styles.registerAccent}>Register for free</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 24,
  },
  cardTitle: {
    color: "#0f172a",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  label: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#0f172a",
    marginBottom: 14,
  },
  forgotButton: {
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  forgotButtonText: {
    color: "#0284c7",
    fontSize: 13,
    fontWeight: "700",
  },
  submitButton: {
    backgroundColor: "#0ea5e9",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 18,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  divider: {
    color: "#64748b",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 14,
  },
  socials: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  socialButton: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  socialButtonText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
  },
  registerText: {
    color: "#64748b",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
  },
  registerAccent: {
    color: "#0284c7",
    fontWeight: "700",
  },
});

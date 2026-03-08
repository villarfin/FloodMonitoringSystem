import { useState } from "react";

/**
 * Represents the currently signed-in user (if any).
 */
export interface User {
  id: string;
  name: string;
  role: string;
}

export interface Preferences {
  theme: "light" | "dark";
  // add other preferences as needed
}

/**
 * Custom hook to manage a handful of pieces of state that are relevant to the
 * Flood Monitoring System UI.  It lives at component level but can be reused
 * wherever the data is needed.
 *
 * The state here is deliberately contrived to satisfy the exercise constraints:
 * it contains user information, system status, a simple counter, a list of
 * notifications and some preferences.  Updating any of these values causes a
 * visible UI change in the components that call the hook.
 */
export function useSystemState() {
  const [user, setUser] = useState<User | null>(null);
  const [deviceActive, setDeviceActive] = useState<boolean>(true);
  const [view, setView] = useState<"dashboard" | "monitoring">("dashboard");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [preferences, setPreferences] = useState<Preferences>({ theme: "light" });

  const login = (newUser: User) => setUser(newUser);
  const logout = () => setUser(null);

  const toggleDevice = () => setDeviceActive((v) => !v);
  const switchView = (newView: "dashboard" | "monitoring") => setView(newView);

  const addNotification = (msg: string) =>
    setNotifications((prev) => [...prev, msg]);
  const clearNotifications = () => setNotifications([]);

  const incrementCounter = () => setCounter((c) => c + 1);

  return {
    // state values
    user,
    isLoggedIn: !!user,
    deviceActive,
    view,
    notifications,
    counter,
    preferences,

    // action helpers
    login,
    logout,
    toggleDevice,
    switchView,
    addNotification,
    clearNotifications,
    incrementCounter,
    setPreferences,
  } as const;
}

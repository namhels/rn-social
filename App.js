// import { StatusBar } from "expo-status-bar";
// import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

// import RegistrationScreen from "./Screens/auth/RegistrationScreen";

export default function App() {
  const routing = useRoute(true);

  return <NavigationContainer>{routing}</NavigationContainer>;
}

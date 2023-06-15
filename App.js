// import { StatusBar } from "expo-status-bar";
// import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default function App() {
  const routing = useRoute(true);

  return <NavigationContainer>{routing}</NavigationContainer>;
}

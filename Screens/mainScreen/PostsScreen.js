import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="log-out-outline" size={24} color="black" />
      <Text>PostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;

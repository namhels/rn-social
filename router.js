import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

import {
  AiOutlineAppstore,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AiOutlineAppstore name="postage-stamp" size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AiOutlinePlus name="pluscircleo" size={35} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AiOutlineUser name="face-profile" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

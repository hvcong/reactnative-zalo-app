import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import MessageTabScreen from "../screens/MessageTab/MessageTabScreen";
import Friends from "../screens/FriendsTab/Friends";
import MyProfile from "../screens/MyProfileTab/MyProfile";
import ConversationContextProvider from "../store/contexts/ConversationContext";
import ListChat from "../screens/MessageTab/ListChat";
import FriendsTab from "../screens/FriendsTab/FriendsTab";
const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Message"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
        }}
        component={MessageTabScreen}
      ></Tab.Screen>
      <Tab.Screen
        name="FriendsTab"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-friends" size={24} color={color} />
          ),
        }}
        component={FriendsTab}
      ></Tab.Screen>
      <Tab.Screen
        name="MeProfile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
        component={MyProfile}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabBar;

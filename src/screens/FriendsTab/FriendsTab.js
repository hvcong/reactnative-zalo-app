import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import Friends from "./Friends";

const Stack = createStackNavigator();

const FriendsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Friends" component={Friends} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default FriendsTab;

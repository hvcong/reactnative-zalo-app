import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import HeaderTitleMessage from "../../components/Header/HeaderTitleMessage";
import ChatRoom from "./ChatRoom";
import ListChat from "./ListChat";

const Stack = createStackNavigator();

const MessageTabScreen = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="ListChat"
        component={ListChat}
        options={{
          headerTitle: (props) => <HeaderTitleMessage {...props} />,
          headerLeft: null,
        }}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#0091ff",
  },
});

export default MessageTabScreen;

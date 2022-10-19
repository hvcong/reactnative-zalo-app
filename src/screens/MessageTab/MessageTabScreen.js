import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import HeaderTitleMessage from "../../components/Header/HeaderTitleMessage";
import { useConversationContext } from "../../store/contexts/ConversationContext";
import ChatRoom from "./ChatRoom";
import ListChat from "./ListChat";

const Stack = createStackNavigator();

const MessageTabScreen = (props) => {
  const { loadConversations } = useConversationContext();

  useEffect(() => {
    loadConversations();
    return () => {};
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a69d9",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="ListChat" component={ListChat} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MessageTabScreen;

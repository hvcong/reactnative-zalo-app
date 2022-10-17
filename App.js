import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StyleSheet } from "react-native";
import MainStack from "./src/navigation/MainStack.js";
import React from "react";
import GlobalContextProvider from "./src/store/contexts/GlobalContext";
import ConversationContextProvider from "./src/store/contexts/ConversationContext.js";

export default function App() {
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);

  return (
    <NavigationContainer>
      <GlobalContextProvider>
        <ConversationContextProvider>
          <MainStack />
        </ConversationContextProvider>
      </GlobalContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

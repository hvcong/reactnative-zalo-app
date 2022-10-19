import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StyleSheet, View } from "react-native";
import MainStack from "./src/navigation/MainStack.js";
import React from "react";
import GlobalContextProvider from "./src/store/contexts/GlobalContext";
import ConversationContextProvider from "./src/store/contexts/ConversationContext.js";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <NavigationContainer>
          <GlobalContextProvider>
            <ConversationContextProvider>
              <MainStack />
            </ConversationContextProvider>
          </GlobalContextProvider>
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

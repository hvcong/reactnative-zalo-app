import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={"#0000ff"} />
      <Text style={styles.text}>Đang đăng nhập...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginTop: 24,
  },
});

export default LoadingScreen;

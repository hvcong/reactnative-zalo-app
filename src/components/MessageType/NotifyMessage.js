import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

const NotifyMessage = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text
          style={styles.name}
          onPress={() => {
            console.warn("go to profile");
          }}
        >
          {"abd"}
        </Text>
        <Text style={styles.text}>{item.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    padding: 4,
    fontWeight: "bold",
    color: "#2c5c8b",
  },
  text: {
    color: "black",
  },
});

export default NotifyMessage;

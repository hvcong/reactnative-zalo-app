import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TextMessage = ({ data, isMyMessage }) => {
  const { content } = data;
  return (
    <View
      style={[
        styles.container,
        isMyMessage ? { backgroundColor: "#e5efff" } : {},
      ]}
    >
      <Text style={[styles.text, isMyMessage ? styles.textOfMyMessage : {}]}>
        {content}
      </Text>
      <Text style={styles.time}>12:00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 16,
  },
  text: {
    fontSize: 17,
    textAlign: "justify",
  },
  time: {
    paddingTop: 8,
    color: "#666",
  },
});

export default TextMessage;

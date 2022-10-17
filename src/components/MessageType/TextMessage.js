import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TextMessage = ({ item, isMyMessage, sender }) => {
  const { content } = item;
  return (
    <View style={isMyMessage ? styles.myMessageContainer : styles.container}>
      {!isMyMessage && <Text style={styles.name}>{sender.name}</Text>}
      <Text style={[styles.text, isMyMessage ? styles.textOfMyMessage : {}]}>
        {content}
      </Text>
      <Text style={styles.time}>12:00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "white",
    borderRadius: 16,
    flex: 1,
    marginRight: "25%",
  },
  myMessageContainer: {
    padding: 12,
    borderRadius: 16,
    flex: 1,
    backgroundColor: "#e5efff",
    marginLeft: "20%",
  },
  name: {
    color: "#bd6d29",
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

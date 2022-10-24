import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { converDate } from "../../utils";

const TextMessage = ({ item, isMyMessage, sender }) => {
  const { content, createdAt } = item;
  const date = converDate(createdAt);
  return (
    <View style={isMyMessage ? styles.myMessageContainer : styles.container}>
      {!isMyMessage && <Text style={styles.name}>{sender && sender.name}</Text>}
      <Text style={[styles.text, isMyMessage ? styles.textOfMyMessage : {}]}>
        {content}
      </Text>
      <Text style={styles.time}>{date.toString}</Text>
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
    maxWidth: "75%",
  },
  myMessageContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#e5efff",
    marginLeft: "auto",
    maxWidth: "75%",
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

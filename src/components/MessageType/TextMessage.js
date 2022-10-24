import React, { useState } from "react";
import { View, StyleSheet, Text, Touchable } from "react-native";
import { converDate } from "../../utils";
import {
  Foundation,
  Fontisto,
  SimpleLineIcons,
  FontAwesome,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const TextMessage = ({
  item,
  isMyMessage,
  sender,
  idSelected,
  setIdSelected,
}) => {
  const { content, createdAt } = item;

  const date = converDate(createdAt);
  return (
    <View
      style={[
        isMyMessage ? styles.myMessageContainer : styles.container,
        styles.wrap,
      ]}
    >
      {!isMyMessage && <Text style={styles.name}>{sender && sender.name}</Text>}
      <Text style={[styles.text, isMyMessage ? styles.textOfMyMessage : {}]}>
        {content}
      </Text>

      {item._id == idSelected && (
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      )}
      <Text style={styles.time}>{date.toString}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "white",
    borderRadius: 16,
    maxWidth: "75%",
    minWidth: "35%",
  },
  myMessageContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#e5efff",
    marginLeft: "auto",
    maxWidth: "75%",
    minWidth: "35%",
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

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const ChatItem = ({ conver, navigation }) => {
  const { name, avatar, messages, lastMessageId, _id, type } = conver;
  const [lastMessage, setlastMessage] = useState(null);
  function onPressItem() {
    navigation.navigate("ChatRoom", {
      typeOfConversation: type ? "group" : "simple",
      messages,
      converId: _id,
      conver,
    });
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => onPressItem()}
        activeOpacity={0.9}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/avatar.jpg")}
            style={styles.avatar}
          />
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text numberOfLine={1} style={styles.lastMessage}>
            {lastMessageId ? lastMessageId.content : "...."}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.lastTime}>4 giờ</Text>
          <Text numberOfLine={1} style={styles.numberOfNewMessage}>
            3
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imageContainer: {
    paddingRight: 20,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
  },
  lastMessage: {
    fontSize: 16,
    color: "#858383",
  },
  rightContainer: {
    justifyContent: "center",
  },
  lastTime: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#858383",
  },
  numberOfNewMessage: {
    backgroundColor: "red",
    textAlign: "center",
    borderRadius: 59,
    height: 18,
    lineHeight: 18,
    color: "white",
    fontWeight: "bold",
    marginTop: 4,
  },
});

export default ChatItem;

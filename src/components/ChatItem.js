import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useGlobalContext } from "../store/contexts/GlobalContext";

const ChatItem = ({ conver, navigation }) => {
  const { name, lastMessageId, _id, type, avatar } = conver;
  const { user } = useGlobalContext();

  function onPressItem() {
    navigation.navigate("ChatRoom", {
      converId: _id,
      name: getNameOfSimpleConver(),
    });
  }

  // get name of simple conver
  function getNameOfSimpleConver() {
    for (let i = 0; i < conver.members.length; i++) {
      if (conver.members[i]._id != user._id) {
        return conver.members[i].name;
      }
    }
  }

  function renderLastMessage() {
    if (lastMessageId) {
      if (lastMessageId.type == "TEXT" || lastMessageId.type == "NOTIFY") {
        return lastMessageId.content;
      }
    }
  }
  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        onPress={() => onPressItem()}
        activeOpacity={0.9}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          {avatar ? (
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={require("../../assets/avatar.jpg")}
              style={styles.avatar}
            />
          )}
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {type ? name : getNameOfSimpleConver()}
          </Text>
          <Text numberOfLines={1} style={styles.lastMessage}>
            {renderLastMessage()}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.lastTime}>4 giờ</Text>
          {/* <Text numberOfLine={1} style={styles.numberOfNewMessage}>
            3
          </Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    paddingRight: 12,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  lastMessage: {
    paddingTop: 4,
    fontSize: 14,
    color: "#858383",
  },
  rightContainer: {
    justifyContent: "center",
  },
  lastTime: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#858383",
  },
  numberOfNewMessage: {
    backgroundColor: "red",
    textAlign: "center",
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    marginTop: 4,
    borderRadius: 50,
  },
});

export default ChatItem;

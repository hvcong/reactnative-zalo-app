import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const GroupChatItem = () => {
  return (
    <View style={styles.item}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../../assets/avatar.jpg")}
          style={styles.avatar}
        />
      </View>
      <View style={styles.itemMiddle}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          Hoang van congaaa aaaaaaaaaaaaaaa
        </Text>
        <Text style={styles.lastMess} numberOfLines={1} ellipsizeMode="tail">
          last mesag
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    flexDirection: "row",
    width: "100%",
  },
  avatarContainer: {
    paddingRight: 12,
  },
  avatar: {
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  itemMiddle: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMess: {
    color: "#aaa",
  },
});

export default GroupChatItem;

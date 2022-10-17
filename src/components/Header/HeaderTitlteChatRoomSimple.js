import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const HeaderTitlteChatRoomSimple = (props) => {
  const { converName } = props;
  function onNamePress() {
    console.warn("press name");
  }

  function onPhoneCallPress() {
    console.warn("press phone");
  }

  function onVideoCallPress() {
    console.warn("onVideoCallPress");
  }

  function onListPress() {
    console.warn("onListPress");
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.itemGroup} onPress={onNamePress}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {converName}
        </Text>
        <Text style={styles.minute}>Truy cập 18 phút trước</Text>
      </Pressable>
      <Pressable style={styles.itemIcon} onPress={onPhoneCallPress}>
        <AntDesign name="phone" size={24} color="white" />
      </Pressable>
      <Pressable style={styles.itemIcon} onPress={onVideoCallPress}>
        <Ionicons name="ios-videocam-outline" size={26} color="white" />
      </Pressable>
      <Pressable style={styles.itemIcon} onPress={onListPress}>
        <Feather name="list" size={26} color="white" />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemGroup: {
    flex: 1,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    paddingRight: 6,
  },
  minute: {
    color: "#ccc",
    fontSize: 10,
  },
  itemIcon: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default HeaderTitlteChatRoomSimple;

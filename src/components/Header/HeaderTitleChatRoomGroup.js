import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { EvilIcons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const HeaderTitleChatRoomGroup = (props) => {
  const { converName, numOfMember, navigation } = props;
  function onNamePress() {
    console.warn("press name");
  }

  function onSearchPress() {
    console.warn("onSearchPress");
  }

  function onAddMemberPress() {
    console.warn("onAddMemberPress");
  }

  function onListPress() {
    navigation.navigate("RoomChatGroupMore");
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.itemGroup} onPress={onNamePress}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {converName}
        </Text>
        <Text style={styles.quantity}>{numOfMember} thành viên</Text>
      </Pressable>
      <Pressable style={styles.itemIcon} onPress={onAddMemberPress}>
        <MaterialCommunityIcons
          name="account-multiple-plus-outline"
          size={26}
          color="white"
        />
      </Pressable>
      <Pressable style={styles.itemIcon} onPress={onSearchPress}>
        <EvilIcons name="search" size={26} color="white" />
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
  quantity: {
    color: "#ccc",
    fontSize: 10,
  },
  itemIcon: {
    paddingLeft: 16,
    paddingVertical: 8,
  },
});

export default HeaderTitleChatRoomGroup;

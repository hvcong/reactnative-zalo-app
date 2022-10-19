import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FriendsItem = () => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../../assets/avatar.jpg")}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>Hoang Van Cong</Text>
      <View style={styles.icon}>
        <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatarContainer: {
    paddingRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    paddingHorizontal: 8,
  },
});

export default FriendsItem;
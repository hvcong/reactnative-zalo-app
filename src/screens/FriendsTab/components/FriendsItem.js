import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FriendsItem = (props) => {
  const { _id, avatar, name, navigation } = props;
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.avatar}
          />
        ) : (
          <Image
            source={require("../../../../assets/avatar.jpg")}
            style={styles.avatar}
          />
        )}
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.icon}>
        <Ionicons
          name="chatbox-ellipses-outline"
          size={24}
          color="black"
          onPress={() => {
            console.log("go to conver");
          }}
        />
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

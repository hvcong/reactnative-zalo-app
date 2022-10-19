import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const AddFriendItem = () => {
  const [isSended, setisSended] = useState(false);

  function requestFriend() {
    setisSended(true);
  }
  function cancelRequest() {
    setisSended(false);
  }

  return (
    <Pressable style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../../assets/avatar.jpg")}
          style={styles.avatar}
        ></Image>
      </View>
      <View style={styles.middle}>
        <Text style={styles.name}>Le minh cong</Text>
      </View>
      <View style={styles.right}>
        {!isSended ? (
          <TouchableOpacity onPress={requestFriend} style={styles.btnContainer}>
            <FontAwesome name="user-plus" size={18} color="#1a69d9" />
          </TouchableOpacity>
        ) : (
          <Text onPress={cancelRequest} style={styles.btnCancel}>
            {" "}
            Thu hồi
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  avatarContainer: {},
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  middle: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
  },
  right: {},
  btnContainer: {
    padding: 12,
  },
  btnCancel: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
});

export default AddFriendItem;

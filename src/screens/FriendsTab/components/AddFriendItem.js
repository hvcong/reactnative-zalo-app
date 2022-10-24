import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFriendContext } from "../../../store/contexts/FriendContext";
const AddFriendItem = (props) => {
  const { avatar, name, _id } = props;
  const [isSended, setisSended] = useState(false);
  const { checkIsMyFriend } = useFriendContext();

  function requestFriend() {
    setisSended(true);
  }
  function cancelRequest() {
    setisSended(false);
  }

  function renderRight() {
    if (checkIsMyFriend(_id)) {
      return (
        <View style={styles.aaaa}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
        </View>
      );
    } else if (isSended) {
      return (
        <Text onPress={cancelRequest} style={styles.btnCancel}>
          {" "}
          Thu hồi
        </Text>
      );
    } else {
      return (
        <TouchableOpacity onPress={requestFriend} style={styles.btnContainer}>
          <FontAwesome name="user-plus" size={18} color="#1a69d9" />
        </TouchableOpacity>
      );
    }
  }

  return (
    <Pressable style={styles.container}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.avatar}
          ></Image>
        ) : (
          <Image
            source={require("../../../../assets/avatar.jpg")}
            style={styles.avatar}
          ></Image>
        )}
      </View>
      <View style={styles.middle}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.right}>{renderRight()}</View>
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

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
const FriendRequestReceiveItem = () => {
  const [isAccept, setisAccept] = useState(false);

  function onAccept() {
    setisAccept(true);
  }

  function onRefuse() {}

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
        <Text style={styles.time}>Ngày 12/3</Text>
      </View>
      <View style={styles.right}>
        <Text onPress={onRefuse} style={styles.btn}>
          Từ chối
        </Text>
        <Text onPress={onAccept} style={[styles.btn, styles.btnAccept]}>
          Đồng ý
        </Text>
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
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
  },
  right: {
    flexDirection: "row",
  },
  btnContainer: {
    padding: 12,
  },
  btn: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 13,
    borderRadius: 18,
    marginLeft: 4,
  },
  btnAccept: {
    color: "#1a69d9",
  },
});

export default FriendRequestReceiveItem;

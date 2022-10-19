import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import FriendsItem from "./FriendsItem";
import { Ionicons, Fontisto } from "@expo/vector-icons";

const FriendsBody = ({ navigation }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <View style={styles.headerIconContainer}>
            <Fontisto name="persons" size={24} color="white" />
          </View>
          <View style={styles.headerItemBody}>
            <Text
              onPress={() => navigation.navigate("FriendRequest")}
              style={styles.headerText}
            >
              Lời mời kết bạn
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.addContainer}>
          <Text
            onPress={() => {
              navigation.navigate("AddFriend");
            }}
            style={styles.addBtn}
          >
            + Thêm
          </Text>
        </View>
        <View style={styles.body}>
          <FriendsItem />
          <FriendsItem />
          <FriendsItem />
          <FriendsItem />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingRight: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#eee",
  },
  addContainer: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  addBtn: {
    paddingVertical: 8,
    marginLeft: "auto",
    paddingRight: 12,
    color: "#349eeb",
    fontSize: 16,
  },
  body: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerIconContainer: {
    padding: 4,
    backgroundColor: "#1a87bd",
    borderRadius: 12,
    marginHorizontal: 12,
  },
  headerItemBody: {},
  headerText: {},
});

export default FriendsBody;

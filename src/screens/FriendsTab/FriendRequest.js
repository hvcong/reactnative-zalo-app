import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AddFriendItem from "./components/AddFriendItem";
import FriendRequestReceiveItem from "./components/FriendRequestReceiveItem";

const FriendRequest = () => {
  const [activeTab, setactiveTab] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text
          onPress={() => setactiveTab(true)}
          style={[styles.navItem, activeTab && styles.navItemAcctive]}
        >
          ĐÃ NHẬN 1
        </Text>
        <Text
          onPress={() => setactiveTab(false)}
          style={[styles.navItem, !activeTab && styles.navItemAcctive]}
        >
          ĐÃ GỬI 8
        </Text>
      </View>
      <View style={styles.body}>
        {activeTab ? (
          <>
            <FriendRequestReceiveItem />
            <FriendRequestReceiveItem />
          </>
        ) : (
          <>
            <AddFriendItem />
            <AddFriendItem />
            <AddFriendItem />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 8,
    color: "#ccc",
  },
  navItemAcctive: {
    borderBottomWidth: 4,
    borderBottomColor: "blue",
    color: "black",
  },
  body: {},
});

export default FriendRequest;

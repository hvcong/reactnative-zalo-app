import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PhoneInput from "../../components/Input/PhoneInput";
import AddFriendItem from "./components/AddFriendItem";

const AddFriend = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Thêm bạn bằng số điện thoại</Text>
      <View style={styles.inputGroup}>
        <View style={styles.input}>
          <PhoneInput />
        </View>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Tìm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <AddFriendItem />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerTitle: {
    padding: 8,
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
    backgroundColor: "#eee",
  },
  inputGroup: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  input: {
    flex: 1,
  },
  btnContainer: {
    marginLeft: 8,
    justifyContent: "center",
  },
  btnText: {
    borderRadius: 4,
    backgroundColor: "#1a69d9",
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "white",
  },
  body: {
    paddingVertical: 4,
    backgroundColor: "#eee",
    flex: 1,
  },
});

export default AddFriend;

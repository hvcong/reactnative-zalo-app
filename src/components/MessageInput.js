import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";

const MessageInput = ({ onSendMessage }) => {
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef(null);

  return (
    <View style={styles.container}>
      <TextInput
        value={textInput}
        onChangeText={setTextInput}
        style={styles.input}
        placeholder="Nhập tin nhắn"
        ref={inputRef}
      />
      <Entypo
        style={styles.icon}
        name="dots-three-horizontal"
        size={24}
        color="black"
      />
      <Feather style={styles.icon} name="mic" size={24} color="black" />
      {/* <Feather style={styles.icon} name="image" size={24} color="black" /> */}
      <Ionicons
        style={[
          styles.icon,
          textInput ? styles.iconSendEnable : styles.iconSendDisable,
        ]}
        name="send"
        size={24}
        onPress={() => {
          setTextInput("");
          //   inputRef.current.blur();
          onSendMessage();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  icon: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  iconSendDisable: {
    display: "none",
  },
  iconSendEnable: {
    color: "#0091ff",
    paddingHorizontal: 16,
  },
});

export default MessageInput;

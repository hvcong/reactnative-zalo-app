import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useConversationContext } from "../store/contexts/ConversationContext";

const MessageInput = ({ converId }) => {
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef(null);
  const [isShowOption, setIsShowOption] = useState(false);
  const [imageOrVideo, setImageOrVideo] = useState(null);
  const { sendImageMessage, sendMessage } = useConversationContext();

  async function onPickImageOrVideo() {
    console.log("pick");

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImageOrVideo(result);
      setIsShowOption(false);
      sendImageMessage(converId, result);
    }
  }

  function onPickFile() {}

  function onPickSticker() {}

  function onCreateVote() {}

  function onSendMessage(data) {
    Keyboard.dismiss();
    sendMessage({ ...data, conversationId: converId });
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={textInput}
        onChangeText={setTextInput}
        style={styles.input}
        placeholder="Nhập tin nhắn"
        ref={inputRef}
        onFocus={() => setIsShowOption(false)}
        onChange={() => setIsShowOption(false)}
      />
      {isShowOption ? (
        <FontAwesome
          style={styles.icon}
          name="angle-double-down"
          size={24}
          color="black"
          onPress={() => setIsShowOption(!isShowOption)}
        />
      ) : (
        <FontAwesome
          style={styles.icon}
          name="angle-double-up"
          size={24}
          color="black"
          onPress={() => setIsShowOption(!isShowOption)}
        />
      )}
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
          onSendMessage({ type: "TEXT", content: textInput });
        }}
      />

      {isShowOption && (
        <View style={styles.options}>
          <View style={styles.option}>
            <FontAwesome5
              name="photo-video"
              size={24}
              color="black"
              onPress={onPickImageOrVideo}
            />
          </View>
          <View style={styles.option}>
            <MaterialCommunityIcons
              name="sticker-emoji"
              size={24}
              color="black"
              onPress={onPickSticker}
            />
          </View>
          <View style={styles.option}>
            <MaterialIcons
              name="attach-file"
              size={24}
              color="black"
              onPress={onPickFile}
            />
          </View>
          <View style={styles.option}>
            <MaterialCommunityIcons
              name="vote-outline"
              size={24}
              color="black"
              onPress={onCreateVote}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
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
  options: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    right: 4,
    top: -52,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 4,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
});

export default MessageInput;

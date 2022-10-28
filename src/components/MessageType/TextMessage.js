import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Touchable,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { converDate } from "../../utils";
import {
  Foundation,
  Fontisto,
  SimpleLineIcons,
  FontAwesome,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useConversationContext } from "../../store/contexts/ConversationContext";

const TextMessage = ({
  item,
  isMyMessage,
  sender,
  idSelected,
  setIdSelected,
}) => {
  const { content, createdAt, _id, conversationId } = item;
  const [isShowOptions, setIsShowOptions] = useState(false);
  const date = converDate(createdAt);
  const { recallMessage, recallMessageOnly } = useConversationContext();

  useEffect(() => {
    setIsShowOptions(false);
    return () => {};
  }, [idSelected]);

  // thu hồi message
  async function onRecallMessage() {
    setIsShowOptions(false);

    let is = await recallMessage(_id, conversationId);
  }

  // gim message
  function onPinMessage() {
    setIsShowOptions(false);
    console.log("pin");
  }
  // delete message only me
  async function onDeleteMessage() {
    setIsShowOptions(false);
    const resutl = await recallMessageOnly(_id, conversationId);

    console.log("delete");
  }

  function renderBody() {
    return (
      <View
        style={[
          isMyMessage ? styles.myMessageContainer : styles.container,
          styles.wrap,
          idSelected == _id && styles.backgroundColorSelected,
        ]}
      >
        {!isMyMessage && (
          <Text style={styles.name}>{sender && sender.name}</Text>
        )}
        <Text style={[styles.text]}>{content}</Text>

        {_id == idSelected && (
          <>
            <View
              style={
                isMyMessage
                  ? styles.myOptionsContainer
                  : styles.optionsContainer
              }
            >
              {isShowOptions && (
                <View style={styles.options}>
                  <TouchableOpacity
                    onPress={onDeleteMessage}
                    style={styles.option}
                  >
                    <AntDesign name="delete" size={12} color="black" />
                    <Text style={styles.optionText}>Xóa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onPinMessage}
                    style={styles.option}
                  >
                    <AntDesign name="pushpin" size={12} color="black" />
                    <Text style={styles.optionText}>Gim</Text>
                  </TouchableOpacity>
                  {isMyMessage && (
                    <TouchableOpacity
                      onPress={onRecallMessage}
                      style={styles.option}
                    >
                      <MaterialCommunityIcons
                        name="archive-cancel"
                        size={12}
                        color="black"
                      />
                      <Text style={styles.optionText}>Thu hồi</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            {!isShowOptions && (
              <MaterialCommunityIcons
                style={
                  isMyMessage
                    ? styles.myDotsOfMyMessage
                    : styles.dotsOfMyMessage
                }
                name="dots-horizontal"
                size={26}
                color="black"
                onPress={() => setIsShowOptions(true)}
              />
            )}
          </>
        )}
        <Text style={styles.time}>{date.toString}</Text>
      </View>
    );
  }

  return renderBody();
};

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
  },
  backgroundColorSelected: {
    backgroundColor: "#ddd",
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "white",
    borderRadius: 16,
    maxWidth: "75%",
    minWidth: "35%",
  },
  myMessageContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#e5efff",
    marginLeft: "auto",
    maxWidth: "75%",
    minWidth: "35%",
  },
  name: {
    color: "#bd6d29",
  },
  text: {
    fontSize: 17,
    textAlign: "justify",
  },
  time: {
    paddingTop: 8,
    color: "#666",
  },

  optionsContainer: {
    position: "absolute",
    right: -70,
    top: "50%",
    transform: [{ translateY: -30 }],
    height: 85,
    overflow: "hidden",
  },

  myOptionsContainer: {
    position: "absolute",
    left: -70,
    top: "50%",
    transform: [{ translateY: -25 }],
    height: 85,
  },

  dotsOfMyMessage: {
    // display: "none",
    position: "absolute",
    right: -32,
    top: "50%",
    bottom: "50%",
  },
  myDotsOfMyMessage: {
    // display: "none",
    position: "absolute",
    left: -28,
    top: "50%",
    bottom: "50%",
  },
  options: {
    backgroundColor: "#bcc2c4",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bcc2c4",
    width: 64,
  },
  option: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  optionText: {
    paddingVertical: 4,
    paddingLeft: 6,
    fontSize: 11,
  },
});

export default TextMessage;

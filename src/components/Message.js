import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import ImageMessage from "./MessageType/ImageMessage";
import TextMessage from "./MessageType/TextMessage";
import { Foundation, Fontisto } from "@expo/vector-icons";
import NotifyMessage from "./MessageType/NotifyMessage";

const Message = (props) => {
  let { style, item, isMyMessage, isRenderAvatarIcon, index, sender } = props;
  let { type, senderId } = item;

  function renderMessageContent() {
    if (type === "TEXT") {
      return (
        <TextMessage item={item} isMyMessage={isMyMessage} sender={sender} />
      );
    } else if (type === "NOTIFY") {
      return <NotifyMessage item={item} isMyMessage={isMyMessage} />;
    } else if (type === "IMAGE") {
    } else if (type === "STICKER") {
    } else if (type === "VIDEO") {
    } else if (type === "VOTE") {
    } else if (type === "HTML") {
    } else if (type === "IMAGE") {
      return <ImageMessage data={data} />;
    }
  }

  function isRenderAvatar() {
    if (type === "NOTIFY" || type === "VOTE") return false;
    if (isMyMessage) return false;
    return isRenderAvatarIcon(senderId, index);
  }

  function onReaction() {}

  return (
    <View style={[style, styles.wrapper]}>
      <View style={styles.imageContainer}>
        {isRenderAvatar() && (
          <Image
            style={styles.image}
            source={require("../../assets/avatar.jpg")}
          ></Image>
        )}
      </View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onLongPress={onReaction}
      >
        {renderMessageContent()}
        <View style={styles.reactionContainer}>
          <Foundation
            style={[styles.reactionIcon, styles.iconHeart]}
            name="heart"
            color="black"
            onLongPress={() => {
              console.log("abc");
            }}
          />
          <Fontisto
            style={[styles.reactionIcon, styles.iconLike]}
            name="like"
            color="black"
          />
          <Fontisto
            style={[styles.reactionIcon, styles.iconDislike]}
            name="dislike"
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 8,
  },
  container: {
    flexDirection: "row",
    flex: 1,
  },
  imageContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 12,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 12,
  },
  body: {
    marginRight: "25%",
    borderRadius: 10,
  },
  reactionContainer: {
    position: "absolute",
    right: "10%",
    bottom: -6,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    display: "none",
  },
  reactionIcon: {
    paddingHorizontal: 8,
    paddingTop: 4,
    fontSize: 24,
    position: "relative",
  },
  iconHeart: {
    top: 1,
    color: "red",
  },
  iconLike: {
    color: "yellow",
    fontSize: 20,
  },
  iconDislike: {
    color: "green",
    fontSize: 20,
  },
});

export default Message;

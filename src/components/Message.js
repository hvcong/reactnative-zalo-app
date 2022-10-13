import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import ImageMessage from "./MessageType/ImageMessage";
import TextMessage from "./MessageType/TextMessage";
import { Foundation, Fontisto } from "@expo/vector-icons";

const Message = ({ style, isMyMessage, type, ...data }) => {
  function renderMessageContent() {
    if (type === "text") {
      return <TextMessage data={data} isMyMessage={isMyMessage} />;
    }
    if (type === "image") {
      return <ImageMessage data={data} />;
    }
  }

  function onReaction() {}

  return (
    <View style={[style, styles.wrapper]}>
      <Image
        style={isMyMessage ? { display: "none" } : styles.image}
        source={require("../../assets/avatar.jpg")}
      ></Image>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onLongPress={onReaction}
      >
        <View style={isMyMessage ? styles.bodyOfMyMessage : styles.body}>
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
  },
  bodyOfMyMessage: {
    flex: 1,
    marginLeft: "25%",
    borderRadius: 10,
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

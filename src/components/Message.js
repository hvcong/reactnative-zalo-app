import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ImageMessage from "./MessageType/ImageMessage";
import TextMessage from "./MessageType/TextMessage";
import {
  Foundation,
  Fontisto,
  SimpleLineIcons,
  Feather,
} from "@expo/vector-icons";
import NotifyMessage from "./MessageType/NotifyMessage";
import ReactModal from "./ReactModal";

const Message = (props) => {
  let { style, item, isMyMessage, isRenderAvatarIcon, index, sender } = props;
  let { type, senderId } = item;
  const [isShowModal, setisShowModal] = useState(false);
  const [isOnReact, setisOnReact] = useState(false);

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

  function onReaction() {
    setisOnReact(!isOnReact);
  }

  return (
    <Pressable style={[style, styles.wrapper]}>
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

        <View style={styles.listReacted}>
          <SimpleLineIcons
            style={styles.reactedIcon}
            name="like"
            size={24}
            color="black"
          />
          <Feather
            style={styles.reactedIcon}
            name="heart"
            size={24}
            color="black"
          />
        </View>
        {isOnReact && (
          <View style={styles.reactContainer}>
            <SimpleLineIcons
              style={styles.reactIcon}
              name="like"
              size={24}
              color="black"
            />
            <SimpleLineIcons
              style={styles.reactIcon}
              name="like"
              size={24}
              color="black"
            />
            <SimpleLineIcons
              style={styles.reactIcon}
              name="like"
              size={24}
              color="black"
            />
            <Feather
              style={styles.reactIcon}
              name="heart"
              size={24}
              color="black"
            />
          </View>
        )}
      </TouchableOpacity>
      <ReactModal isShowModal={isShowModal} setisShowModal={setisShowModal} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 8,
    position: "relative",
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
  listReacted: {
    display: "none",
  },
  reactedIcon: {},
  reactContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    bottom: 0,
    width: "100%",

    borderColor: "#999",
    borderWidth: 1,
  },
  reactIcon: {
    paddingLeft: 8,
  },
});

export default Message;

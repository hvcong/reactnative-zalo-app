import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import friendApi from "../../../api/friendApi";
import { useFriendContext } from "../../../store/contexts/FriendContext";
import { useConversationContext } from "../../../store/contexts/ConversationContext";

const FriendsItem = (props) => {
  const {
    _id,
    avatar,
    name,
    navigation,
    idOptionShow,
    setIdOptionShow,
    index,
    length,
  } = props;
  const { createSimpleConver } = useConversationContext();

  const { deleteFriend } = useFriendContext();

  async function onGoToConver() {
    setIdOptionShow(null);
    const converId = await createSimpleConver(_id);
    if (converId) {
      console.log("goto conver");
      navigation.navigate("MessageTab", {
        screen: "ListChat",
        params: {
          screen: "ChatRoom",
          params: {
            converId,
          },
        },
      });
    }
  }

  async function onRemoveFriend() {
    setIdOptionShow(null);
    const is = await deleteFriend(_id);
    if (is) {
      console.log("delete friend ok");
    }
  }
  return (
    <Pressable style={[styles.item, index == length - 1 && { marginTop: 24 }]}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.avatar}
          />
        ) : (
          <Image
            source={require("../../../../assets/avatar.jpg")}
            style={styles.avatar}
          />
        )}
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.icon}>
        {/* <Ionicons
          name="chatbox-ellipses-outline"
          size={24}
          color="black"
          onPress={() => {
            console.log("go to conver");
          }}
        /> */}
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color="#aaa"
          onPress={() => setIdOptionShow(_id)}
        />
      </View>
      {idOptionShow == _id && (
        <View
          style={[
            styles.options,
            index == 0 && { top: 0 },
            index == length - 1 && { top: -24 },
          ]}
        >
          <TouchableOpacity style={styles.option} onPress={onGoToConver}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={18}
              color="black"
            />
            <Text style={styles.optionText}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={onRemoveFriend}>
            <Ionicons
              name="ios-person-remove-outline"
              size={18}
              color="black"
            />
            <Text style={styles.optionText}>Xóa bạn</Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    position: "relative",
    overflow: "visible",
  },
  avatarContainer: {
    paddingRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  options: {
    position: "absolute",
    right: 0,
    backgroundColor: "#cccccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 100,
  },
  option: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 12,
    paddingLeft: 6,
  },
});

export default FriendsItem;

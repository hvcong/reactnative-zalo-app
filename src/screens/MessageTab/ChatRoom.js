import { useHeaderHeight } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import HeaderTitleChatRoom from "../../components/Header/HeaderTitleChatRoom";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { useConversationContext } from "../../store/contexts/ConversationContext";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";

const ChatRoom = (props) => {
  const { converId, name } = props.route.params;
  const { navigation } = props;
  const { user } = useGlobalContext();
  const { getMember, getMembers, convers, getConverById } =
    useConversationContext();
  const flastListRef = useRef();
  const [idSelected, setIdSelected] = useState(null);
  const [conver, setConver] = useState(null);
  //pin
  const [isShowMorePin, setIsShowMorePin] = useState(false);

  useEffect(() => {
    let _conver = getConverById(converId);
    if (_conver) {
      let _mess = _conver.messages;
      let messages = [..._mess];

      messages.reverse();
      _conver = { ..._conver, messages };
      setConver(_conver);
    }
    return () => {};
  }, [convers]);

  //header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <HeaderTitleChatRoom
          {...props}
          typeOfConversation={conver && conver.type ? "group" : "simple"}
          numOfMember={getMembers(converId) && getMembers(converId).length}
          converName={name}
          navigation={navigation}
          conver={conver}
        />
      ),
    });
    // hide header
    const parent = props.navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, [conver]);

  function isDeletedWithMe(deletedWithUserIds) {
    if (deletedWithUserIds && deletedWithUserIds.length > 0) {
      for (let i = 0; i < deletedWithUserIds.length; i++) {
        if (deletedWithUserIds[i] == user._id) {
          return true;
        }
      }
    }
    return false;
  }

  // handle pin message
  function renderItemPinMessage({ index, item }) {
    return (
      <View style={styles.pinItem}>
        <View style={styles.pinIconContainer}>
          <AntDesign name="message1" size={24} color="#1a69d9" />
        </View>
        <View style={styles.pinBody}>
          <Text
            style={styles.pinContent}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            contenet
            nefsfasfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </Text>
          <Text style={styles.pinSender}>Tin nhắn của hoàng văn công</Text>
        </View>
        <TouchableOpacity style={styles.pinItemRight}>
          <Text style={styles.pinRightNum}>+1</Text>
          <Feather name="chevrons-down" size={24} color="#1a69d9" />
          {/* <Feather name="chevrons-up" size={24} color="black" /> */}
        </TouchableOpacity>
      </View>
    );
  }

  function getPinMessages() {
    let _pinMessages = [];
  }

  function renderItem({ index, item }) {
    const { senderId, deletedWithUserIds } = item;
    if (isDeletedWithMe(deletedWithUserIds, senderId._id)) {
      return null;
    }
    return (
      <Message
        isMyMessage={user._id == senderId._id ? true : false}
        item={item}
        isRenderAvatarIcon={isRenderAvatarIcon}
        index={index}
        sender={senderId}
        idSelected={idSelected}
        setIdSelected={setIdSelected}
      />
    );
  }

  function isRenderAvatarIcon(senderId, index) {
    if (index == 0) {
      return true;
    }
    if (conver.messages[index - 1].senderId._id === senderId) return false;
    return true;
  }

  function scrollToEndFlastList() {
    flastListRef.current.scrollToEnd();
  }

  if (!conver)
    return (
      <View>
        <Text>Dang tai</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.listMessContainer}>
        {
          <FlatList
            style={styles.flatList}
            data={conver.messages}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ref={flastListRef}
            inverted={true}
            initialNumToRender={20}
          ></FlatList>
        }
      </View>
      <View style={styles.enterContainer}>
        <MessageInput converId={converId} />
      </View>
      <View style={[styles.pinMessContainer]}>
        {/* <FlatList
          data={getPinMessages()}
          renderItem={renderItemPinMessage}
          key={(item) => item._id}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#92918e",
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    width: "100%",
  },
  listMessContainer: {
    backgroundColor: "#92918e",
    paddingTop: 60,
    height: "100%",
  },
  flatList: {
    paddingHorizontal: 12,
  },
  enterContainer: {
    height: 60,
    backgroundColor: "white",
  },
  pinMessContainer: {
    // width: "100%",
    position: "absolute",
    top: 4,
    left: 4,
    right: 4,
    backgroundColor: "white",
    borderRadius: 8,
  },
  pinItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  pinIconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  pinBody: {
    flex: 1,
    paddingHorizontal: 8,
  },
  pinContent: {
    fontWeight: "bold",
    fontSize: 15,
  },
  pinSender: {
    fontSize: 13,
    color: "#888",
  },
  pinItemRight: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    borderLeftWidth: 2,
    borderLeftColor: "#eee",
  },
  pinRightNum: {
    fontSize: 15,
  },
});

export default ChatRoom;

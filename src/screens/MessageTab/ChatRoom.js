import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Text, Keyboard } from "react-native";
import HeaderTitleChatRoom from "../../components/Header/HeaderTitleChatRoom";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { useConversationContext } from "../../store/contexts/ConversationContext";
import { useGlobalContext } from "../../store/contexts/GlobalContext";

const ChatRoom = (props) => {
  const { converId } = props.route.params;
  const { navigation } = props;
  const { user } = useGlobalContext();
  const { getMember, getMembers, sendMessage, getConverById, convers } =
    useConversationContext();
  const [conver, setConver] = useState(getConverById(converId));
  const { type, messages } = conver;
  const flastListRef = useRef();
  const [idSelected, setIdSelected] = useState(null);

  useEffect(() => {
    setConver(getConverById(converId));
    return () => {};
  }, [convers]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <HeaderTitleChatRoom
          {...props}
          typeOfConversation={type ? "group" : "simple"}
          numOfMember={getMembers(converId).length}
          converName={conver.name}
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
  }, []);

  function renderItem({ index, item }) {
    if (item.isDeleted == true) return <></>;
    return (
      <Message
        isMyMessage={user._id == item.senderId ? true : false}
        item={item}
        isRenderAvatarIcon={isRenderAvatarIcon}
        index={index}
        sender={getMember(converId, item.senderId)}
        idSelected={idSelected}
        setIdSelected={setIdSelected}
      />
    );
  }

  function isRenderAvatarIcon(senderId, index) {
    if (index == 0) {
      return true;
    }
    if (messages[index - 1].senderId === senderId) return false;
    return true;
  }

  function onSendMessage(data) {
    Keyboard.dismiss();
    console.log({ ...data, conversationId: converId });
    sendMessage({ ...data, conversationId: converId });
  }

  function scrollToEndFlastList() {
    flastListRef.current.scrollToEnd();
  }
  return (
    <View style={styles.container}>
      <View style={styles.listMessContainer}>
        {
          <FlatList
            style={styles.flatList}
            data={messages.reverse()}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ref={flastListRef}
            inverted={true}
            initialNumToRender={20}
          ></FlatList>
        }
      </View>
      <View style={styles.enterContainer}>
        <MessageInput onSendMessage={onSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#92918e",
    flex: 1,
    justifyContent: "flex-end",
  },
  listMessContainer: {
    backgroundColor: "#92918e",
    paddingTop: 60,
  },
  flatList: {
    paddingHorizontal: 12,
  },
  enterContainer: {
    height: 60,
    backgroundColor: "white",
  },
});

export default ChatRoom;

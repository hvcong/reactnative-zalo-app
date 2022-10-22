import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import HeaderTitleChatRoom from "../../components/Header/HeaderTitleChatRoom";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { useConversationContext } from "../../store/contexts/ConversationContext";
import { useGlobalContext } from "../../store/contexts/GlobalContext";

const ChatRoom = (props) => {
  const { typeOfConversation, messages, converId, conver } = props.route.params;
  const { navigation } = props;
  const { user } = useGlobalContext();
  const { getMember, getMembers, sendMessage } = useConversationContext();
  const flastListRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <HeaderTitleChatRoom
          {...props}
          typeOfConversation={typeOfConversation}
          numOfMember={getMembers(converId).length}
          converName={conver.name}
          navigation={navigation}
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
    return (
      <Message
        isMyMessage={user._id == item.senderId ? true : false}
        item={item}
        isRenderAvatarIcon={isRenderAvatarIcon}
        index={index}
        sender={getMember(converId, item.senderId)}
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

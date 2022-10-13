import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import HeaderTitleChatRoom from "../../components/Header/HeaderTitleChatRoom";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";

const myId = "abd1";

const messages = [
  {
    content: " ou better underst thed post content.",
    avatar: "...",
    id: "qer222e",
    userId: "abd2",
    type: "text",
  },
  {
    content:
      " this is a content of Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content.",
    avatar: "...",
    id: "qereff",
    userId: "abd1",
    type: "text",
  },
  {
    content:
      " this is a content of message ntent of Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content.",
    avatar: "...",
    id: "qeaar2e",
    userId: "abd2",
    type: "text",
  },
  {
    content:
      " this is a content of Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content.",
    avatar: "...",
    id: "qerddde",
    userId: "abd1",
    type: "text",
  },
  {
    content:
      " this is a content of message ntent of Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content.",
    avatar: "...",
    id: "qer2asfe",
    userId: "abd2",
    type: "text",
  },
  {
    content: "../../assets/avatar.jpg",
    avatar: "...",
    id: "qersse",
    userId: "abd1",
    type: "image",
  },
  {
    content:
      " this is a content of Facebook is showing information to help you better understand the purpose of a Page. See actions taken by the people who manage and post content.",
    avatar: "...",
    id: "qere",
    userId: "abd1",
    type: "text",
  },
];

const ChatRoom = (props) => {
  const { typeOfConversation } = props.route.params;
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <HeaderTitleChatRoom
          {...props}
          typeOfConversation={typeOfConversation}
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

  function renderItem({ item }) {
    return (
      <Message
        content={item.content}
        isMyMessage={myId === item.userId ? true : false}
        type={item.type}
      />
    );
  }

  function onSendMessage() {
    console.warn("send message");
  }
  return (
    <View style={styles.container}>
      <View style={styles.listMessContainer}>
        <FlatList
          style={styles.flatList}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        ></FlatList>
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

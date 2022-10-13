import React from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import ChatItem from "../../components/ChatItem";

const data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
    lastTime: "1",
    lastMessage: "this is a message from his",
    numberOfNewMessage: 3,
  },
  {
    id: "bd7acbea-c1b1-46c2-ad5-3ad53ab28ba",
    name: "First Item",
    lastTime: "1",
    lastMessage: "this is a message from his",
    numberOfNewMessage: 3,
  },
  {
    id: "bd7acbea-cb1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
    lastTime: "1",
    lastMessage: "this is a message from his",
    numberOfNewMessage: 3,
  },
  {
    id: "bd7acbea-c1b1-462-aed5-3ad53ab28ba",
    name: "First Item",
    lastTime: "1",
    lastMessage: "this is a message from his",
    numberOfNewMessage: 3,
  },
  {
    id: "bd7acbea-c1b1-6c2-aed5-3ad53abb28ba",
    name: "First Item",
    lastTime: "1",
    lastMessage: "this is a message from his",
    numberOfNewMessage: 3,
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-ad53ab28ba",
    name: "First Item",
    lastTime: "1",
    lastMessage: "this is a message from his",
    numberOfNewMessage: 3,
  },
  {
    id: "bd7acbea-c1b1sss-6c2-aed5-3ad53abb28ba",
    name: "First Item",
    lastTime: "1",
    lastMessage: "this is a message from his",
    numberOfNewMessage: 3,
  },
  {
    id: "bd7acbea-c1sfdsfb1-46c2-aed5-ad53ab28ba",
    name: "First Item",
    lastTime: "1",
    lastMessage: "this is a message from his",
    numberOfNewMessage: 3,
  },
];
const ListChat = (props) => {
  const { navigation } = props;

  function renderItem({ item }) {
    return <ChatItem item={item} navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {},
});

export default ListChat;

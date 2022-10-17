import React from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import { isArray } from "react-native-axios/lib/utils";
import ChatItem from "../../components/ChatItem";
import { useConversationContext } from "../../store/contexts/ConversationContext";

const ListChat = React.memo((props) => {
  const { convers } = useConversationContext();
  const { navigation } = props;

  function renderItem({ item }) {
    return <ChatItem conver={item} navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={isArray(convers) ? convers : []}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        ></FlatList>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {},
});

export default ListChat;

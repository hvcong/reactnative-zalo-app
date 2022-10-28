import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AddFriendItem from "../FriendsTab/components/AddFriendItem";
import { useConversationContext } from "../../store/contexts/ConversationContext";
const ListMember = (props) => {
  const { navigation, route } = props;
  const { getMembers } = useConversationContext();
  const [members, setMembers] = useState(getMembers(route.params.converId));
  const [selectedId, setSelectedId] = useState(null);

  function renderItem({ item }) {
    return (
      <AddFriendItem
        {...item}
        converId={route.params.converId}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.btn}>
          <AntDesign name="adduser" size={24} color="black" />
          <Text style={styles.textBtn}>Thêm thành viên</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>
            Danh sách thành viên ({members && members.length})
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={members}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  textBtn: {
    marginLeft: 8,
  },
  section: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontWeight: "bold",
  },
  body: {},
});

export default ListMember;

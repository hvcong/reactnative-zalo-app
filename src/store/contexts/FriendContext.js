import React, { createContext, useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useGlobalContext } from "./GlobalContext";
import friendApi from "../../api/friendApi";
import { set } from "react-native-reanimated";
import { useConversationContext } from "./ConversationContext";

const FriendContext = createContext();

const FriendContextProvider = ({ children }) => {
  const [friends, setfriends] = useState([]);
  const { user } = useGlobalContext();
  const { socket } = useConversationContext();

  useEffect(() => {
    if (user) {
      loadFriends();
    }
    return () => {};
  }, [user]);

  useEffect(() => {
    // listent socket on create-simple-conversation
    if (!socket) return;
    console.log("id", user._id);
    console.log("listent socket on create-simple-conversation ");
    socket.on("create-simple-conversation", (data) => {
      console.log("data: ", data);
    });
    return () => {};
  }, [socket]);

  async function loadFriends() {
    const res = await friendApi.getAllFriends();
    if (res.isSuccess) {
      setfriends(res.data);
    } else {
      console.log("not found friends");
    }
  }

  function checkIsMyFriend(_id) {
    for (let i = 0; i < friends.length; i++) {
      if (friends[i]._id == _id) {
        return true;
      }
    }
    return false;
  }

  const FriendContextData = {
    friends,
    checkIsMyFriend,
  };
  return (
    <FriendContext.Provider value={FriendContextData}>
      {children}
    </FriendContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default FriendContextProvider;
export function useFriendContext() {
  return useContext(FriendContext);
}

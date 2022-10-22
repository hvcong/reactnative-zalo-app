import React, { createContext, useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useGlobalContext } from "./GlobalContext";
import friendApi from "../../api/friendApi";
import { set } from "react-native-reanimated";

const FriendContext = createContext();

const FriendContextProvider = ({ children }) => {
  const [friends, setfriends] = useState([]);
  const { user } = useGlobalContext();

  useEffect(() => {
    if (user) {
      loadFriends();
    }
    return () => {};
  }, [user]);

  async function loadFriends() {
    const res = await friendApi.getAllFriends();
    if (res.isSuccess) {
      setfriends(res.data);
    } else {
      console.log("not found friends");
    }
  }

  const FriendContextData = {
    friends,
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

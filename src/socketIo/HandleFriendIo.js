import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useConversationContext } from "../store/contexts/ConversationContext";
import { useFriendContext } from "../store/contexts/FriendContext";
import { useGlobalContext } from "../store/contexts/GlobalContext";

const HandleFriendIo = () => {
  const { socket } = useConversationContext();
  const { loadFriends, loadAllRequestToMe, loadAllRequestFromMe } =
    useFriendContext();
  const { user } = useGlobalContext();

  useEffect(() => {
    if (socket) {
      removeListentIo(socket);
      handle(socket);
    }
    return () => {};
  }, [user, socket]);

  function handle(socket) {
    console.log("io friend --- ", user.name);
    socket.on("send-friend-invite", (data) => {
      loadAllRequestToMe();
      loadAllRequestFromMe();
    });

    socket.on("deleted-invite-was-send", (data) => {
      console.log("deleted-invite-was-send", user.name, data);
      loadAllRequestToMe();
      loadAllRequestFromMe();
    });

    socket.on("accept-friend", (data) => {
      console.log("accept-friend", user.name, data);
      loadAllRequestToMe();
      loadFriends();
      loadAllRequestFromMe();
    });

    socket.on("deleted-friend-invite", (data) => {
      console.log("deleted-friend-invite", user.name, data);
      loadAllRequestToMe();
      loadFriends();
      loadAllRequestFromMe();
    });
  }

  function removeListentIo(socket) {
    socket.removeListener("send-friend-invite");
    socket.removeListener("deleted-friend-invite");
    socket.removeListener("deleted-invite-was-send");
    socket.removeListener("accept-friend");
  }

  return <View></View>;
};

const styles = StyleSheet.create({});

export default HandleFriendIo;

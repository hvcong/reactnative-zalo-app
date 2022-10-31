import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useConversationContext } from "../store/contexts/ConversationContext";
import { useGlobalContext } from "../store/contexts/GlobalContext";

const HandleConverIo = () => {
  const { socket, loadAllConversation, convers, addNewMessage, updateMessage } =
    useConversationContext();
  const { user } = useGlobalContext();
  const [hasListens, sethasListens] = useState({});

  // io listen converId
  // useEffect(() => {
  //   if (convers && socket) {
  //     convers.forEach((conv) => {
  //       let conversationId = conv._id;

  //       socket.emit("join-conversation", conversationId);
  //     });
  //   }
  //   return () => {};
  // }, [convers.socket]);

  useEffect(() => {
    if (socket) {
      remove(socket);
      handle(socket);
    }
    return () => {};
  }, [user, socket]);

  function handle(socket) {
    socket.on("create-group-conversation", (data) => {
      console.log("create-group-conversation" + user.name + data);
      loadAllConversation();
    });

    socket.on("create-simple-conversation", (data) => {
      console.log("create-simple-conversation", user.name);
      loadAllConversation();
    });

    socket.on("rename-conversation", (data) => {
      console.log("rename-conversation", user.name);
    });

    socket.on("new-message", (data) => {
      addNewMessage(data.message);
    });

    socket.on("delete-message", ({ message }) => {
      message.isDeleted = true;
      updateMessage(message);
    });
  }

  function remove(socket) {
    socket.removeListener("create-group-conversation");
    socket.removeListener("new-message");
    socket.removeListener("delete-message");
  }

  return <View></View>;
};

const styles = StyleSheet.create({});

export default HandleConverIo;

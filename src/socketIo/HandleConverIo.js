import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import messApi from "../api/messApi";
import MessApi from "../api/messApi";
import { useConversationContext } from "../store/contexts/ConversationContext";
import { useGlobalContext } from "../store/contexts/GlobalContext";

const HandleConverIo = () => {
  const {
    socket,
    loadAllConversation,
    convers,
    addNewMessage,
    updateMessage,
    setconvers,
    updateConver,
    getConverById,
    loadAllMemberOfConver,
  } = useConversationContext();
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

    socket.on("new-message", async ({ message }) => {
      console.log("emit new-message");
      addNewMessage(message);
    });

    socket.on("delete-message", ({ message }) => {
      message.isDeleted = true;
      updateMessage(message);
    });

    socket.on("add-managers", (data) => {
      console.log("emit add-managers", data);
    });

    // delete manager
    socket.on("delete-managers", (data) => {
      console.log("emit delete-managers", data);
    });

    socket.on("delete");

    // when delete member
    socket.on("deleted-group", (data) => {
      console.log("emit deleted-group", data);
    });

    // when add member
    socket.on("update-member", (converId) => {
      loadAllMemberOfConver(converId);
    });

    // rename
    socket.on("rename-conversation", (converId, name, saveMessage) => {
      console.log("emit rename-conversation");
      let _convers = [...convers];
      let newConvers = _convers.map((cv) => {
        if (cv._id == converId) {
          cv.name = name;
        }
        return cv;
      });
      setconvers(newConvers);
    });

    // cập nhật avatar
    socket.on(
      "update-avatar-conversation",
      (converId, avatarUrl, saveMessage) => {
        console.log("emit update-avatar-conversation");

        let _newConver = getConverById(converId);
        _newConver.avatar = avatarUrl;
        updateConver(_newConver);
      }
    );

    //
  }

  function remove(socket) {
    socket.removeListener("create-group-conversation");
    socket.removeListener("new-message");
    socket.removeListener("delete-message");
    socket.removeListener("add-managers");
    socket.removeListener("delete-managers");
    socket.removeListener("update-member");
    socket.removeListener("deleted-group");
    socket.removeListener("rename-conversation");
    socket.removeListener("update-avatar-conversation");
  }

  return <View></View>;
};

const styles = StyleSheet.create({});

export default HandleConverIo;

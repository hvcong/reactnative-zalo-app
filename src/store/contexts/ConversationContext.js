import React, { createContext, useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import converApi from "../../api/converApi";

const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const [state, setstate] = useState({
    convers: [],
  });

  useEffect(() => {
    loadConversations();
    return () => {};
  }, []);

  async function loadConversations() {
    const convers = await converApi.getAllConvers();
    if (convers) {
      if (Array.isArray(convers.data)) {
        setstate({
          ...state,
          convers: convers.data,
        });
      } else {
        console.log("load conversation again");
        loadConversations();
      }
    } else {
      console.log("conver empty");
    }
  }

  function getMembers(converId) {
    for (let i = 0; i < state.convers.length; i++) {
      if (converId == state.convers[i]._id) {
        return state.convers[i].members;
      }
    }
  }

  function getMember(converId, memberId) {
    const members = getMembers(converId);
    for (let i = 0; i < members.length; i++) {
      if (members[i]._id === memberId) {
        return members[i];
      }
    }
  }

  const ConversationContextData = {
    convers: state.convers,
    getMembers,
    getMember,
  };
  return (
    <ConversationContext.Provider value={ConversationContextData}>
      {children}
    </ConversationContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default ConversationContextProvider;
export function useConversationContext() {
  return useContext(ConversationContext);
}

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet } from "react-native";
import converApi from "../../api/converApi";
import socketIOClient from "socket.io-client";

const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const [state, setstate] = useState({
    convers: [],
  });
  const host = "https://zalo-chat.herokuapp.com/";
  const socketRef = useRef();

  useEffect(() => {
    connectSocketIo();
  }, []);

  // connect socket io
  function connectSocketIo() {
    socketRef.current = socketIOClient.connect(host);
    console.log("connect success");
  }

  async function loadConversations() {
    const convers = await converApi.getAllConvers();
    if (convers) {
      if (Array.isArray(convers.data)) {
        setstate({
          ...state,
          convers: convers.data,
        });
      } else {
        console.log("cover empty");
      }
    } else {
      console.log("server error");
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
    if (Array.isArray(members))
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
    loadConversations,
    socket: socketRef.current,
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

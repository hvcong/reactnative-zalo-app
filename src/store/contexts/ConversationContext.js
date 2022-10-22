import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet } from "react-native";
import { startDetecting } from "react-native/Libraries/Utilities/PixelRatio";
import converApi from "../../api/converApi";
import startSocketIO from "../../socketIo";
import { useGlobalContext } from "./GlobalContext";

const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const [convers, setconvers] = useState([]);
  const [hasListens, sethasListens] = useState({});
  const socketRef = useRef();
  const { user } = useGlobalContext();

  useEffect(() => {
    if (convers) {
      const _hasListens = { ...hasListens };

      convers.forEach((conv) => {
        if (!_hasListens[conv._id]) {
          socketRef.current.on(conv._id, (data) => {
            console.log(data);
            // when hava new mesage
            if (data.type == "new-message") {
              console.log("hava new-message from server");
              newMessage(data);
            }
          });

          _hasListens[conv._id] = true;
        }
      });
      sethasListens(_hasListens);
    }
    return () => {};
  }, [convers]);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
    return () => {};
  }, [user]);

  async function loadConversations() {
    socketRef.current = await startSocketIO();
    socketRef.current.on("connect", () => {
      socketRef.current.on(user._id, (data) => {
        if (data && data.conversations && Array.isArray(data.conversations)) {
          console.log("socket on convers");
          setconvers(data.conversations);
        } else if (data.type && data.type == "new-message") {
          console.log(" new message from server");
        }
      });
    });
  }

  function newMessage(data) {
    const _convers = [...convers];
    _convers.map((conv) => {
      if (conv._id == data.message.conversationId) {
        console.log("add");
        conv.messages.unshift(data.message);
        conv.lastMessageId = data.message;
      }
    });
    setconvers(_convers);
  }

  function sendMessage({ message, type, conversationId }) {
    socketRef.current.emit("send-message", {
      message: {
        content: message,
        type,
        conversationId,
      },
    });
  }

  function getMembers(converId) {
    for (let i = 0; i < convers.length; i++) {
      if (converId == convers[i]._id) {
        return convers[i].members;
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
    convers: convers,
    getMembers,
    getMember,
    loadConversations,
    sendMessage,
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

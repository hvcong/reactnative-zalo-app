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
  const { user } = useGlobalContext();
  const socketRef = useRef();
  const [isReverse, setIsReverse] = useState(false);
  const [is, setIs] = useState(false);

  useEffect(() => {
    if (convers) {
      const _hasListens = { ...hasListens };

      convers.forEach((conv) => {
        if (!_hasListens[conv._id]) {
          socketRef.current.on(conv._id, (data) => {
            // when hava new mesage
            if (data.type == "new-message") {
              console.log("socket:  hava new-message from server");
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

  // load and setting io
  async function loadConversations() {
    if (!socketRef.current || !socketRef.current.connected) {
      console.log("io start");
      socketRef.current = await startSocketIO();
      socketRef.current.on("connect", () => {
        console.log("socket: connect");

        socketRef.current.on(user._id, (data) => {
          if (data && data.conversations && Array.isArray(data.conversations)) {
            setconvers(data.conversations);
          } else if (data.type && data.type == "new-message") {
            console.log("socket: new message from server");
          } else {
            console.log("hava some emit");
          }
        });

        socketRef.current.on("update-avatar-conversation", (data) => {
          console.log("have update-avatar-conversation");
        });
      });
    }
  }

  async function loadAllConversation() {
    try {
      const res = await converApi.getAllConvers();
      if (res.isSuccess) {
        setconvers(res.data);
      }
    } catch (error) {}
  }

  function newMessage(data) {
    let _convers = [...convers];
    console.log("newMessage func");

    // console.log(data);
    _convers = _convers.map((conv) => {
      if (conv._id == data.message.conversationId) {
        conv.messages.push(data.message);
        conv.lastMessageId = data.message;
      }
      return conv;
    });
    setconvers(_convers);
  }

  function sendMessage({ message, type, conversationId }) {
    console.log("socket: client send message");
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

  async function sendImageMessage(converId, pickerResult) {
    try {
      const res = await converApi.sendImageMessage(converId, pickerResult);
      if (res.isSuccess) {
        // await loadAllConversation();
        console.log("send image ok");
        return true;
      }
    } catch (error) {
      console.log("send image err:", error);
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

  function addNewConver(conver) {
    setconvers([conver, ...convers]);
  }

  function getConverById(_id) {
    for (let i = 0; i < convers.length; i++) {
      if (convers[i]._id == _id) {
        const _conver = { ...convers[i] };
        const _messages = [..._conver.messages];
        _messages.reverse();
        _conver.messages = _messages;
        return _conver;
      }
    }
  }

  // create simple conver
  async function createSimpleConver(_id) {
    try {
      const res = await converApi.createSimpleChat({ userId: _id });
      if (res.isSuccess) {
        console.log("create ok");
        console.log(res);
        return res._id;
      } else {
        console.log("create faild");
        return false;
      }
    } catch (error) {
      console.log("create simple conver err", error);
      return false;
    }
  }

  // recall message == delete message
  async function recallMessage(_id, converId) {
    try {
      const res = await converApi.recallMessage(_id, converId);
      // await loadAllMessageByConverId(converId);
      await loadAllConversation();

      return true;
    } catch (error) {
      console.log("recall message err", error);
      return false;
    }
  }

  // recall message only me
  async function recallMessageOnly(_id, converId) {
    try {
      const res = await converApi.recallMessageOnly(_id, converId);
      if (res.isSuccess) console.log("recall success");
      await loadAllConversation();

      return true;
    } catch (error) {
      console.log("recall message only err", error);
      return false;
    }
  }

  // leave group
  async function leaveGroup(converId) {
    try {
      const res = await converApi.leaveGroup(converId);
      console.log(res);
      if (res.isSuccess) {
        console.log("leave ok");
        let _convers = [...convers];

        let newArr = _convers.filter((conver) => {
          return conver._id != converId;
        });

        setconvers(newArr);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("leave group err", error);
      return false;
    }
  }

  // rename conver
  async function renameConver(converId, newName) {
    try {
      const res = await converApi.rename(converId, newName);
      if (res.isSuccess) {
        console.log("rename ok");
        let _convers = [...convers];
        let newArr = _convers.map((cv) => {
          if (cv._id == converId) {
            cv.name = newName;
          }
          return cv;
        });
        setconvers(newArr);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("rename errr", error);
      return false;
    }
  }

  // update avatar
  async function updateAvatar(converId, pickerResult) {
    let localUri = pickerResult.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });

    try {
      const res = await converApi.updateAvatar(converId, formData);
      if (res.isSuccess) {
        await loadAllConversation();
        console.log("update success");
        return true;
      }
    } catch (error) {
      console.log("update avatar err:", error);
    }
  }
  const ConversationContextData = {
    convers: convers,
    getMembers,
    getMember,
    loadConversations,
    sendMessage,
    addNewConver,
    getConverById,
    createSimpleConver,
    recallMessage,
    recallMessageOnly,
    setIsReverse,
    leaveGroup,
    renameConver,
    updateAvatar,
    sendImageMessage,
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

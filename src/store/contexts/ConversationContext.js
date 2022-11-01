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
import handleConverIo from "../../socketIo/converIO";
import { useGlobalContext } from "./GlobalContext";
import memberApi from "../../api/memberApi";

const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const [convers, setconvers] = useState([]);
  const [hasListens, sethasListens] = useState({});
  const { user } = useGlobalContext();
  const socketRef = useRef();
  const [lastView, setLastView] = useState([]);

  // io listen converId
  // useEffect(() => {
  //   if (convers) {
  //     const _hasListens = { ...hasListens };
  //     convers.forEach((conv) => {
  //       if (!_hasListens[conv._id]) {
  //         socketRef.current.on(conv._id, (data) => {
  //           // when hava new mesage
  //           if (data.type == "new-message") {
  //             console.log("socket:  hava new-message from server");
  //             newMessage(data);
  //           }
  //         });

  //         _hasListens[conv._id] = true;
  //       }
  //     });
  //     sethasListens(_hasListens);
  //   }
  //   return () => {};
  // }, [convers]);

  useEffect(() => {
    if (user) {
      connectIo();
      loadAllConversation();
    }
    return () => {};
  }, [user]);

  // load and setting io
  async function connectIo() {
    if (!socketRef.current || !socketRef.current.connected) {
      console.log("io start");
      socketRef.current = await startSocketIO();
      socketRef.current.on("connect", () => {
        console.log("socket: connect");
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

  async function loadAllLastView() {
    try {
      const res = await memberApi.getAllLastView();
      console.log(res);
      if (res.isSuccess) {
        setLastView();
      }
      console.log("load all last view err", error);
    } catch (error) {
      console.log("load all last view err", error);
    }
  }

  async function sendMessage(props) {
    console.log(props);
    const { type, conversationId } = props;

    if (type == "TEXT") {
      const { content } = props;

      try {
        const res = await converApi.addTextMessage(conversationId, content);
        if (res.isSuccess) {
          console.log("send message ok");
          return true;
        }
        console.log("send mesage fail");
      } catch (error) {
        console.log("send message err", error);
      }
    } else {
      console.log("Chưa viết xử lí type =" + type);
      return false;
    }
  }

  // thêm mới message offline
  function addNewMessage(newMessage) {
    console.log("new", newMessage);
    let _conv = getConverById(newMessage.conversationId);
    _conv.messages.push(newMessage);
    _conv.lastMessageId = { ...newMessage };

    updateConver(_conv);
  }

  // cập nhật thay đổi của 1  message offine
  function updateMessage(newMessage) {
    console.log("new 2:", newMessage);
    let _conv = getConverById(newMessage.conversationId);
    let index = -1;
    for (let i = 0; i < _conv.messages.length; i++) {
      if (_conv.messages[i]._id == newMessage._id) {
        index = i;
        break;
      }
    }
    _conv.messages.splice(index, 1, newMessage);
    updateConver(_conv);
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

  // offline
  function getMember(converId, memberId) {
    const members = getMembers(converId);
    if (Array.isArray(members))
      for (let i = 0; i < members.length; i++) {
        if (members[i]._id === memberId) {
          return members[i];
        }
      }
  }

  // offline
  function addNewConver(conver) {
    setconvers([conver, ...convers]);
  }

  // get conver by id offline
  function getConverById(_id) {
    for (let i = 0; i < convers.length; i++) {
      if (convers[i]._id == _id) {
        return convers[i];
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
      if (res.isSuccess) {
        console.log("recall success");
        let _conv = getConverById(converId);
        let _mess = _conv.messages;
        _mess = _mess.map((item) => {
          if (item._id == _id) {
            console.log(item.deletedWithUserIds.length);
            item.deletedWithUserIds.push(user._id);
            console.log(item.deletedWithUserIds.length);
          }
          return item;
        });
        _conv.messages = _mess;
        updateConver(_conv);
        return true;
      }
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
        // let _convers = [...convers];

        // let newArr = _convers.filter((conver) => {
        //   return conver._id != converId;
        // });

        // setconvers(newArr);

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
        console.log("update success");
        return true;
      }
    } catch (error) {
      console.log("update avatar err:", error);
    }
  }

  // add members
  async function addMembers(converId, userIds) {
    try {
      const res = await converApi.addMembers(converId, userIds);
      if (res.isSuccess) {
        console.log("add members ok");
        return true;
      }
    } catch (error) {
      console.log("add members err", error);
      return false;
    }
  }

  // get all members of conver
  async function loadAllMemberOfConver(converId) {
    try {
      const res = await memberApi.getAllMembers(converId);
      if (res.isSuccess) {
        const _newConver = getConverById(converId);
        _newConver.members = res.data;
        updateConver(_newConver);
        return true;
      }
    } catch (error) {
      console.log("get mmebers err", error);
    }
  }

  // get lassview of a conver
  async function getLastView(converId) {
    try {
      const res = await converApi.getLastView(converId);
      if (res.isSuccess) {
        console.log(res);
        return res;
      }
    } catch (error) {
      console.log("get lass view err", error);
      return false;
    }
  }

  // delete history messages at my side
  async function deleteHistoryMessages(converId) {
    try {
      const res = await converApi.deleteHistoryMessages(converId);
      if (res.isSuccess) {
        console.log("delete history ok");
        await loadAllConversation();
        return true;
      } else {
        console.log("dlte history faild");
      }
    } catch (error) {
      console.log("delete hist err", error);
    }
  }

  // delete member
  async function deleteMember(converId, memberId) {
    try {
      const res = await converApi.deleteMember(converId, memberId);
      if (res.isSuccess) {
        console.log("delete member ok");
        let newConver = getConverById(converId);

        let _members = newConver.members;
        console.log(_members.length);
        let index = -1;

        for (let i = 0; i < _members.length; i++) {
          if (_members[i]._id == memberId) {
            index = i;
          }
        }

        if (index >= 0) {
          _members.splice(index, 1);
        }

        console.log(_members.length);
        newConver.members = _members;
        updateConver(newConver);

        return true;
      }
    } catch (error) {
      console.log("delete member error", error);
    }
  }

  // add manager
  async function addManager(converId, memberId) {
    try {
      const res = await converApi.addManager(converId, memberId);
      if (res.isSuccess) {
        console.log("add manager ok");

        let newConver = getConverById(converId);
        newConver.managerIds.push(memberId);
        updateConver(newConver);

        return true;
      } else {
        console.log("add manager faild");
      }
    } catch (error) {
      console.log("add manager err", error);
    }
  }

  // remove manager
  async function deleteManager(converId, memberId) {
    try {
      const res = await converApi.deleteManager(converId, memberId);
      console.log(res);
      if (res.isSuccess) {
        console.log("delete manager ok");

        let newConver = getConverById(converId);

        newConver.managerIds.plice(newConver.managerIds.indexOf(memberId));
        updateConver(newConver);

        return true;
      } else {
        console.log("delete manager faild");
      }
    } catch (error) {
      console.log("delete manager err", error);
    }
  }

  //update conver offline
  function updateConver(newConver) {
    let _convers = [...convers];

    _convers = _convers.map((conver) => {
      if (newConver._id == conver._id) return newConver;
      return conver;
    });

    setconvers(_convers);
  }

  const ConversationContextData = {
    convers: convers,
    setconvers,
    getMembers,
    getMember,
    sendMessage,
    addNewConver,
    getConverById,
    createSimpleConver,
    recallMessage,
    recallMessageOnly,
    leaveGroup,
    renameConver,
    updateAvatar,
    sendImageMessage,
    addMembers,
    getLastView,
    deleteHistoryMessages,
    deleteMember,
    addManager,
    deleteManager,
    loadAllConversation,
    addNewMessage,
    updateMessage,
    updateConver,
    loadAllMemberOfConver,
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

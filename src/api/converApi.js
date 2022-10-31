import axiosClient from "./axiosClient";

class ConverApi {
  getAllConvers() {
    let url = "conversation/";
    return axiosClient.get(url);
  }

  createGroupChat(body) {
    let url = "conversation/groups";
    return axiosClient.post(url, body);
  }

  createSimpleChat(body) {
    let url = "conversation/";
    return axiosClient.post(url, body);
  }

  recallMessage(_id, converId) {
    let url = "message/" + _id;
    return axiosClient.delete(url);
  }

  recallMessageOnly(_id, converId) {
    let url = "message/" + _id + "/only";
    return axiosClient.delete(url);
  }

  getAllMessageByConverId(_id) {
    let url = "/message/by_conversation/" + _id;
    return axiosClient.get(url);
  }

  // rời nhóm
  leaveGroup(converId) {
    let url = `conversation/${converId}/member/leave`;
    console.log(url);
    return axiosClient.delete(url);
  }

  // đuổi khỏi nhóm
  deleteMember(converId, memberId) {
    let url = `/conversation/${converId}/members/${memberId}`;
    return axiosClient.delete(url);
  }

  // cho làm phó nhóm
  addManager(converId, memberId) {
    let url = `conversation/${converId}/managers`;
    return axiosClient.post(url, {
      managerId: [memberId],
    });
  }

  // không cho làm phó nhóm nữa
  deleteManager(converId, memberId) {
    let url = `conversation/${converId}/managers`;
    console.log(converId, memberId);
    return axiosClient.delete(url, {
      managerId: [memberId],
    });
  }

  // đổi tên nhóm
  rename(converId, newName) {
    let url = `conversation/${converId}/name`;
    return axiosClient.patch(url, {
      name: newName,
    });
  }

  // đổi avatar cho group
  updateAvatar(converId, formData) {
    let url = `/conversation/${converId}/avatar`;
    return axiosClient.patch(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // send image
  sendImageMessage(converId, pickerResult) {
    let localUri = pickerResult.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = "";
    let url = "";
    console.log(match);
    if (match && match[1] == "mp4") {
      type = "video/mp4";
      url = "/message/file/FILE/" + converId;
    } else {
      type = match ? `image/${match[1]}` : `image`;
      url = "/message/file/IMAGE/" + converId;
    }
    console.log(type);
    let formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });

    return axiosClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // add members to conver
  addMembers(converId, userIds) {
    let url = `conversation/${converId}/members`;
    return axiosClient.post(url, {
      userIds: [...userIds],
    });
  }

  // load All members of conver
  getAllMembers(converId) {
    let url = `conversation/${converId}/members`;
    return axiosClient.get(url);
  }

  // get lastView of a conver
  getLastView(converId) {
    let url = `conversation/${converId}/last-view`;
    return axiosClient.get(url);
  }

  // delete history messages at my side
  deleteHistoryMessages(converId) {
    let url = `conversation/${converId}/messages`;
    return axiosClient.delete(url);
  }

  // add text message
  addTextMessage(converId, content) {
    let url = `message/text`;
    return axiosClient.post(url, {
      conversationId: converId,
      content: content,
      type: "TEXT",
    });
  }
}

const converApi = new ConverApi();
export default converApi;

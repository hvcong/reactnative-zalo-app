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
    let url = `/conversation/${converId}/member/leave`;
    console.log(url);
    return axiosClient.delete(url);
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
    let url = "/message/file/IMAGE/" + converId;
    let localUri = pickerResult.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

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
}

const converApi = new ConverApi();
export default converApi;

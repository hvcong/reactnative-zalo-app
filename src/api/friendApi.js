import axiosClient from "./axiosClient";

class FriendApi {
  getAllFriends() {
    let url = "friends";
    return axiosClient.get(url);
  }
}

const friendApi = new FriendApi();
export default friendApi;

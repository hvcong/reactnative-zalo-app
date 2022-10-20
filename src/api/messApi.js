import axiosClient from "./axiosClient";

class MessApi {
  getAllConvers() {
    let url = "conversation/";
    return axiosClient.get(url);
  }
}

const MessApi = new MessApi();
export default MessApi;

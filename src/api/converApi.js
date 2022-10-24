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
}

const converApi = new ConverApi();
export default converApi;

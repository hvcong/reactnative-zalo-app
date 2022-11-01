import axiosClient from "./axiosClient";

class MessApi {
  getAllConvers() {
    let url = "conversation/";
    return axiosClient.get(url);
  }

  getMessageById(id) {
    let url = `/message/${id}`;
    return axiosClient.get(url);
  }
}

const messApi = new MessApi();
export default messApi;

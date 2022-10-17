import axiosClient from "./axiosClient";

class ConverApi {
  getAllConvers() {
    let url = "conversation/";
    return axiosClient.get(url);
  }
}

const converApi = new ConverApi();
export default converApi;

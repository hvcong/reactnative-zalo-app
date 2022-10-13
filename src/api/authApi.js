import axiosClient from "./axiosClient";

class AuthApi {
  checkToken = async (token) => {
    let url = "/auth/";
    return axiosClient.get(url);
  };
}

const authApi = new AuthApi();
export default authApi;

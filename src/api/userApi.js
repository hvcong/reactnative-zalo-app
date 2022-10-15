import axiosClient from "./axiosClient";

class UserApi {
  register = (params) => {
    const url = "auth/register";
    return axiosClient.post(url, { params });
  };
}

const userApi = new UserApi();
export default userApi;

import axiosClient from "./axiosClient";

class UserApi {
  findUserByPhoneNumber(phone) {
    let url = `/user/phonenumber/${phone}`;
    return axiosClient.get(url);
  }
}

const userApi = new UserApi();
export default userApi;

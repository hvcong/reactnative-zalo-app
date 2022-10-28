import axiosClient from "./axiosClient";

class UserApi {
  findUserByPhoneNumber(phone) {
    let url = `/user/phonenumber/${phone}`;
    return axiosClient.get(url);
  }

  findUserById(_id) {
    let url = `/user/` + _id;
    return axiosClient.get(url);
  }
}

const userApi = new UserApi();
export default userApi;

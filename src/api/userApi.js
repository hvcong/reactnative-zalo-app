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

  updateInfor(infor) {
    let url = "/me/profile";
    return axiosClient.put(url, infor);
  }

  getMyInfor() {
    let url = "me/profile";
    return axiosClient.get(url);
  }

  updatePassword(userId, newPass) {
    let url = "user/password/" + userId;
    return axiosClient.put(url, {
      password: newPass,
    });
  }
}

const userApi = new UserApi();
export default userApi;

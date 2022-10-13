import axiosClient from "./axiosClient";

class UserApi {
  //[POST] auth/login
  login = (phoneInput, pwdInput) => {
    const url = "auth/login";

    return axiosClient.post(url, {
      phoneNumber: phoneInput,
      password: pwdInput,
    });
  };

  register = (params) => {
    const url = "auth/register";
    return axiosClient.post(url, { params });
  };
}

const userApi = new UserApi();
export default userApi;

import axiosClient from "./axiosClient";

class AuthApi {
  //[POST] auth/login
  login = (phoneInput, pwdInput) => {
    const url = "auth/login";

    return axiosClient.post(url, {
      phoneNumber: phoneInput,
      password: pwdInput,
    });
  };

  //[GET] auth/login
  loginByToken = async (token) => {
    const url = "auth/login";

    return axiosClient.get(url, {
      headers: {
        token: "Bearer " + token,
      },
    });
  };
}

const authApi = new AuthApi();
export default authApi;

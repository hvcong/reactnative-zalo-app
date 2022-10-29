import { createContext, useContext, useEffect, useRef, useState } from "react";
import store from "..";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [state, setState] = useState({
    isLogout: true,
    token: null,
    isLoading: true,
    user: null,
  });

  const [modalProfile, setModalProfile] = useState({
    isShow: false,
    acc: null,
  });

  useEffect(() => {
    onLoadUser();
    return () => {};
  }, []);

  async function onLoadUser() {
    let res = await authApi.loginByToken();
    if (res.isSuccess) {
      onLoginSuccess(res);
    } else {
      // store.removeToken();
      setState({
        ...state,
        isLoading: false,
        token: null,
        user: null,
        isLogout: true,
      });
    }
  }

  async function onLoginSuccess(res) {
    const { accessToken, name, phoneNumber, isAdmin, avatar, _id } = res;
    store.setToken(accessToken);

    setState({
      ...state,
      user: {
        name,
        phoneNumber,
        isAdmin,
        avatar,
        _id,
      },
      token: accessToken,
      isLoading: false,
      isLogout: false,
    });
  }

  async function onLogout() {
    store.removeToken();

    setState({
      ...state,
      token: null,
      isLogout: true,
    });
  }

  // change infor
  async function updateInfor(infor) {
    try {
      const res = await userApi.updateInfor(infor);
      if (res.isSuccess) {
        console.log("update ok");
        if (
          modalProfile &&
          modalProfile.acc &&
          modalProfile.acc._id == state.user._id
        ) {
          const _user = await userApi.getMyInfor();
          setState({
            ...state,
            user: _user,
          });

          setModalProfile({
            ...modalProfile,
            acc: _user,
          });
        }

        return true;
      }
    } catch (error) {
      console.log("update error", error);
    }
  }

  const GlobalContextData = {
    isLoading: state.isLoading,
    isLogout: state.isLogout,
    token: state.token,
    user: state.user,
    onLogout,
    onLoginSuccess,
    modalProfile,
    setModalProfile,
    updateInfor,
  };

  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;

export function useGlobalContext() {
  return useContext(GlobalContext);
}

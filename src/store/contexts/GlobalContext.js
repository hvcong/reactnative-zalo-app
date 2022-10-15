import { createContext, useContext, useEffect, useState } from "react";
import { acc } from "react-native-reanimated";
import store from "..";
import authApi from "../../api/authApi";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [state, setState] = useState({
    isLogout: true,
    token: null,
    isLoading: true,
    user: null,
  });

  const GlobalContextData = {
    isLoading: state.isLoading,
    isLogout: state.isLogout,
    token: state.token,
    user: state.user,
    onLogout,
    onLoginSuccess,
  };

  useEffect(() => {
    onLoadUser();
    return () => {};
  }, []);

  async function onLoadUser() {
    let token = await store.getToken();
    if (token) {
      let res = await authApi.loginByToken(token);
      if (res.isSucess) {
        setState({
          ...state,
          isLoading: false,
          token: res.accessToken,
        });
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
    } else {
      // token in storage is exits
      setState({
        ...state,
        isLoading: false,
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
    console.log("logout");
    setState({
      ...state,
      token: null,
      user: null,
      isLogout: true,
    });
  }

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

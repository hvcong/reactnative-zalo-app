import { createContext, useContext, useEffect, useState } from "react";
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
  };

  useEffect(() => {
    onLoadUser();
    return () => {};
  }, []);

  async function onLoadUser() {
    setState({ ...state, isLoading: true });

    let token = await store.getToken();
    if (token) {
      let res = await authApi.checkToken(token);
      if (res.isSucess) {
      } else {
        // xoa item in storage

        // test
        setState({
          ...state,
          isLoading: false,
          token: "abc",
        });
      }
    }
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

import AsyncStorage from "@react-native-async-storage/async-storage";
const TOKEN__KEY = "TOKEN__KEY";

class Store {
  async getToken() {
    try {
      let data = await AsyncStorage.getItem(TOKEN__KEY);
      if (data != null) {
        return {
          is: true,
          data,
        };
      }

      return {
        is: false,
      };
    } catch (error) {
      return {
        is: false,
      };
    }
  }

  async setToken(tokenValue) {
    try {
      let data = await AsyncStorage.setItem(TOKEN__KEY, tokenValue);
      return {
        is: true,
        ...data,
      };
    } catch (err) {
      return { is: false };
    }
  }
}

const store = new Store();

export default store;

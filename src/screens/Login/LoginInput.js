import React, { useRef } from "react";
import { useState, useEffect } from "react";
const axios = require("axios").default;
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import Submit from "../../components/Login/Submit";
import PhoneInput from "../../components/Input/PhoneInput";
import PasswordInput from "../../components/Input/PasswordInput";
import userApi from "../../api/authApi";
import store from "../../store";
export default function LoginInput({ navigation }) {
  const [phoneInput, setPhoneInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [warnText, setWarnText] = useState("");

  const [isDisSubmit, setIsDisSubmit] = useState(true);
  navigation.navigate("TabBar");

  useEffect(() => {
    // enable submit login when user type done

    if (validate()) {
      setIsDisSubmit(false);
    } else {
      setIsDisSubmit(true);
    }
    return () => {};
  }, [phoneInput, pwdInput]);

  function validate() {
    let isCheck = true;
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    if (!vnf_regex.test(phoneInput)) {
      isCheck = false;
    }
    if (pwdInput == "") {
      isCheck = false;
    }

    return isCheck;
  }

  async function onSubmit() {
    try {
      const res = await userApi.login(phoneInput, pwdInput);
      if (res.isSuccess) {
        let result = await store.setToken(res.accessToken);
      }
      setWarnText("");
      navigation.navigate("TabBar");
    } catch (error) {
      setWarnText("Số điện thoại hoặc mật khẩu không chính xác!");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Vui lòng nhập số điện thoại và mật khẩu</Text>
      </View>
      <View style={styles.bodyContainer}>
        <PhoneInput phoneInput={phoneInput} setPhoneInput={setPhoneInput} />
        <PasswordInput value={pwdInput} setValue={setPwdInput} />
        <Text style={styles.warnText}>{warnText}</Text>
        <Text
          style={styles.textGetPwd}
          onPress={() => console.warn("Get back password press")}
        >
          Lấy lại mật khẩu
        </Text>
      </View>
      <Submit isDisSubmit={isDisSubmit} onSubmit={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  bodyContainer: {
    marginHorizontal: 16,
    flex: 1,
  },
  textContainer: {
    backgroundColor: "#eee",
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
  },
  inputContainer: {
    borderBottomWidth: 3,
    borderColor: "#0590f3",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingBottom: 2,
  },
  phone: {},
  password: {
    marginTop: 16,
  },
  icon: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  warnText: {
    paddingVertical: 10,
    color: "red",
  },
  textGetPwd: {
    fontWeight: "bold",
    paddingVertical: 8,
    marginVertical: 8,
    fontSize: 16,
    color: "#4aabf0",
  },
});

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import PasswordInput from "../../components/Input/PasswordInput";
import PhoneInput from "../../components/Input/PhoneInput";
import Submit from "../../components/Login/Submit";
import StringInput from "../../components/Input/StringInput";
import authApi from "../../api/authApi";
import LoadingModal from "../../components/LoadingModal";
import { useGlobalContext } from "../../store/contexts/GlobalContext";

const RegisterInput = ({ navigation }) => {
  const [phoneInput, setPhoneInput] = useState("0977377723");
  const [pwdInput, setPwdInput] = useState("1234567");
  const [nameInput, setnameInput] = useState("Cong Van Hoang");
  const [isDisSubmit, setIsDisSubmit] = useState(false);
  const [isWrongPhone, setisWrongPhone] = useState(false);
  const [isWrongName, setisWrongName] = useState(false);
  const [isWrongPwd, setisWrongPwd] = useState(false);
  const [phoneTextWar, setPhoneTextWar] = useState("");
  const [pwdTextWar, setPwdTextWar] = useState("");
  const [nameTextWar, setnameTextWar] = useState("");
  const [textErrRes, settextErrRes] = useState("");
  const [isLoadingModal, setisLoadingModal] = useState(false);
  const { onLoginSuccess } = useGlobalContext();
  const [modalLoadingText, setmodalLoadingText] = useState("Đang đăng kí...");

  async function onSubmit() {
    settextErrRes("");
    if (validate()) {
      setisLoadingModal(true);
      const res = await authApi.register({
        name: nameInput,
        phoneNumber: phoneInput,
        password: pwdInput,
      });

      if (!res.isSuccess) {
        setisLoadingModal(false);
        settextErrRes("Tài khoản đã tồn tại");
      } else {
        setmodalLoadingText("Đang đăng nhập...");
        const r2 = await authApi.login(phoneInput, pwdInput);
        setisLoadingModal(false);
        onLoginSuccess(r2);
      }
    }
  }

  useEffect(() => {
    setisWrongName(false);
    setnameTextWar("");

    return () => {};
  }, [nameInput]);

  useEffect(() => {
    setisWrongPhone(false);
    setPhoneTextWar("");

    return () => {};
  }, [phoneInput]);

  useEffect(() => {
    setisWrongPwd(false);
    setPwdTextWar("");

    return () => {};
  }, [pwdInput]);

  function validate() {
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let is = true;

    if (!vnf_regex.test(phoneInput.trim())) {
      setPhoneTextWar("Số điện thoại không hợp lệ");
      setisWrongPhone(true);
      is = false;
    }
    if (
      nameInput.trim() == "" ||
      nameInput.trim().length < 4 ||
      nameInput.trim().length > 40
    ) {
      setnameTextWar("Tên không hợp lệ, từ 4-40 kí tự");
      setisWrongName(true);
      is = false;
    }

    if (pwdInput.trim() == "" || pwdInput.trim().length < 6) {
      setPwdTextWar("Mật khẩu phải từ 6-40 kí tự");
      setisWrongPwd(true);
      is = false;
    }

    return is;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textErrRes}>{textErrRes}</Text>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ và tên</Text>
          <StringInput
            isWrong={isWrongName}
            value={nameInput}
            setValue={setnameInput}
            hint={"Họ và tên"}
          />

          <Text style={styles.errText}>{nameTextWar}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <PhoneInput
            isWrong={isWrongPhone}
            phoneInput={phoneInput}
            setPhoneInput={setPhoneInput}
          />
          <Text style={styles.errText}>{phoneTextWar}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <PasswordInput
            isWrong={isWrongPwd}
            value={pwdInput}
            setValue={setPwdInput}
          />
          <Text style={styles.errText}>{pwdTextWar}</Text>
        </View>
      </View>
      <Submit isDisSubmit={isDisSubmit} onSubmit={onSubmit} />
      <LoadingModal visible={isLoadingModal} text={modalLoadingText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textErrRes: {
    padding: 8,
    color: "red",
    textAlign: "center",
    backgroundColor: "#eee",
    fontSize: 15,
  },
  body: {
    paddingHorizontal: 12,
    flex: 1,
  },

  label: {
    fontSize: 18,
    marginTop: 8,
    paddingBottom: 8,
    color: "#1b1d1e",
  },
  errText: {
    paddingTop: 6,
    color: "red",
  },
});

export default RegisterInput;

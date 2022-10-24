import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PasswordInput from "../../components/Input/PasswordInput";
import PhoneInput from "../../components/Input/PhoneInput";
import Submit from "../../components/Login/Submit";
import StringInput from "../../components/Input/StringInput";
import authApi from "../../api/authApi";
import LoadingModal from "../../components/LoadingModal";
import { useGlobalContext } from "../../store/contexts/GlobalContext";

// import auth from "@react-native-firebase/auth";
// console.log(auth);

// import {
//   FirebaseRecaptchaVerifierModal,
//   FirebaseRecaptchaBanner,
// } from "expo-firebase-recaptcha";
// import { initializeApp, getApp } from "firebase/app";
// import {
//   getAuth,
//   PhoneAuthProvider,
//   signInWithCredential,
// } from "firebase/auth";

// try {
//   initializeApp({
//     apiKey: "AIzaSyDTitbaB9Uh920_HCBiSrJfWQr71_Yt570",
//     authDomain: "gavroche-chat-auth.firebaseapp.com",
//     projectId: "gavroche-chat-auth",
//     storageBucket: "gavroche-chat-auth.appspot.com",
//     messagingSenderId: "190776827437",
//     appId: "1:190776827437:web:cdd475007e738bb03da2a4",
//     measurementId: "G-VJK7FP2M06",
//   });
// } catch (err) {
//   console.log(err);
// }

// const app = getApp();
// const auth = getAuth(app);

const RegisterInput = ({ navigation }) => {
  const [phoneInput, setPhoneInput] = useState("09991111110");
  const [pwdInput, setPwdInput] = useState("1234567");
  const [nameInput, setnameInput] = useState("Lê Hồng Phong");
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

  // const recaptchaVerifier = useRef(null);
  // const [OTP, setOTP] = useState();
  // const [verificationId, setVerificationId] = useState();

  // const firebaseConfig = app ? app.options : undefined;
  // const attemptInvisibleVerification = false;

  // const sendVertification = async () => {
  //   try {
  //     const phoneProvider = new PhoneAuthProvider(auth);
  //     const verificationId = await phoneProvider.verifyPhoneNumber(
  //       phoneInput,
  //       recaptchaVerifier.current
  //     );
  //     setVerificationId(verificationId);
  //     // setPhoneInput('');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //
  // const confirmCode = async () => {
  //   try {
  //     const credential = PhoneAuthProvider.credential(verificationId, OTP);
  //     await signInWithCredential(auth, credential);
  //     console.log("comfirm successfull");
  //   } catch (error) {
  //     console.log("failed");
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification
      /> */}
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
        {/* <TouchableOpacity style={styles.touch} onPress={sendVertification}>
          <Text style={styles.label}>send vertification</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="OTP"
          onChangeText={setOTP}
          keyboardType="number-pad"
        />
        <TouchableOpacity style={styles.touch} onPress={confirmCode}>
          <Text style={styles.label}>confirm code</Text>
        </TouchableOpacity> */}
      </View>
      <Submit isDisSubmit={isDisSubmit} onSubmit={onSubmit} />
      <LoadingModal visible={isLoadingModal} text={modalLoadingText} />
      {/* {attemptInvisibleVerification && <FirebaseRecaptchaBanner />} */}
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
  touch: {
    backgroundColor: "skyblue",
  },
});

export default RegisterInput;

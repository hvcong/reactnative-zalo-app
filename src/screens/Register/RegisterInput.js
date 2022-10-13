import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import PhoneInput from "../../components/Input/PhoneInput";
import Submit from "../../components/Login/Submit";

const RegisterInput = ({ navigation }) => {
  const [phoneInput, setPhoneInput] = useState("");

  const [isDisSubmit, setIsDisSubmit] = useState(true);

  useEffect(() => {
    if (phoneInput) {
      setIsDisSubmit(false);
    } else {
      setIsDisSubmit(true);
    }
    return () => {};
  }, [phoneInput]);

  function onSubmit() {
    console.warn("submit btn");
    navigation.navigate("RegisterNameInput");
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Nhập số điện thoại của bạn để tạo tài khoản mới
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <PhoneInput phoneInput={phoneInput} setPhoneInput={setPhoneInput} />
      </View>
      <Submit
        isDisSubmit={isDisSubmit}
        setIsDisSubmit={setIsDisSubmit}
        onSubmit={onSubmit}
        style={styles.submit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bodyContainer: {
    marginHorizontal: 20,
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
  bodyContainer: {
    marginHorizontal: 24,
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
  submit: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default RegisterInput;

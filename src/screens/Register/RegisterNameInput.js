import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import StringInput from "../../components/Input/StringInput";
import Submit from "../../components/Login/Submit";

const RegisterNameInput = () => {
  const [nameInput, setNameInput] = useState("");
  const [isDisSubmit, setIsDisSubmit] = useState(true);

  useEffect(() => {
    if (nameInput) {
      setIsDisSubmit(false);
    } else {
      setIsDisSubmit(true);
    }
    return () => {};
  }, [nameInput]);

  function onSubmit() {
    console.warn("submit");
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.label}>Tên Zalo</Text>
        <StringInput
          value={nameInput}
          setValue={setNameInput}
          hint={"Gồm 2-40 kí tự"}
        />
        <View style={styles.noteContainer}>
          <Text style={styles.titleNote}>Lưu ý khi đặt tên:</Text>
          <Text style={styles.itemNote}>
            - Nên sử dụng tên thật để giúp bạn bè dễ nhận ra bạn
          </Text>
          <Text style={styles.itemNote}>
            - Không được sử dụng kí tự đặc biệt, chữ số
          </Text>
        </View>
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
    backgroundColor: "#ddd",
  },
  bodyContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  label: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  noteContainer: {
    marginTop: 20,
    fontSize: 18,
  },
  titleNote: {
    fontSize: 17,
  },
  itemNote: {
    fontSize: 17,
    marginTop: 8,
    paddingLeft: 16,
  },
  submit: {},
});

export default RegisterNameInput;

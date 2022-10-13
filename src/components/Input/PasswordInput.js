import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

const PasswordInput = ({ value, setValue, hint, style }) => {
  const [isHidePwd, setIsHidePwd] = useState(true);
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={hint ? hint : "Mật khẩu"}
        secureTextEntry={isHidePwd}
      />
      <Feather
        name={isHidePwd ? "eye-off" : "eye"}
        size={24}
        color="black"
        style={styles.icon}
        onPress={() => setIsHidePwd(!isHidePwd)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 3,
    borderColor: "#0590f3",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  input: {
    flex: 1,
    fontSize: 17,
    paddingBottom: 2,
  },
});

export default PasswordInput;

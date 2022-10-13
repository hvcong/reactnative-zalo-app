import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const PhoneInput = ({ phoneInput, setPhoneInput, style }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        value={phoneInput}
        onChangeText={setPhoneInput}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Số điện thoại"
      />
      {phoneInput && (
        <EvilIcons
          name="close"
          size={28}
          color="black"
          style={styles.icon}
          onPress={() => setPhoneInput("")}
        />
      )}
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
    fontSize: 16,
    paddingBottom: 2,
    fontSize: 17,
  },
});

export default PhoneInput;

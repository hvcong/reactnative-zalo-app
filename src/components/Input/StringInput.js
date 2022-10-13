import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const StringInput = ({ value, setValue, style, hint }) => {
  return (
    <View style={style}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholder={hint}
        />
      </View>
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

export default StringInput;

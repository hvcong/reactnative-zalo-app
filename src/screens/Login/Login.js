import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Login({ navigation }) {
  function onLogin() {}
  function onRegister() {
    navigation.navigate("RegisterInput");
  }

  return (
    <View style={s.container}>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../assets/logo.svg.png")}
          style={s.logo}
        />
      </View>
      <View
        style={{
          flex: 2,
        }}
      >
        <TouchableOpacity style={[s.btn, s.btnLogin]} onPress={onLogin}>
          <Text
            style={{
              textTransform: "uppercase",
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[s.btn, s.btnRegister]} onPress={onRegister}>
          <Text
            style={{
              textTransform: "uppercase",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Đăng Kí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  btn: {
    width: 250,
    borderRadius: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    margin: 12,
  },
  btnLogin: {
    backgroundColor: "#0590f3",
  },
  btnRegister: {
    backgroundColor: "#eee",
  },
  logo: {
    width: 200,
    resizeMode: "contain",
  },
});

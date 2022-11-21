import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";

const ReactModal = ({ isShowModal, setisShowModal, message }) => {
  return (
    <Modal visible={isShowModal} transparent={true}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={styles.message}>
              <Text style={styles.senderName}>cong</Text>
              <Text style={styles.content}>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Text>
              <Text style={styles.time}>14:22</Text>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>

          <View style={styles.reactList}></View>
          <View style={styles.options}></View>
        </View>
        <Text onPress={() => setisShowModal(false)}>close</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  body: {
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  message: {
    backgroundColor: "white",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: "#1a69d9",
  },
  senderName: {
    color: "#bd6d29",
  },
  content: {
    fontSize: 17,
    textAlign: "justify",
  },
  time: {
    paddingTop: 8,
    color: "#666",
  },
  reactList: {},
  options: {},
});

export default ReactModal;

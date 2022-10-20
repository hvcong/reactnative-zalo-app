import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";

const ReactModal = ({ isShowModal, setisShowModal }) => {
  return (
    <Modal visible={isShowModal} transparent={true}>
      <View style={styles.container}>
        <View style={styles.body}></View>
        <Text onPress={() => setisShowModal(false)}>close</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default ReactModal;

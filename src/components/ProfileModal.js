import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Image,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import { useGlobalContext } from "../store/contexts/GlobalContext";
import { AntDesign } from "@expo/vector-icons";
import userApi from "../api/userApi";

const ProfileModal = () => {
  const { modalProfile, setModalProfile } = useGlobalContext();
  const { user } = useGlobalContext();
  const [acc, setAcc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(modalProfile);
    // if (modalProfile._id) {
    //   loadAcc();
    // } else {
    //   setModalProfile({
    //     isShow: false,
    //   });
    // }

    async function loadAcc() {
      try {
        console.log(modalProfile._id);
        const acc = await userApi.findUserById(modalProfile._id);
        if (acc.isSuccess) {
          setIsLoading(false);
          setAcc(acc);
        }
      } catch (error) {
        console.log("load acc err", error);
      }
    }
    return () => {};
  }, [modalProfile]);

  return (
    <Modal visible={modalProfile.isShow} transparent={true}>
      <View style={styles.wrap}>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color={"#0000ff"} />
          ) : (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Thông tin tài khoản</Text>
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  onPress={() =>
                    setModalProfile({
                      ...modalProfile,
                      isShow: false,
                    })
                  }
                />
              </View>
              <View style={styles.avatarContainer}>
                <Image
                  source={require("../../assets/avatar.jpg")}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>Hoang van cong</Text>
                <TextInput />
              </View>
              <View style={styles.btns}>
                <Text style={styles.btn}>Kết bạn</Text>
                <Text style={styles.btn}>Nhắn tin</Text>
              </View>
              <View style={styles.body}>
                <View style={styles.bodyItem}>
                  <Text style={styles.bodyTitle}>Thông tin cá nhân</Text>
                </View>
                <View style={styles.bodyItem}>
                  <Text style={styles.bodyLabel}>Giới tính</Text>
                  <Text style={styles.bodyValue}>Nam</Text>
                </View>
                <View style={styles.bodyItem}>
                  <Text style={styles.bodyLabel}>Ngày sinh</Text>
                  <Text style={styles.bodyValue}>10/1/1</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    width: "85%",
    height: "80%",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 4,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameContainer: {},
  name: {},
  btns: {
    flexDirection: "row",
  },
  btn: {
    paddingVertical: 8,
    flex: 1,
    textAlign: "center",
    backgroundColor: "#ddd",
    marginHorizontal: 8,
    borderRadius: 4,
  },
  body: {
    paddingVertical: 12,
  },
  bodyTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bodyItem: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  bodyLabel: {
    width: 100,
    color: "#555",
  },
  bodyValue: {},
});

export default ProfileModal;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import {
  Ionicons,
  Feather,
  AntDesign,
  SimpleLineIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const RoomChatGroupMore = () => {
  const [isNotify, setisNotify] = useState(false);
  const [isEditName, setisEditName] = useState(false);
  const [nameInput, setnameInput] = useState("aaaaaa");

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarWrap}>
          <Image
            source={require("../../../assets/avatar.jpg")}
            style={styles.avatar}
          />
          <Ionicons
            style={styles.iconCamera}
            name="camera-outline"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View style={styles.nameContainer}>
        {!isEditName ? (
          <>
            <Text style={styles.name}>Đại học công nghiệp</Text>
            <FontAwesome5
              name="pencil-alt"
              style={styles.penIcon}
              size={18}
              color="black"
              onPress={() => {
                setisEditName(true);
              }}
            />
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={nameInput}
              onChangeText={setnameInput}
            />
            <Text
              onPress={() => setisEditName(false)}
              style={styles.btnSaveName}
            >
              Lưu
            </Text>
          </>
        )}
      </View>
      <View style={styles.sections}>
        <Pressable style={styles.section}>
          <View style={styles.sectionIcon}>
            <Ionicons name="image-outline" size={20} color="black" />
          </View>
          <Text style={styles.label}>Đổi hình nền</Text>
        </Pressable>
        <Pressable style={styles.section}>
          <View style={styles.sectionIcon}>
            <Ionicons name="ios-person-add-outline" size={20} color="black" />
          </View>
          <Text style={styles.label}>Thêm thành viên</Text>
        </Pressable>
        <Pressable
          onPress={() => setisNotify(!isNotify)}
          style={styles.section}
        >
          {!isNotify ? (
            <>
              <View style={styles.sectionIcon}>
                <Ionicons
                  name="notifications-off-outline"
                  size={20}
                  color="black"
                />
              </View>
              <Text style={styles.label}>Bật thông báo</Text>
            </>
          ) : (
            <>
              <View style={styles.sectionIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="black"
                />
              </View>
              <Text style={styles.label}>Tắt thông báo</Text>
            </>
          )}
        </Pressable>
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <Ionicons name="md-people-outline" size={24} color="black" />
          <Text style={styles.text}>Xem thành viên (16)</Text>
        </View>

        <View style={styles.item}>
          <AntDesign name="pushpino" size={24} color="black" />
          <Text style={styles.text}>Tin nhắn đã gim</Text>
        </View>

        <View style={styles.item}>
          <Feather name="trash-2" size={24} color="red" />
          <Text style={[styles.text, styles.removeText]}>
            Xóa lịch sử trò chuyện
          </Text>
        </View>
        <View style={styles.item}>
          <SimpleLineIcons name="logout" size={24} color="red" />
          <Text style={[styles.text, styles.removeText]}>Rời nhóm</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconCamera: {
    position: "absolute",
    bottom: 2,
    right: -4,
    padding: 4,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  penIcon: {
    paddingHorizontal: 12,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 250,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  btnSaveName: {
    marginLeft: 12,
    backgroundColor: "#1a69d9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    color: "white",
  },
  sections: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
  },

  section: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  sectionIcon: {
    height: 32,
    width: 32,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
  },
  body: {
    borderTopColor: "#eee",
    borderTopWidth: 8,
  },
  item: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  text: {
    marginLeft: 12,
  },
  removeText: {
    color: "red",
  },
});

export default RoomChatGroupMore;
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AddGroupItem from "./components/AddGroupItem";
import * as ImagePicker from "expo-image-picker";
import { HeaderBackButton } from "@react-navigation/stack";

const AddGroupChat = (props) => {
  const { navigation, route } = props;

  const [isSubmitActive, setisSubmitActive] = useState(true);
  const [image, setImage] = useState(null);

  async function onPickImage() {
    console.log("pick");
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.image} onPress={onPickImage}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Ionicons name="md-camera-sharp" size={24} color="black" />
          )}
        </Pressable>
        <TextInput style={styles.nameInput} placeholder={"Đặt tên nhóm"} />
        <Text
          style={[styles.btnSubmit, isSubmitActive && styles.btnSubmitActive]}
        >
          Tạo nhóm
        </Text>
      </View>
      <View style={styles.search}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder={"Tìm số điện thoại"}
        />
      </View>
      <Text style={styles.numOfSelected}>Đã chọn 8</Text>
      <View style={styles.list}>
        <AddGroupItem />
        <AddGroupItem />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  image: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
    borderRadius: 50,
  },
  nameInput: {
    padding: 12,
    fontSize: 15,
    flex: 1,
  },
  btnSubmit: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 20,
  },

  btnSubmitActive: {
    backgroundColor: "#1a69d9",
    color: "white",
  },
  search: {
    flexDirection: "row",
    backgroundColor: "#eee",
    marginHorizontal: 12,
    marginTop: 8,
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 15,
  },
  numOfSelected: {
    padding: 12,
    fontSize: 15,
    fontWeight: "bold",
    borderBottomWidth: 4,
    borderBottomColor: "#eee",
  },
  list: {},
});

export default AddGroupChat;

import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useGlobalContext } from "../../store/contexts/GlobalContext";

const ImageMessage = (props) => {
  const { item } = props;
  const { user } = useGlobalContext();
  let isMyMessage = user._id == item.senderId;
  console.log(isMyMessage);

  return (
    <View style={styles.container}>
      <View style={[isMyMessage ? styles.bodyOfMyMessage : styles.body]}>
        <Image source={{ uri: item.content }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    flex: 1,
    maxWidth: "75%",
    minWidth: "35%",
  },
  bodyOfMyMessage: {
    marginLeft: "auto",
    flex: 1,
    maxWidth: "75%",
    minWidth: "35%",
  },
  image: {
    height: 200,
    width: 250,
    resizeMode: "contain",
  },
});

export default ImageMessage;

import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import FriendsModal from "./FriendsModal";

const Stack = createStackNavigator();

const Friends = () => {
  const [isModalShow, setIsModalShow] = useState(false);

  return (
    <View>
      <Text>Friends screen</Text>
      <Pressable
        onPress={() => {
          setIsModalShow(true);
        }}
      >
        <Text>Open modal</Text>
      </Pressable>
      <FriendsModal isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Friends;

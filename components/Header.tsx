import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const Header = ({ title = "Title" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color: Colors.dark.text,
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 30,
  },
});

export default Header;

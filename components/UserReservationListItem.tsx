import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UserReservationListItem = ({ item }: any) => {
  return (
    <Link href={`/reservations/${item.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.image}>
          <MaterialCommunityIcons
            name="order-bool-descending"
            size={75}
            color={Colors.dark.text}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.restaurant_name}</Text>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}>Status</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  textContainer: {
    paddingStart: 20,
    justifyContent: "center",
    gap: 5,
  },
  text: {
    color: Colors.dark.text,
  },
  image: {
    width: "20%",
    aspectRatio: 1,
  },
});

export default UserReservationListItem;

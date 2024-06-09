import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const ReservationListItem = ({ item }: any) => {
  const getStatus = (status) => {
    if (status == 0) {
      return <AntDesign name="loading1" size={15} color={Colors.dark.text} />;
    }
    if (status == 1) {
      return <AntDesign name="check" size={15} color={Colors.dark.text} />;
    }
    if (status == 2) {
      return <Entypo name="cross" size={15} color={Colors.dark.text} />;
    } else {
      return <AntDesign name="question" size={15} color={Colors.dark.text} />;
    }
  };

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
          <Text style={styles.text}>
            Date: {item.date} Time: {item.arive_time.substring(0, 5)} -{" "}
            {item.leave_time.substring(0, 5)}
          </Text>
          <Text style={styles.text}>Status: {getStatus(item.status)}</Text>
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

export default ReservationListItem;

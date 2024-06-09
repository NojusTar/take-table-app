import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import StoredImage from "./StoredImage";

const UserRestaurantListItem = ({ restaurant }: any) => {
  return (
    <Link
      href={`/(tabs)/user/(restaurantManagment)/(manageRestaurants)/${restaurant.id}`}
      asChild
    >
      <Pressable style={styles.container}>
        <View style={styles.imageContainer}>
          {restaurant.image ? (
            <StoredImage path={restaurant.image} style={styles.image} />
          ) : (
            <Entypo name="shop" size={150} color={Colors.dark.text} />
          )}
        </View>
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.info}>{restaurant.location}</Text>
          <Text style={styles.info}>
            {restaurant.open_time} - {restaurant.close_time}
          </Text>
          <View style={styles.maxPeople}>
            <AntDesign name="user" size={20} color={Colors.dark.textTint} />
            <Text style={styles.info}>1</Text>
            <Text style={styles.info}>-</Text>
            <AntDesign name="user" size={20} color={Colors.dark.textTint} />
            <Text style={styles.info}>{restaurant.max_people}</Text>
          </View>
          <Text style={styles.info}>{restaurant.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  imageContainer: {
    width: "40%",
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.dark.textTint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    color: Colors.dark.text,
    paddingBottom: 5,
  },
  info: {
    color: Colors.dark.textTint,
  },
  maxPeople: {
    flexDirection: "row",
    gap: 5,
  },
});

export default UserRestaurantListItem;

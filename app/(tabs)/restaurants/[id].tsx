import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { Link, router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";
import { AntDesign, Entypo } from "@expo/vector-icons";
import StoredImage from "@/components/StoredImage";
import { useAuth } from "@/provider/AuthProvider";

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchRestaurant = async () => {
      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();

      setRestaurant(data);
    };
    fetchRestaurant();

    setLoading(false);
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const getLink = (session) => {
    if (session) {
      return `/restaurants/reserveTable`;
    } else {
      return "/auth";
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {restaurant?.image ? (
            <StoredImage path={restaurant?.image} style={styles.image} />
          ) : (
            <Entypo name="shop" size={300} color={Colors.dark.text} />
          )}
        </View>
        <Text style={styles.title}>{restaurant?.name}</Text>
        <View>
          <Text style={styles.subTitle}>Location</Text>
          <Text style={styles.description}>{restaurant?.location}</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>Working time</Text>
          <Text style={styles.description}>
            {restaurant?.open_time} - {restaurant?.close_time}
          </Text>
        </View>
        <View>
          <Text style={styles.subTitle}>Group size</Text>
          <View style={styles.maxPeople}>
            <AntDesign name="user" size={20} color={Colors.dark.textTint} />
            <Text style={styles.description}>1</Text>
            <Text style={styles.description}>-</Text>
            <AntDesign name="user" size={20} color={Colors.dark.textTint} />
            <Text style={styles.description}>{restaurant?.max_people}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Description</Text>
          <Text style={styles.description}>{restaurant?.description}</Text>
        </View>

        <Pressable
          style={styles.reserve}
          onPress={() => {
            router.push({
              pathname: `/restaurants/reserveTable?id=${restaurant.id}`,
            });
          }}
        >
          <Text style={styles.reserveText}>
            {session ? "Reserve table here" : "You need to login"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: Colors.dark.background,
    gap: 10,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1.3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.textTint,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1.3,
    borderRadius: 12,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 25,
  },
  subTitle: {
    color: Colors.dark.text,
    fontSize: 20,
  },
  description: {
    color: Colors.dark.text,
    fontSize: 16,
  },
  maxPeople: {
    flexDirection: "row",
    gap: 5,
  },

  reserve: {
    position: "absolute",
    width: "100%",
    bottom: 10,
    marginStart: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.dark.backgroundTint,
    justifyContent: "center",
    alignItems: "center",
  },
  reserveText: {
    color: Colors.dark.text,
    fontSize: 20,
  },
});

export default RestaurantDetails;

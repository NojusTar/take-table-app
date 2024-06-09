import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/provider/AuthProvider";
import UserRestaurantListItem from "@/components/UserRestaurantListItem";

const index = () => {
  const [restaurants, setRestaurants] = useState<any>();
  const { session } = useAuth();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("restaurant_owner", session?.user.id);
      console.log(error);
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="Your restaurants" />
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <UserRestaurantListItem restaurant={item} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 10,
    gap: 10,
  },
});

export default index;

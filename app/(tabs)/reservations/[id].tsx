import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

const detailedReservation = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchReservation = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      setReservation(data);
    };
    fetchReservation();

    setLoading(false);
  }, []);

  const getStatus = (status) => {
    if (status == 0) {
      return "Pending";
    }
    if (status == 1) {
      return "Accepted";
    }
    if (status == 2) {
      return "Canceled";
    } else {
      return "Something went wrong";
    }
  };

  console.log("reservation:", reservation);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.text, { fontSize: 40 }]}>Reservation</Text>
        <Text style={[styles.text, { fontSize: 40 }]}>#{reservation?.id}</Text>
        <Text style={styles.text}>
          Status: {getStatus(reservation?.status)}
        </Text>

        <Text style={styles.text}>{reservation?.restaurant_name}</Text>
        <Text style={styles.text}>Date: {reservation?.date}</Text>
        <Text style={styles.text}>
          Time: {reservation?.arive_time} - {reservation?.leave_time}
        </Text>
        <Text style={styles.text}>Group size</Text>
        <Text style={[styles.text, { fontSize: 40 }]}>
          {reservation?.people_size}
        </Text>
        <Text style={styles.text}>Table Number</Text>
        <Text style={[styles.text, { fontSize: 40 }]}>
          {reservation?.table}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    color: Colors.dark.text,
    fontSize: 26,
  },
});

export default detailedReservation;

import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";

const manageReservations = () => {
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

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Accept</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Decline</Text>
          </Pressable>
        </View>
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

  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.dark.foreground,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
});

export default manageReservations;

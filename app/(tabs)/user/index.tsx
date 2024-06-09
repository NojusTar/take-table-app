import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Header from "@/components/Header";
import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/utils/supabase";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";

const index = () => {
  // ! test stuff //////////////////////////////////////////////////////////////////
  // const test = true;
  // if (test) {
  //   return <Redirect href={"/user/addRestaurant"} />;
  // }

  const { session } = useAuth();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          title={session?.user.email.split("@")[0].trim().toUpperCase()}
        />

        <Link href={"/(tabs)/user/(restaurantManagment)"} asChild>
          <Pressable style={styles.button}>
            <Feather name="log-out" size={30} color={Colors.dark.text} />
            <Text style={styles.buttonText}>Manage restaurants</Text>
          </Pressable>
        </Link>

        <Link href={"/user/addRestaurant"} asChild>
          <Pressable style={styles.button}>
            <Ionicons
              name="restaurant-outline"
              size={30}
              color={Colors.dark.text}
            />
            <Text style={styles.buttonText}>Add your restaurant</Text>
          </Pressable>
        </Link>

        <Pressable
          style={styles.button}
          onPress={() => supabase.auth.signOut()}
        >
          <Feather name="log-out" size={30} color={Colors.dark.text} />
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
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
  button: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.dark.text,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginVertical: 3,
  },
  buttonText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
});

export default index;

import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { supabase } from "@/utils/supabase";

const index = () => {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Link href={"/auth/login"} asChild>
          <Pressable style={styles.signin}>
            <Text style={styles.pressableBtn}>Log in</Text>
          </Pressable>
        </Link>

        <View style={styles.singup}>
          <Link style={styles.pressableBtn} href={"/auth/signup"}>
            <Text>Create account</Text>
          </Link>
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
    gap: 10,
    justifyContent: "center",
  },
  signin: {
    backgroundColor: Colors.dark.foreground,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  singup: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressableBtn: {
    color: Colors.dark.text,
    fontSize: 20,
  },
});

export default index;

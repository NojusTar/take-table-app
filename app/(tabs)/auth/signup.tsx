import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Header from "@/components/Header";
import { Link } from "expo-router";
import { supabase } from "@/utils/supabase";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="Sign Up" />
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="email@gmail.com"
              placeholderTextColor={Colors.dark.textTint}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor={Colors.dark.textTint}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.bottom}>
            <View style={{ flexDirection: "row", columnGap: 5 }}>
              <Text style={styles.text}>Already have an account?</Text>
              <Link href={"/auth/login"} style={styles.link}>
                Login
              </Link>
            </View>
            <Pressable onPress={signUpWithEmail} style={styles.loginBtn}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.text}>Sign Up</Text>
              )}
            </Pressable>
          </View>
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
  },
  text: {
    color: Colors.dark.text,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    paddingStart: 5,
    borderColor: Colors.dark.text,
    borderRadius: 5,
    fontSize: 16,
    paddingVertical: 5,
    color: Colors.dark.text,
  },
  inputContainer: {
    gap: 10,
  },
  label: {
    color: Colors.dark.text,
    fontSize: 20,
  },
  bottom: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: Colors.dark.link,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: Colors.dark.foreground,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
});

export default signup;

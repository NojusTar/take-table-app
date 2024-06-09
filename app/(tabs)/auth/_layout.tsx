import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";

const AuthLayout = () => {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/user/"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;

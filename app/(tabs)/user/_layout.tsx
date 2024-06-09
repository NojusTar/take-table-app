import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";

const userLayout = () => {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/auth/"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(restaurantManagment)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default userLayout;

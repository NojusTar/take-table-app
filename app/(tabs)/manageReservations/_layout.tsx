import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const manageReservationsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
};

export default manageReservationsLayout;

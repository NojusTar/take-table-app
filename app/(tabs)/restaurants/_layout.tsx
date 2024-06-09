import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const RestaurantLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="reserveTable"
        options={{
          title: "Select the date",
          presentation: "modal",
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: Colors.dark.text,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 35,
          },
        }}
      />
    </Stack>
  );
};

export default RestaurantLayout;

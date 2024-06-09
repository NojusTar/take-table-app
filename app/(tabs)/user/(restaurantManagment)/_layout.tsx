import React from "react";
import { Stack } from "expo-router";

const userRestaurantLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="addRestaurant" options={{ headerShown: false }} />
      <Stack.Screen
        name="(manageRestaurants)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default userRestaurantLayout;

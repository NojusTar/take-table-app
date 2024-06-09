import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
        tabBarInactiveTintColor: Colors.dark.textTint,
        tabBarActiveTintColor: Colors.dark.text,
        tabBarStyle: {
          borderWidth: 0,
          borderColor: Colors.dark.backgroundTint,
          backgroundColor: Colors.dark.backgroundTint,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="restaurants"
        options={{
          headerShown: false,
          title: "Restaurants",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reservations"
        options={{
          headerShown: false,
          title: "Reservations",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-alt" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          headerShown: false,
          title: "User",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          href: null,
          headerShown: false,
          title: "Auth",
        }}
      />
      <Tabs.Screen
        name="manageReservations"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

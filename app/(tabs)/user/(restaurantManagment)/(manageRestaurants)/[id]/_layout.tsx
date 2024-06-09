import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EditRestaurant from "./editRestaurant";
import restaurantReservations from "./restaurantReservations";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";

const Tab = createMaterialTopTabNavigator();

const restaurantManagmentLayout = () => {
  const { id } = useLocalSearchParams();

  console.log(id);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="restaurantReservations"
          component={restaurantReservations}
          options={{ title: "Reservations" }}
        />
        <Tab.Screen
          name="editRestaurant"
          component={EditRestaurant}
          options={{ title: "Edit restaurant" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default restaurantManagmentLayout;

import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Header from "@/components/Header";
import ReservationListItem from "@/components/ReservationListItem";

export default function TabTwoScreen() {
  const { session } = useAuth();
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState();
  const [oldOrders, setOldOrders] = useState();

  useEffect(() => {
    const fetchUserOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", session?.user.id);

      setOrders(data);
    };
    if (session) {
      fetchUserOrders();
    }
  }, [session]);

  useEffect(() => {
    if (orders.length > 0) {
      const activeOrders = orders.filter(
        (order) => order.status == 0 || order.status == 1
      );
      const completedOrders = orders.filter(
        (order) => order.status == 2 || order.status == 3
      );

      setNewOrders(activeOrders);
      setOldOrders(completedOrders);
    }
  }, [orders]);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="Orders" />
        {session ? (
          <>
            <View style={{ height: 300 }}>
              <Text style={styles.text}>Active</Text>
              {orders.length < 1 ? (
                <Text style={styles.text}>You have no orders yet</Text>
              ) : (
                <FlatList
                  data={newOrders}
                  renderItem={({ item }) => <ReservationListItem item={item} />}
                />
              )}
            </View>

            <View>
              <Text style={styles.text}>Older</Text>
              {orders.length < 1 ? (
                <Text style={styles.text}>You have no orders yet</Text>
              ) : (
                <FlatList
                  data={oldOrders}
                  renderItem={({ item }) => <ReservationListItem item={item} />}
                />
              )}
            </View>
          </>
        ) : (
          <View>
            <Header title="You must login to see the reservations" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 10,
    gap: 10,
  },
  text: {
    color: Colors.dark.text,
    fontSize: 16,
  },
});

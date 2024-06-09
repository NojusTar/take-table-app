import { FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Header from "@/components/Header";
import { AntDesign } from "@expo/vector-icons";
import RestaurantListItem from "@/components/RestaurantListItem";
import { Dropdown } from "react-native-element-dropdown";
import { Redirect } from "expo-router";

export default function TabOneScreen() {
  const [restaurants, setRestaurants] = useState<any>();
  const [filteredR, setFilteredR] = useState<any>();
  const [filter, setFilter] = useState<any>();
  const [peopleSize, setPeopleSize] = useState(null);

  const data = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
  ];

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from("restaurants").select("*");
      if (error) {
        console.error(error);
      } else {
        setRestaurants(data);
        setFilteredR(data);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const filteredData = restaurants?.filter((restaurant) => {
      return (
        (!filter ||
          restaurant.name.toLowerCase().includes(filter.toLowerCase())) &&
        (!peopleSize || restaurant.max_people >= peopleSize)
      );
    });
    setFilteredR(filteredData);
  }, [filter, peopleSize, restaurants]);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="Restaurants" />

        <View style={styles.row}>
          <View style={styles.filter}>
            <AntDesign name="search1" size={20} color={Colors.dark.textTint} />
            <TextInput
              style={styles.search}
              placeholder="Search restaurants"
              placeholderTextColor={Colors.dark.textTint}
              value={filter}
              onChangeText={setFilter}
            />
          </View>

          <Dropdown
            data={data}
            style={styles.dropdown}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={peopleSize}
            placeholder={"1"}
            selectedTextStyle={{ color: Colors.dark.textTint }}
            placeholderStyle={{ color: Colors.dark.textTint }}
            onChange={(item) => {
              setPeopleSize(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign name="user" size={20} color={Colors.dark.textTint} />
            )}
          />
        </View>

        <FlatList
          data={filteredR}
          renderItem={({ item }) => <RestaurantListItem restaurant={item} />}
        />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  row: { flexDirection: "row", gap: 10 },

  filter: {
    backgroundColor: Colors.dark.foreground,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
  search: {
    fontSize: 16,
    color: Colors.dark.text,
    paddingHorizontal: 10,
    flex: 1,
  },

  dropdown: {
    borderRadius: 12,
    paddingHorizontal: 8,
    width: 67,
    backgroundColor: Colors.dark.foreground,
    borderColor: Colors.dark.foreground,
  },

  peopleSizeWrapper: {
    backgroundColor: Colors.dark.foreground,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 5,
  },
  peopleSizeText: {
    color: Colors.dark.textTint,
  },

  dateSelectWrapper: {
    flexDirection: "row",
  },
  dateSelect: {
    backgroundColor: Colors.dark.foreground,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
  textTint: {
    color: Colors.dark.textTint,
    fontSize: 16,
  },
});

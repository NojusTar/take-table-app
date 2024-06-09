import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import Colors from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";
import { Dropdown } from "react-native-element-dropdown";
import { useAuth } from "@/provider/AuthProvider";

export default function reserveTable() {
  const { id } = useLocalSearchParams();
  const { session } = useAuth();

  const workDays = ["M", "T", "W", "TH", "F"];

  const dayAbbreviations = {
    Mon: "M",
    Tue: "T",
    Wed: "W",
    Thu: "TH",
    Fri: "F",
    Sat: "S",
    Sun: "SU",
  };

  const [currentWeek, setCurrentWeek] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(null);
  const [reservations, setReservations] = useState();
  const [restaurant, setRestaurant] = useState();
  const [peopleSize, setPeopleSize] = useState(null);

  const startOfWeek = currentWeek.clone().startOf("isoWeek");
  const endOfWeek = currentWeek.clone().endOf("isoWeek");

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
    const currentDayIndex = moment().day() - 1;
    const currentDay = getWeek()[currentDayIndex];
    setSelectedDay(currentDay);
  }, []);

  //get reservations
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("restaurant_id", id);

      setReservations(data);
    };

    fetchOrders();
  }, [id]);

  //get restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();

      setRestaurant(data);
    };

    fetchRestaurant();
  }, [id]);

  //week code start
  //#region
  const getWeek = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, "days");
      days.push({
        fullDate: day.format("ddd MMM D YYYY"),
        dayThree: day.format("ddd"),
        dayNum: day.format("D"),
        index: i,
      });
    }
    return days;
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(currentWeek.clone().subtract(1, "week"));
  };

  const goToNextWeek = () => {
    setCurrentWeek(currentWeek.clone().add(1, "week"));
  };

  const selectDay = (day: any) => {
    console.log(day);
    setSelectedDay(day);
  };

  //#endregion
  //week code end

  //time picker start
  //#region
  const slice = (text: any) => {
    return ("0" + text).slice(-2);
  };

  const [startHours, setStartHours] = useState(new Date(1598083200000));
  const [mode1, setMode1] = useState("date");
  const [show1, setShow1] = useState(false);

  const [endHours, setEndHours] = useState(new Date(1598086800000));
  const [mode2, setMode2] = useState("date");
  const [show2, setShow2] = useState(false);

  const onChange1 = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow1(false);
    setStartHours(currentDate);
  };

  const showMode1 = (currentMode: any) => {
    setShow1(true);
    setMode1(currentMode);
  };

  const showTimepicker1 = () => {
    showMode1("time");
  };

  const onChange2 = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow2(false);
    setEndHours(currentDate);
  };

  const showMode2 = (currentMode: any) => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showTimepicker2 = () => {
    showMode2("time");
  };
  //#endregion
  //time picker end

  const putReservation = async () => {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          restaurant_name: restaurant?.name,
          user_id: session?.user.id,
          restaurant_id: restaurant?.id,
          people_size: peopleSize,
          status: 0,
          arive_time: startHours.toLocaleTimeString().substring(0, 6),
          leave_time: endHours.toLocaleTimeString().substring(0, 6),
        },
      ])
      .select();

    console.log(error);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.workHours}>
            <Pressable style={styles.grayBgButton} onPress={showTimepicker1}>
              <AntDesign
                name="clockcircleo"
                size={24}
                color={Colors.dark.textTint}
              />
              <Text style={styles.btnText}>
                {slice(startHours.getHours())}:{slice(startHours.getMinutes())}
              </Text>
              <Entypo
                name="select-arrows"
                size={24}
                color={Colors.dark.textTint}
              />
            </Pressable>

            {show1 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={startHours}
                mode={mode1}
                is24Hour={true}
                onChange={onChange1}
              />
            )}

            <Pressable style={styles.grayBgButton} onPress={showTimepicker2}>
              <AntDesign
                name="clockcircleo"
                size={24}
                color={Colors.dark.textTint}
              />
              <Text style={styles.btnText}>
                {slice(endHours.getHours())}:{slice(endHours.getMinutes())}
              </Text>
              <Entypo
                name="select-arrows"
                size={24}
                color={Colors.dark.textTint}
              />
            </Pressable>

            {show2 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={endHours}
                mode={mode2}
                is24Hour={true}
                onChange={onChange2}
              />
            )}
          </View>
        </View>

        <View style={styles.headerButtons}>
          <Pressable onPress={goToPreviousWeek}>
            <AntDesign name="caretleft" size={24} color={Colors.dark.text} />
          </Pressable>
          <Pressable onPress={goToNextWeek}>
            <AntDesign name="caretright" size={24} color={Colors.dark.text} />
          </Pressable>
        </View>
      </View>

      <View style={styles.picker}>
        {getWeek().map((day, index) => {
          const dayAbbreviation = dayAbbreviations[day.dayThree];
          const isWorkingDay = workDays.includes(dayAbbreviation);

          console.log(
            `Day: ${dayAbbreviation}, Is Working Day: ${isWorkingDay}`
          );

          return (
            <Pressable
              key={index}
              onPress={() => selectDay(day)}
              style={[
                styles.date,
                {
                  backgroundColor:
                    index === selectedDay?.index
                      ? Colors.dark.foreground
                      : isWorkingDay
                      ? Colors.dark.backgroundTint
                      : Colors.dark.red, // red for non-working days
                },
              ]}
            >
              <Text style={styles.cubeText}>{day.dayThree}</Text>
              <Text style={styles.cubeText}>{day.dayNum}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 10 }}>
        <View style={styles.dateNPpl}>
          <Text style={styles.subtitle}>{selectedDay?.fullDate}</Text>
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
        <View style={styles.placeholder}>
          <ScrollView style={styles.placeholderInset}>
            <View style={styles.ordersContainer}>
              <View style={styles.tableContainer}>
                {restaurant?.tables.map((table, index) => (
                  <View key={index} style={styles.tableCollumn}>
                    <View style={styles.tableBox}>
                      <View style={styles.tableBoxIn}>
                        <MaterialIcons
                          name="table-restaurant"
                          size={24}
                          color={Colors.dark.text}
                        />
                        <Text style={styles.tableBoxText}>{index + 1}</Text>
                      </View>

                      <View style={styles.tableBoxIn}>
                        <FontAwesome
                          name="user"
                          size={24}
                          color={Colors.dark.text}
                        />
                        <Text style={styles.tableBoxText}>{table}</Text>
                      </View>
                    </View>
                    {/* accepted reservatios start */}
                    {reservations
                      ?.filter((reservation) => reservation.table == index)
                      .map((reservation, resIndex) => (
                        <View key={resIndex}>
                          <View style={styles.orderCollumnBox}>
                            <Text style={styles.tableBoxText}>
                              {reservation?.arive_time.substring(0, 5)}
                            </Text>
                            <Text style={styles.tableBoxText}>-</Text>
                            <Text style={styles.tableBoxText}>
                              {reservation?.leave_time.substring(0, 5)}
                            </Text>
                          </View>
                        </View>
                      ))}

                    {/* accepted reservatios end */}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={putReservation}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Reserve</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderCollumnBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.foreground,
    borderRadius: 12,
    marginTop: 5,
    padding: 5,
  },

  tableContainer: {
    flexDirection: "row",
  },
  tableCollumn: {
    flex: 1,
    margin: 5,
  },
  tableBox: {
    backgroundColor: Colors.dark.foreground,
    borderRadius: 12,

    justifyContent: "space-evenly",
    alignItems: "center",

    flexDirection: "row",
    paddingVertical: 10,
  },
  tableBoxIn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  tableBoxText: {
    color: Colors.dark.text,
    fontSize: 16,
  },

  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.dark.text,
    marginBottom: 12,
  },

  dateNPpl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cubeText: {
    color: Colors.dark.text,
  },
  date: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.dark.foreground,
    flexDirection: "column",
    alignItems: "center",
  },

  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
  },

  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  ordersContainer: {
    flex: 1,
    margin: 5,
    padding: 5,
  },

  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.dark.backgroundTint,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },

  dayText: {
    fontSize: 16,
    marginVertical: 5,
  },

  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },

  dropdown: {
    borderRadius: 12,
    paddingHorizontal: 8,
    width: 67,
    backgroundColor: Colors.dark.foreground,
    borderColor: Colors.dark.foreground,
  },

  label: {
    color: Colors.dark.text,
    fontSize: 18,
  },
  grayBgButton: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: Colors.dark.foreground,
    borderRadius: 12,
  },
  workHours: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 10,
    width: 300,
  },
});

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import InputWLabel from "@/components/InputWLabel";
import { useGlobalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "react-native";
import StoredImage from "@/components/StoredImage";

const EditRestaurant = () => {
  const { id } = useGlobalSearchParams();

  const [restaurant, setRestaurant] = useState<any>();
  const [name, setName] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [image, setImage] = useState<any>();

  //fetch data start
  //#region

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setRestaurant(data);
        setName(data.name);
        setDescription(data.description);
        setLocation(data.location);
        setStartHours(data.open_time);
        setEndHours(data.close_time);
        setImage(data.image);
      }
    };
    fetchRestaurants();
  }, []);

  //#endregion
  //fetch data start

  //update restaurant start
  //#region

  const updateRestaurant = async () => {
    const { data, error } = await supabase
      .from("restaurants")
      .update({ name: name, description: description, location: location })
      .eq("id", id)
      .select();
  };

  //#endregion
  //update restaurant end

  //time picker start
  //#region
  const slice = (text: any) => {
    return ("0" + text).slice(-2);
  };

  const [startHours, setStartHours] = useState(new Date(1598051730000));
  const [startHoursChange, setStartHoursChange] = useState(
    new Date(1598051730000)
  );
  const [mode1, setMode1] = useState("date");
  const [show1, setShow1] = useState(false);

  const onChange1 = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow1(false);
    setStartHoursChange(currentDate);
    console.log(startHoursChange);
  };

  const showMode1 = (currentMode: any) => {
    setShow1(true);
    setMode1(currentMode);
  };

  const showTimepicker1 = () => {
    showMode1("time");
  };

  const [endHours, setEndHours] = useState(new Date(1598051730000));
  const [endHoursChange, setEndHoursChange] = useState(new Date(1598051730000));
  const [mode2, setMode2] = useState("date");
  const [show2, setShow2] = useState(false);

  const onChange2 = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow2(false);
    setEndHoursChange(currentDate);
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header title="Edit restaurant" />

        <Text style={styles.label}>Image</Text>
        <View style={styles.imageContainer}>
          {image ? (
            <StoredImage path={image} style={styles.image} />
          ) : (
            <Entypo name="shop" size={200} color={Colors.dark.text} />
          )}
        </View>
        <Text style={styles.selectPhoto}>Select Image</Text>

        <InputWLabel
          label="Name of the restaurant"
          placeholder="Restaurant name"
          value={name}
          onChangeText={setName}
        />

        <InputWLabel
          label="Description"
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <InputWLabel
          label="Location"
          placeholder="Description"
          value={location}
          onChangeText={setLocation}
        />

        <View>
          <Text style={[styles.label, { paddingTop: 10 }]}>Work hours</Text>
          <View style={styles.workHours}>
            <Pressable style={styles.grayBgButton} onPress={showTimepicker1}>
              <AntDesign
                name="clockcircleo"
                size={24}
                color={Colors.dark.textTint}
              />
              <Text style={styles.btnText}>
                {startHours.toString().substring(0, 5)}
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
                value={startHoursChange}
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
                {endHours.toString().substring(0, 5)}
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
                value={endHoursChange}
                mode={mode2}
                is24Hour={true}
                onChange={onChange2}
              />
            )}
          </View>
        </View>

        <View>
          <Text style={styles.label}>Work Days</Text>
          <View style={styles.workDays}>
            <Pressable style={styles.days}>
              <Text style={styles.btnText}>M</Text>
            </Pressable>
            <Pressable style={styles.days}>
              <Text style={styles.btnText}>T</Text>
            </Pressable>
            <Pressable style={styles.days}>
              <Text style={styles.btnText}>W</Text>
            </Pressable>
            <Pressable style={styles.days}>
              <Text style={styles.btnText}>TH</Text>
            </Pressable>
            <Pressable style={styles.days}>
              <Text style={styles.btnText}>F</Text>
            </Pressable>
            <Pressable style={styles.days}>
              <Text style={styles.btnText}>ST</Text>
            </Pressable>
            <Pressable style={styles.days}>
              <Text style={styles.btnText}>S</Text>
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={styles.label}>Tables</Text>
          <View style={styles.tablesWrapper}>
            <View style={styles.tableNum}>
              <MaterialIcons
                name="table-bar"
                size={24}
                color={Colors.dark.textTint}
              />
              <Text style={styles.btnText}>1</Text>
            </View>

            <Pressable style={styles.table}>
              <View style={{ flexDirection: "row" }}>
                <AntDesign name="user" size={24} color={Colors.dark.textTint} />
                <Text style={styles.btnText}>1</Text>
              </View>

              <Entypo
                name="select-arrows"
                size={24}
                color={Colors.dark.textTint}
              />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.addTable}>
          <MaterialIcons
            name="table-bar"
            size={24}
            color={Colors.dark.textTint}
          />
        </Pressable>

        <Pressable style={styles.create} onPress={updateRestaurant}>
          <Text style={styles.createText}>Update</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 10,
    gap: 10,
    paddingBottom: 20,
  },
  label: {
    color: Colors.dark.text,
    fontSize: 18,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: Colors.dark.text,
    aspectRatio: 1.6,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1.6,
    borderRadius: 12,
  },
  selectPhoto: {
    color: Colors.dark.link,
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 15,
  },

  workHours: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 10,
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
  btnText: {
    color: Colors.dark.textTint,
  },

  workDays: {
    flexDirection: "row",
    columnGap: 5,
  },
  days: {
    backgroundColor: Colors.dark.foreground,
    flex: 1,
    borderRadius: 10,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tablesWrapper: {
    flexDirection: "row",
    columnGap: 5,
  },
  tableNum: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.foreground,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  table: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.dark.foreground,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  addTable: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: Colors.dark.foreground,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  create: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.dark.backgroundTint,
    justifyContent: "center",
    alignItems: "center",
  },
  createText: {
    color: Colors.dark.text,
    fontSize: 20,
  },
});

export default EditRestaurant;

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Header from "@/components/Header";
import InputWLabel from "@/components/InputWLabel";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/provider/AuthProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import WorkDays from "@/components/WorkDays";
import TableSetup from "@/components/TableSetup";
import { Button } from "react-native-elements";

const addRestaurant = () => {
  // state variables
  const { session } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [workDays, setWorkDays] = useState([]);
  const [tables, setTables] = useState([]);
  const [maxPeopleSize, setMaxPeopleSize] = useState([]);

  //image picker start
  //#region

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //#endregion
  //image picker end

  //time picker start
  //#region
  const slice = (text: any) => {
    return ("0" + text).slice(-2);
  };

  const [startHours, setStartHours] = useState(new Date(1598076000000));
  const [mode1, setMode1] = useState("date");
  const [show1, setShow1] = useState(false);

  const [endHours, setEndHours] = useState(new Date(1598122800000));
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

  //insert restaurant start
  //#region

  const inserRestaurant = async () => {
    const imagePath = await uploadImage();

    const { data, error } = await supabase
      .from("restaurants")
      .insert([
        {
          restaurant_owner: session?.user.id,
          image: imagePath,
          name: name,
          description: description,
          location: location,
          open_time: startHours.toLocaleTimeString().substring(0, 6),
          close_time: endHours.toLocaleTimeString().substring(0, 6),
          work_days: workDays,
          tables: tables,
          max_people: maxPeopleSize,
        },
      ])
      .select();

    console.log(error);
  };

  //#endregion
  //insert restaurant end

  //upload image start
  //#region

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, decode(base64), { contentType });

    console.log("ERROR!!!!!!", error);

    if (data) {
      return data.path;
    }
  };

  //#endregion
  //upload image end

  const handleDaysChange = (days) => {
    setWorkDays(days);
  };

  const handleTablesChange = (tables, maxPeopleSize) => {
    setTables(tables);
    setMaxPeopleSize(maxPeopleSize);
    console.log("tables: ", tables);
    console.log("people size: ", maxPeopleSize);
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Header title="Create a restaurant" />

          <Text style={styles.label}>Image</Text>
          <View style={styles.imageContainer}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <Entypo name="shop" size={200} color={Colors.dark.text} />
            )}
          </View>
          <Text onPress={pickImage} style={styles.selectPhoto}>
            Select Image
          </Text>

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
                  {slice(startHours.getHours())}:
                  {slice(startHours.getMinutes())}
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

          <WorkDays onDaysChange={handleDaysChange} />

          <TableSetup onTablesChange={handleTablesChange} />

          <Pressable style={styles.create} onPress={inserRestaurant}>
            <Text style={styles.createText}>Create</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default addRestaurant;

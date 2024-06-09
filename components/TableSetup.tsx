import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Dropdown } from "react-native-element-dropdown";

const TableSetup = ({ onTablesChange }) => {
  const [tables, setTables] = useState([1, 1]);
  const [maxPeopleSize, setMaxPeopleSize] = useState(1);

  const data = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
  ];

  const calculateMaxPeopleSize = (newTables) => {
    const validSizes = newTables.filter((size) => size !== null);
    if (validSizes.length > 0) {
      setMaxPeopleSize(Math.max(...validSizes));
    } else {
      setMaxPeopleSize(null);
    }
  };

  const addTable = () => {
    setTables((prevTables) => {
      const newTables = [...prevTables, 1];
      calculateMaxPeopleSize(newTables);
      return newTables;
    });
  };

  const removeTable = (index) => {
    setTables((prevTables) => {
      const newTables = prevTables.filter((_, i) => i !== index);
      calculateMaxPeopleSize(newTables);
      return newTables;
    });
  };

  const updateTableSize = (index, size) => {
    setTables((prevTables) => {
      const newTables = [...prevTables];
      newTables[index] = size;
      calculateMaxPeopleSize(newTables);
      return newTables;
    });
  };

  useEffect(() => {
    onTablesChange(tables, maxPeopleSize);
  }, [tables]);

  return (
    <View>
      {tables.map((item, index) => (
        <View style={styles.container} key={index}>
          <View style={styles.tableNum}>
            <MaterialIcons
              name="table-restaurant"
              size={24}
              color={Colors.dark.textTint}
            />
            <Text style={styles.text}>{index + 1}</Text>
          </View>
          <Dropdown
            data={data}
            style={styles.dropdown}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={item}
            placeholder="1"
            selectedTextStyle={{ color: Colors.dark.textTint }}
            placeholderStyle={{ color: Colors.dark.textTint }}
            onChange={(item) => {
              updateTableSize(index, item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign name="user" size={20} color={Colors.dark.textTint} />
            )}
          />
          <Pressable style={styles.tableNum} onPress={() => removeTable(index)}>
            <Entypo name="cross" size={24} color={Colors.dark.textTint} />
          </Pressable>
        </View>
      ))}

      <Pressable style={styles.addContainer} onPress={addTable}>
        <FontAwesome5
          name="plus-square"
          size={24}
          color={Colors.dark.textTint}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  tableNum: {
    backgroundColor: Colors.dark.foreground,
    padding: 13,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  text: { color: Colors.dark.textTint },
  dropdown: {
    borderRadius: 12,
    flex: 1,
    paddingHorizontal: 8,
    width: 67,
    backgroundColor: Colors.dark.foreground,
    borderColor: Colors.dark.foreground,
  },

  addContainer: {
    padding: 13,
    borderStyle: "dashed",
    borderWidth: 3,
    borderColor: Colors.dark.foreground,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TableSetup;

import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";

const WorkDays = ({ onDaysChange }) => {
  const [selectedDays, setSelectedDays] = useState(["M", "T", "W", "TH", "F"]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  useEffect(() => {
    onDaysChange(selectedDays);
  }, [selectedDays]);

  const days = ["M", "T", "W", "TH", "F", "ST", "S"];

  return (
    <View>
      <Text style={styles.label}>Work Days</Text>
      <View style={styles.workDays}>
        {days.map((day) => (
          <Pressable
            key={day}
            style={[
              styles.days,
              selectedDays.includes(day) && styles.selectedDay,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text style={styles.btnText}>{day}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.dark.text,
    fontSize: 18,
    marginBottom: 10,
  },
  workDays: {
    flexDirection: "row",
    columnGap: 5,
  },
  days: {
    backgroundColor: Colors.dark.backgroundTint,
    flex: 1,
    borderRadius: 10,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: Colors.dark.foreground,
  },
  btnText: {
    color: Colors.dark.textTint,
  },
});

export default WorkDays;

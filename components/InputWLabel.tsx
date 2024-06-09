import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

var defaultas: any;

const InputWLabel = ({
  label = "Label",
  placeholder = "Placeholder text",
  value = defaultas,
  onChangeText = defaultas,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.dark.textTint}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.dark.text,
    borderRadius: 8,
    fontSize: 16,
    paddingVertical: 9,
    paddingStart: 5,
    color: Colors.dark.text,
  },
  label: {
    color: Colors.dark.text,
    fontSize: 18,
  },
});

export default InputWLabel;

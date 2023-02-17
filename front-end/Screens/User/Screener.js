
import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ratings = [
  {
    starRating: 4,
    name: "Item 1",
    date: "2022-01-01"
  },
  {
    starRating: 3,
    name: "Item 2",
    date: "2022-02-01"
  },
  {
    starRating: 5,
    name: "Item 3",
    date: "2022-03-01"
  }
];
const Screener = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Screen Screen!</Text>
      <Ionicons name="ios-person-circle-outline" size={80} color="#006600" />
    </View>
  );
};
  
export default Screener;
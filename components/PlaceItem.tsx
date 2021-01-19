import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";

interface Props {
  onSelect: () => void;
  image: string;
  title: string;
  address: string;
}

const PlaceItem = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
});

export default PlaceItem;

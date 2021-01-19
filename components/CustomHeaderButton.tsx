import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

interface Props {}

const CustomHeaderButton = (props: any) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "ios" ? COLORS.primary : "white"}
    />
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});

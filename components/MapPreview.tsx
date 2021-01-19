import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ENV from "../env";
import { LocationObj as Location } from "../models/Location";

interface Props {
  location?: Location;
  children: any;
  style?: any;
  onMapPress: () => void;
}

const MapPreview = (props: Props) => {
  let imagePreviewUrl = ``;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location?.lat
    },${
      props.location?.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.location?.lat
    },${props.location?.lng}&key=${ENV().googleAPIKey}`;
    console.log(`image location ${imagePreviewUrl}`);
  }
  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onMapPress}
    >
      {props.location ? (
        <View>
          <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
        </View>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: 300,
    height: 150,
  },
});

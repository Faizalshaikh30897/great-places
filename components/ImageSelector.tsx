import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import COLORS from "../constants/colors";

interface Props {
  onImageTaken: (imageUrl:string) => void;
}

const ImageSelector = (props: Props) => {
  const [image, setImage] = useState<string | undefined>();

  const verifyPermissions = async () => {
    const permission = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );
    if (permission.status !== "granted") {
      Alert.alert(
        "Permission Denied!",
        "Please Grant the permission to access camera to proceed.",
        [
          {
            text: "OK",
          },
        ]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.cancelled) {
      setImage(image.uri);
      props.onImageTaken(image.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!image ? (
          <Text>No Image picked yet</Text>
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </View>
      <View style={styles.buttonContainer}>
      <Button title="Take Image" color={COLORS.primary} onPress={takeImageHandler} />
      </View>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width:"100%",
    marginBottom:1
  }
});

import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import COLORS from "../constants/colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { LocationObj } from "../models/Location";
import MapPreview from "./MapPreview";

interface Props {
  navigation: any;
  onLocationChange: (location: LocationObj) => void;
}

const LocationPicker = (props: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<
    LocationObj | undefined
  >();

  let mapPickedLocation = props.navigation.getParam("pickedLocation");
  const {onLocationChange} = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationChange(mapPickedLocation);
    }
  }, [mapPickedLocation, setPickedLocation, onLocationChange]);

  const verifyPermissions = useCallback(async () => {
    const permission = await Permissions.askAsync(Permissions.LOCATION);
    if (permission.status !== "granted") {
      Alert.alert(
        "Permission Denied!",
        "Please Grant the permission to access location to proceed.",
        [
          {
            text: "OK",
          },
        ]
      );
      return false;
    }
    return true;
  },[]);

  const getLocationHandler = async () => {
    setIsFetching(true);
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync();

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocationChange(
        new LocationObj(location.coords.latitude, location.coords.longitude)
      );
    } catch (err) {
      Alert.alert(
        "Could not get Location!",
        "Please try again later! Or pick a location manually.",
        [
          {
            text: "OK",
          },
        ]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = async () => {
    props.navigation.navigate({
      routeName: "Map",
      params: {
        initialLocation: pickedLocation,
        readonly: false
      }
    });
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={pickedLocation}
        style={styles.mapPreview}
        onMapPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : (
          <Text>No Loaction selected yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get Your location"
          color={COLORS.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={COLORS.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    marginHorizontal: 5,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

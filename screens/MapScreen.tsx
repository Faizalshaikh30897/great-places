import React, { useCallback, useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from "react-navigation-stack";
import MapView, { MapEvent, Marker } from "react-native-maps";
import { LocationObj } from "../models/Location";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

interface NavigationProps {
  saveLocation: () => void;
  readonly?: boolean;
  initialLocation?: LocationObj;
}

interface ScreenProps {}
interface Props
  extends NavigationStackScreenProps<NavigationProps, ScreenProps> {}

const MapScreen: NavigationStackScreenComponent<
  NavigationProps,
  ScreenProps
> = (props: Props) => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readonly = props.navigation.getParam("readonly");

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [selectedLocation, setSelectedLocation] = useState<
    LocationObj | undefined
  >(initialLocation);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const selectLocationHandler = (event: MapEvent) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "Select a Location",
        "You have not selected any location, tap on the map to select one.",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    props.navigation.navigate({
      routeName: "NewPlace",
      params: {
        pickedLocation: selectedLocation,
      },
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocationHandler,
    });
  }, [savePickedLocationHandler]);

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navigationData) => {
  if (navigationData.navigation.getParam("readonly")) {
    return {
      headerTitle: "Map",
    };
  }
  return {
    headerTitle: "Pick Your Location",
    headerRight: () => (
      <HeaderButtons>
        <Item
          iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
          title="Save"
          onPress={navigationData.navigation.getParam("saveLocation")}
        />
      </HeaderButtons>
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

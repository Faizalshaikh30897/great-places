import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../App";
import MapPreview from "../components/MapPreview";
import COLORS from "../constants/colors";
import { LocationObj } from "../models/Location";
import { Place } from "../models/Place";

interface NavigationProps {
  placeId: string;
  placeTitle: string;
}

interface ScreenProps {}
interface Props
  extends NavigationStackScreenProps<NavigationProps, ScreenProps> {}

const PlaceDetailScreen: NavigationStackScreenComponent<
  NavigationProps,
  ScreenProps
> = (props: Props) => {
  const place: Place = useSelector((state: RootState) =>
    state.place.places.find(
      (pl) => pl.id === props.navigation.getParam("placeId")
    )
  )!;

  const selectedLocation = new LocationObj(place.lat, place.lng);

  const showMapHandler = () => {
    props.navigation.navigate({
      routeName:  "Map",
      params: {
        readonly: true,
        initialLocation: selectedLocation
      }
    });
  }

  return (
    <ScrollView contentContainerStyle={{alignItems: "center"}}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}><Text style={styles.address}>{place.address}</Text></View>
        <MapPreview style={styles.mapPreview}
          location={selectedLocation}
          onMapPress={showMapHandler}
        > <Text>No Loaction found</Text></MapPreview>
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam("placeTitle"),
  };
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: COLORS.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});


import React, { useCallback, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from "react-navigation-stack";
import { useDispatch } from "react-redux";
import ImageSelector from "../components/ImageSelector";
import Input from "../components/Input";
import LocationPicker from "../components/LocationPicker";
import COLORS from "../constants/colors";
import { LocationObj } from "../models/Location";
import { Place } from "../models/Place";
import { addPlace } from "../store/actions/places";

interface NavigationProps {
  pickedLocation: LocationObj;
}

interface ScreenProps {}
interface Props
  extends NavigationStackScreenProps<NavigationProps, ScreenProps> {}

const NewPlaceScreen: NavigationStackScreenComponent<
  NavigationProps,
  ScreenProps
> = (props: Props) => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<LocationObj>();

  const dispatch = useDispatch();

  const titleChangeHandler = (value: string, isValid: boolean, id: string) => {
    if (!isValid) {
      Alert.alert("Wrong Title", "Please enter a title", [
        {
          text: "OK",
          style: "default",
        },
      ]);
    } else {
      setTitle(value);
    }
  };

  const savePlaceHandler = () => {
    if (title && selectedImage && selectedLocation) {
      dispatch(
        addPlace(
          new Place(
            "",
            title,
            selectedImage,
            "",
            selectedLocation.lat,
            selectedLocation.lng
          )
        )
      );
      props.navigation.navigate({
        routeName: "PlacesList",
      });
    } else {
      Alert.alert(
        "Wrong Input!",
        "Please fill all the inputs to save the place",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  };

  const imageTakenHandler = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const locationChangeHandler = useCallback((location: LocationObj) => {
    setSelectedLocation(location);
  }, [setSelectedLocation]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please provide a title"
          initialValue=""
          initiallyValid={true}
          style={styles.textInput}
          onChangeInput={titleChangeHandler}
        />
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationChange={locationChangeHandler}
        />
        <Button
          title="Save Place"
          color={COLORS.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Add Place",
  };
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  textInput: {
    marginBottom: 10,
  },
});

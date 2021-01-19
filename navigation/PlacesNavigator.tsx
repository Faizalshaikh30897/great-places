import { Platform } from "react-native";
import {createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import COLORS from "../constants/colors";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";


const placeNavigator = createStackNavigator({
  PlacesList: {
    screen: PlacesListScreen as any
  },
  Map: {
    screen: MapScreen as any
  },
  NewPlace: {
    screen: NewPlaceScreen as any
  },
  PlaceDetail: {
    screen: PlaceDetailScreen as any
  }

},{
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor: Platform.OS === "android" ? COLORS.primary : ""
    },
    headerTintColor: Platform.OS === "android" ? "white" : COLORS.primary
  }
});

export default createAppContainer(placeNavigator);
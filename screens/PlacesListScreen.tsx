import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App";
import CustomHeaderButton from "../components/CustomHeaderButton";
import PlaceItem from "../components/PlaceItem";
import COLORS from "../constants/colors";
import { Place } from "../models/Place";
import { loadPlaces } from "../store/actions/places";

interface NavigationProps {}

interface ScreenProps {}
interface Props
  extends NavigationStackScreenProps<NavigationProps, ScreenProps> {}

const PlacesListScreen: NavigationStackScreenComponent<
  NavigationProps,
  ScreenProps
> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const places = useSelector((state: RootState) => state.place.places);

  const dispatch = useDispatch();

  const loadPlacesData = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await dispatch(loadPlaces());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [setIsRefreshing, setError, dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadPlacesData
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadPlacesData]);

  useEffect(() => {
    setIsLoading(true);
    loadPlacesData().then(() => {
      setIsLoading(false);
    });
  }, [loadPlacesData]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!isLoading && places.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>You have not added any Places!</Text>
      </View>
    );
  }

  if (!isLoading && error) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Could not fetch your places: {error}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={loadPlacesData}
      data={places}
      renderItem={(itemData: ListRenderItemInfo<Place>) => {
        return (
          <PlaceItem
            onSelect={() => {
              props.navigation.navigate({
                routeName: "PlaceDetail",
                params: {
                  placeTitle: itemData.item.title,
                  placeId: itemData.item.id,
                },
              });
            }}
            image={itemData.item.imageUri}
            address={itemData.item.address}
            title={itemData.item.title}
          />
        );
      }}
    />
  );
};

PlacesListScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            title="Add"
            onPress={() => {
              navigationData.navigation.navigate({
                routeName: "NewPlace",
              });
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({
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
});

import { Place } from "../../models/Place";
import * as FileSystem from "expo-file-system";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../App";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const LOAD_PLACES = "LOAD_PLACES";

interface AddPlaceAction {
  type: typeof ADD_PLACE;
  place: Place;
}
interface FetchPlacesAction {
  type: typeof LOAD_PLACES;
  places: Place[];
}

export type PlaceActionTypes = AddPlaceAction | FetchPlacesAction;

export const addPlace = (
  place: Place
): ThunkAction<void, RootState, unknown, AddPlaceAction> => {
  return async (dispatch) => {
    const fileName = place.imageUri.split("/").pop();
    try {
      const apiResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          place.lat
        },${place.lng}&key=${ENV().googleAPIKey}`
      );
      let address = "";
      if (!apiResponse.ok) {
        throw new Error("Cannot convert your location to address");
      }

      const data = await apiResponse.json();
      console.log(data);

      if (!data.results) {
        throw new Error("Cannot convert your location to address");
      }

      address = data.results[0].formatted_address;

      let newPath = FileSystem.documentDirectory;
      if (newPath) {
        newPath += fileName;

        await FileSystem.moveAsync({
          from: place.imageUri,
          to: newPath,
        });

        console.log(`file moved to path ${newPath} from ${place.imageUri}`);

        const newPlace = new Place(
          place.id,
          place.title,
          newPath,
          address,
          place.lat,
          place.lng
        );
        const dbResult = await insertPlace(newPlace);

        newPlace.id = String(dbResult.insertId);

        dispatch({
          type: ADD_PLACE,
          place: newPlace,
        });
      } else {
        throw new Error("Cannot access file system");
      }
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};

export const loadPlaces = (): ThunkAction<
  void,
  RootState,
  unknown,
  FetchPlacesAction
> => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();

      console.log(`fetch places result ${JSON.stringify(dbResult)}`);

      const loadedPlaces: Place[] = [];
      for (let i = 0; i < dbResult.rows.length; i++) {
        loadedPlaces.push(
          new Place(
            dbResult.rows.item(i).id.toString(),
            dbResult.rows.item(i).title,
            dbResult.rows.item(i).imageUri,
            dbResult.rows.item(i).address,
            dbResult.rows.item(i).lat,
            dbResult.rows.item(i).lng
          )
        );
      }

      dispatch({
        type: LOAD_PLACES,
        places: loadedPlaces,
      });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};

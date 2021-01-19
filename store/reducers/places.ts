import { Place } from "../../models/Place";
import { ADD_PLACE, LOAD_PLACES, PlaceActionTypes } from "../actions/places";


export interface PlaceState {
  places: Place[];
}

const initialState : PlaceState = {
  places: []
}

export const placeReducer = (state: PlaceState = initialState, action: PlaceActionTypes): PlaceState =>{
  switch(action.type){
    case ADD_PLACE:
      console.log('adding place', JSON.stringify(action.place));
      return {
        ...state,
        places: state.places.concat(action.place)
      }
    case LOAD_PLACES:
      return {
        ...state,
        places: action.places
      }
    default: 
    return state;
  }
}


import React from 'react';
import { StyleSheet } from 'react-native';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import PlacesNavigator from './navigation/PlacesNavigator';
import { placeReducer, PlaceState } from './store/reducers/places';
import ReduxThunk  from "redux-thunk";
import { Provider } from 'react-redux';
import { init } from "./helpers/db";

init().then((success)=>{
  
}).catch((err)=>{
  
})
export interface RootState {
  place: PlaceState
}

const rootReducer = combineReducers({
  place: placeReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
    <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
 
});

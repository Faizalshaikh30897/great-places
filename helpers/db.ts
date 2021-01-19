import * as SQLLite from "expo-sqlite";
import { Place } from "../models/Place";

const db = SQLLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          resolve(true);
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};


export const insertPlace = (place: Place): Promise<SQLLite.SQLResultSet> => {
  const promise = new Promise<SQLLite.SQLResultSet>((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);",
        [place.title,place.imageUri,place.address, place.lat, place.lng],
        (_, result) => {

          resolve(result);
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces= (): Promise<SQLLite.SQLResultSet> => {
  const promise = new Promise<SQLLite.SQLResultSet>((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * from places",
        [],
        (_, result) => {

          resolve(result);
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

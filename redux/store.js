import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";

import rootReducer from "./reducers/combineReducers";
import ServiceRequests from "../src/utils/ServiceRequests";

const saveAuthToken = () => (next) => (action) => {
  if (action.type === "SET_AUTH_TOKEN") {
    const authToken = action.payload;
    ServiceRequests.setAuthToken(authToken);
  }
  if (action.type === "REMOVE_AUTH_TOKEN") {
    ServiceRequests.setAuthToken(null);
  }
  return next(action);
};

const middlewares = [thunk, saveAuthToken];
const appliedMiddlewares = applyMiddleware(...middlewares);
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["location"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, appliedMiddlewares);
let persistor = persistStore(store);

export { store, persistor };

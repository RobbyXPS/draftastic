import authReducer from "./authReducer";
import teamReducer from "./teamReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  firestore: firestoreReducer
});

export default rootReducer;

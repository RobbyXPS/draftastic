import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import teamReducer from "./teamReducer";

const rootReducer = combineReducers({
  selected_teams: teamReducer,
  firestore: firestoreReducer
});

export default rootReducer;

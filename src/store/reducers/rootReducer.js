import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import teamReducer from "./teamReducer";
import playerReducer from "./playerReducer";
import capReducer from "./capReducer";

const rootReducer = combineReducers({
  // used with FE team selection input to populate trade UI
  selected_players: playerReducer,
  // used with FE team selection input to filter rosters
  selected_teams: teamReducer,
  team_salaries_total: capReducer,
  // used with db to hold all teams and players
  firestore: firestoreReducer
});

export default rootReducer;

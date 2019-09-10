const initialState = {
  teamOne: [],
  teamTwo: []
};

const playerReducer = (state = initialState, action) => {
  console.log("actiontype", action);
  switch (action.type) {
    case "SELECT_PLAYER":
      let tempList = state[action.player.team_container].concat(
        action.player.player_name
      );
      return Object.assign({}, state, {
        [action.player.team_container]: tempList
      });

    case "DELETE_PLAYER":
      let deltempList = state[action.player.team_container].concat(
        action.player.player_name
      );

      console.log("DELETE_PLAYER items", state[action.player.team_container]);
      console.log("DELETE_PLAYER valueToRemove", action.player.player_name);
      let playersList = state[action.player.team_container];
      let playerBeingRemoved = action.player.player_name;
      let filteredList = playersList.filter(function(player) {
        console.log("inside loop", player);
        console.log("inside loop", playerBeingRemoved);
        return player !== playerBeingRemoved;
      });
      console.log("DELETE_PLAYER filteredList", filteredList);

      console.log(
        "DELETE_PLAYER return value",
        Object.assign({}, state, {
          [action.player.team_container]: filteredList
        })
      );

      let returningobj = Object.assign({}, state, {
        [action.player.team_container]: filteredList
      });

      console.log("--------- state 1", state);
      console.log("--------- state 2", [action.player.team_container]);
      console.log("--------- state 3", filteredList);
      console.log("--------- state 4", returningobj);

      return Object.assign({}, state, {
        [action.player.team_container]: filteredList
      });

    //console.log("WORK WORK WORK WORK WORK thing1", thing1);

    /*
      return Object.assign({}, state, {
        [action.player.team_container]: filteredList
      });
*/
    //return initialState;

    default:
      return state;
  }
};

export default playerReducer;

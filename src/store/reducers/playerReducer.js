const initialState = {
  teamOne: [],
  teamTwo: []
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    // add player to users trade list
    case "SELECT_PLAYER":
      let tempList = state[action.player.team_container].concat(
        action.player.player_name
      );
      return Object.assign({}, state, {
        [action.player.team_container]: tempList
      });

    // remove player to users trade list
    case "DELETE_PLAYER":
      // get the info for which side the trade is on
      let playersList = state[action.player.team_container];
      // get the player id to be removed
      let playerBeingRemoved = action.player.player_name;
      // remove the player from the trade list
      let filteredList = playersList.filter(function(player) {
        return player !== playerBeingRemoved;
      });
      // return the array after the player has been removed
      return Object.assign({}, state, {
        [action.player.team_container]: filteredList
      });

    default:
      return state;
  }
};

export default playerReducer;

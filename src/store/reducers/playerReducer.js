const initialState = {
  teamOne: {
    player_id: [],
    player_contract: []
  },
  teamTwo: {
    player_id: [],
    player_contract: []
  }
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    // add player to users trade list
    case "SELECT_PLAYER":
      let tempList = {
        player_id: state[action.player.team_container].player_id.concat(
          action.player.player_name
        ),
        player_contract: state[
          action.player.team_container
        ].player_contract.concat(action.player.player_contract_amount)
      };

      return Object.assign({}, state, {
        [action.player.team_container]: tempList
      });

    // remove player to users trade list
    case "DELETE_PLAYER":
      console.log("inside reducer", action);
      // get the info for which side the trade is on
      let playersList = state[action.player.team_container];
      // get the player id to be removed
      let playerBeingRemoved = action.player.player_name;
      // get the player contract to be removed
      let contractBeingRemoved = action.player.player_contract_amount;

      let filteredList = {
        player_id: playersList.player_id.filter(function(player) {
          return player !== playerBeingRemoved;
        }),
        player_contract: playersList.player_contract.filter(function(player) {
          return player !== contractBeingRemoved;
        })
      };

      // return the array after the player has been removed
      return Object.assign({}, state, {
        [action.player.team_container]: filteredList
      });

    // add player to users trade list
    case "CLEAR_PLAYER_LIST":
      let clearedList = {
        player_id: [],
        player_contract: []
      };

      return Object.assign({}, state, {
        [action.player.team_container]: clearedList
      });

    default:
      return state;
  }
};

export default playerReducer;

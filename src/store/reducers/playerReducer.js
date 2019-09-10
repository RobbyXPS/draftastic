const initialState = {
  teamOne: [],
  teamTwo: []
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_PLAYER":
      let tempList = state[action.player.team_container].concat(
        action.player.player_name
      );
      return Object.assign({}, state, {
        [action.player.team_container]: tempList
      });
    default:
      return state;
  }
};

export default playerReducer;

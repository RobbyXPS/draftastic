const initialState = {
  teamOne: "",
  teamTwo: ""
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_TEAM":
      return Object.assign({}, state, {
        [action.team.team_container]: action.team.team_name
      });
    default:
      return state;
  }
};

export default teamReducer;

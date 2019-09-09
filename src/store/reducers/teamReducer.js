const initialState = {
  teamOne: "",
  teamTwo: ""
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_TEAM":
      const placeholder = action.team.team_container;
      console.log(
        "111111OOOOOOOOOO11111",
        Object.assign({}, state, {
          [placeholder]: action.team.team_name
        })
      );

      return Object.assign({}, state, {
        [placeholder]: action.team.team_name
      });
    default:
      return state;
  }
};

export default teamReducer;

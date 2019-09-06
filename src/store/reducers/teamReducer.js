const initialState = {
  teamOne: ""
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_TEAM":
      console.log("$$$$$$$$$ action.team is", action.team);
      console.log(
        "<<<<<<<<!!!>>>>>> action.team.teamContainer is",
        action.team.team_container
      );
      console.log(
        "<<<<<<<<!!!>>>>>> action.team.team_name is",
        action.team.team_name
      );
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

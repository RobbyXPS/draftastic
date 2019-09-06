const initState = {
  teams: [
    { id: "blazers", name: "blazers1" },
    { id: "lakers", name: "lakers1" },
    { id: "rockets", name: "rockets1" }
  ]
};

/*
const initState = {
  teams: []
};
*/

const teamReducer = (state = initState, action) => {
  console.log(" ##### state here", state);
  switch (action.type) {
    case "CREATE_TEAM":
      return state;
    case "CREATE_TEAM_ERROR":
      console.log("create team error", action.err);
      return state;
    default:
      return state;
  }

  /*
  switch (action.type) {
    case "CREATE_TEAM":
      console.log("created team", action.team);
      return state;
    


      return {
        ...state,
        teams: [...state.teams, action.team]
      };
*/

  /*
    case "CREATE_PROJECT_ERROR":
      console.log("create project error", action.err);
      return state;
    case "DEFAULT":
      console.log("default");
      return state;
  }
*/

  /*
  console.log("my action", action);
  if (action.type == "CREATE_TEAM") {
    return {
      ...state,
      teams: [...state.teams, action.teams]
    };
  }
  */

  //return state;
};

export default teamReducer;

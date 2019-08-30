const initState = {
  teams: [
    { id: "blazers", name: "blazers" },
    { id: "lakers", name: "lakers" },
    { id: "rockets", name: "rockets" }
  ]
};

const teamReducer = (state = initState, action) => {
  console.log("myaction", initState);
  switch (action.type) {
    case "CREATE_TEAM":
      console.log("created team", action.team);
      return state;
    default:
      console.log("default reducer");
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

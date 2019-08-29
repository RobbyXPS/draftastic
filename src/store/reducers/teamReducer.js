const initState = {
  teams: [
    { id: "blazers", name: "blazers" },
    { id: "lakers", name: "lakers" },
    { id: "rockets", name: "rockets" }
  ]
};

const teamReducer = (state = initState, action) => {
  console.log("myaction", action);
  switch (action.type) {
    case "CREATE_TEAM":
      console.log("created team", action.team);
      return {
        ...state,
        teams: [...state.teams, action.team]
      };
  }

  /*
  console.log("my action", action);
  if (action.type == "CREATE_TEAM") {
    return {
      ...state,
      teams: [...state.teams, action.teams]
    };
  }
  */
  return state;
};

export default teamReducer;

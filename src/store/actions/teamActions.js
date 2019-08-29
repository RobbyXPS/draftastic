export const createTeam = team => {
  return (dispatch, getState) => {
    //make async call
    dispatch({
      type: "CREATE_TEAM",
      team: team
    });
  };
};

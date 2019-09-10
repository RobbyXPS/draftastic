// triggered when admin creates a new team in the db via FE admin tools
export const createTeam = team => {
  return (dispatch, { getFirestore }) => {
    // make async call to db.
    const firestore = getFirestore();
    firestore
      .collection("teams")
      .add({
        //use spread operator incase there are more object keys then what is being updated
        ...team,
        name: team.name
      })
      .catch(err => {
        dispatch({ type: "CREATE_TEAM_ERROR", err });
      });
  };
};

// triggered when end user selects a team to trade with
export const selectTeam = team => {
  return {
    type: "SELECT_TEAM",
    team: team
  };
};

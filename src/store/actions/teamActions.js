import TeamList from "../../components/rosters/TeamList";

export const createTeam = team => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const mygetstate = getState();
    console.log("get the state yo >>>>>> ", getState());
    // make async call to db.
    const firestore = getFirestore();
    firestore
      .collection("teams")
      .add({
        ...team,
        name: team.name
      })
      // It feels wrong to not have a dispatch here but I don't think I need it. I'm getting all my data from the firestore reducer.
      //.then(() => {
      //  dispatch({
      //    type: "CREATE_TEAM",
      //    team: team
      //  });
      //})
      .catch(err => {
        dispatch({ type: "CREATE_TEAM_ERROR", err });
      });
  };
};

export const selectTeam = team => {
  console.log("inside action", team);
  return {
    type: "SELECT_TEAM",
    team: team
  };
};

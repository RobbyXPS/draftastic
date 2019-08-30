import TeamList from "../../components/rosters/TeamList";

export const createTeam = team => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call
    const firestore = getFirestore();
    firestore
      .collection("teams")
      .add({
        ...team,
        name: team.name
      })
      .then(() => {
        dispatch({
          type: "CREATE_TEAM",
          team: team
        });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR" });
      });
  };
};

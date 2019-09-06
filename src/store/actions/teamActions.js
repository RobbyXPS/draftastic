import TeamList from "../../components/rosters/TeamList";

export const createTeam = team => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const mygetstate = getState();
    console.log("get the state yo >>>>>> ", getState());
    //make async call
    const firestore = getFirestore();
    firestore
      .collection("teams")
      .add({
        ...team,
        name: team.name
      })
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

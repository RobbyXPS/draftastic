const initialState = {
  teamOne: null,
  teamTwo: null
};

const salaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_OUTGOING_PLAYER_SALARIES":
      return Object.assign({}, state, {
        [action.cap.team_container]: action.cap.players_salary_total
      });

    default:
      return state;
  }
};

export default salaryReducer;

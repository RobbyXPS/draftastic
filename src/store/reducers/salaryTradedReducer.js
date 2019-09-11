/*
const initialState = {
  teamOne: null,
  teamTwo: null
};

const salaryTradedReducer = (state = initialState, action) => {
  console.log("()()()()()() inside traded reducer", action);
  switch (action.type) {
    case "STORE_SALARIES_OUTGOING":
      return Object.assign({}, state, {
        [action.salaries_outgoing.team_container]:
          action.salaries_outgoing.teams_salary_outgoing
      });
    default:
      return state;
  }
};

export default salaryTradedReducer;
*/

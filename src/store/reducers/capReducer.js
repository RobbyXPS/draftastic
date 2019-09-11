const initialState = {
  teamOne: null,
  teamTwo: null
};

const capReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_SALARIES_TOTAL":
      console.log("&&&&&& uhh ", action);
      return Object.assign({}, state, {
        [action.cap.team_container]: action.cap.team_salary_total
      });
    default:
      return state;
  }
};

export default capReducer;

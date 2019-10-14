// triggered when end user selects a team to trade with
export const selectTeam = team => {
  return {
    type: "SELECT_TEAM",
    team: team
  };
};

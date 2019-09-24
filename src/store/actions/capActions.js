export const storeSalariesTotal = teamSalary => {
  return {
    type: "STORE_SALARIES_TOTAL",
    cap: teamSalary
  };
};

export const storeOutgoingSalaries = outgoingPlayerSalaries => {
  return {
    type: "STORE_OUTGOING_PLAYER_SALARIES",
    cap: outgoingPlayerSalaries
  };
};

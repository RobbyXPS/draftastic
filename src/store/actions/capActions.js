export const storeSalariesTotal = teamSalary => {
  return {
    type: "STORE_SALARIES_TOTAL",
    cap: teamSalary
  };
};

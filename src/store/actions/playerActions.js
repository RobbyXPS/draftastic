// triggered when end user selects a player to trade with
export const selectPlayer = player => {
  //console.log("INSIDE ACTION CREATOR", player);
  return {
    type: "SELECT_PLAYER",
    player: player
  };
};

export const deletePlayer = player => {
  console.log("INSIDE DELETE ACTION CREATOR", player);
  return {
    type: "DELETE_PLAYER",
    player: player
  };
};

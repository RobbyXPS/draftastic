// triggered when end user selects a player to trade with
export const selectPlayer = player => {
  return {
    type: "SELECT_PLAYER",
    player: player
  };
};

export const deletePlayer = player => {
  console.log("inside player action", player);
  return {
    type: "DELETE_PLAYER",
    player: player
  };
};

export const clearPlayerList = player => {
  console.log("inside action", player);
  return {
    type: "CLEAR_PLAYER_LIST",
    player: player
  };
};

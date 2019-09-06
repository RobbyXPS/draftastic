import React from "react";
import { connect } from "react-redux";

function PlayerList(props) {
  // get list of players from parent component via props
  const playerList = props.players;

  // UI renders multiple times and has undefined values the first couples times so I need this if statement.
  if (playerList != undefined) {
    // filter player list based on selected team from parent component via props
    function filterByTeam(item) {
      if (item.team == props.currentTeam) {
        return true;
      }
      return false;
    }

    // filter the list
    let filteredList = playerList.filter(filterByTeam);

    // construct the list of teams in HTML
    const listItems = filteredList.map(player => <li>{player.name}</li>);

    // construct the list for the list items
    return (
      <div>
        <h2>Players</h2>
        <ul>{listItems}</ul>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default PlayerList;

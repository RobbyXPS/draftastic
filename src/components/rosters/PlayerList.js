import React from "react";
import { connect } from "react-redux";

function PlayerList(props) {
  // get list of players from parent component via props
  const playerList = props.players;
  console.log("heyyyyyyyyy ohhhhhhhh !!!", playerList);
  console.log("heyyyyyyyyy ohhhhhhhh !!! -props", props);
  console.log(
    "this might actually work !!! -props all the way down",
    props.currentTeam
  );
  //const mycurrentteam = props.currentTeam;
  console.log(JSON.stringify(props.currentTeam.teamOne));
  //console.log(JSON.stringify(mycurrentteam.teamOne));

  // UI renders multiple times and has undefined values the first couples times so I need this if statement.
  if (playerList != undefined) {
    // filter player list based on selected team from parent component via props
    function filterByTeam(item) {
      if (item.team == props.currentTeam.teamOne) {
        return true;
      }
      return false;
    }

    // filter the list
    let filteredList = playerList.filter(filterByTeam);

    // construct the list of teams in HTML
    const listItems = filteredList.map(player => (
      <li class="player-card">
        <div id="player-card-name">
          <p>
            {player.first_name} {player.last_name}
          </p>
        </div>
        <div id="player-card-position">
          <p>{player.position}</p>
        </div>

        <div id="player-card-contract">
          <p>{player.contract_amount}</p>
          <p>{player.contract_length}</p>
        </div>
      </li>
    ));

    // construct the list for the list items
    return (
      <div id="team-list-one-container">
        <h2>Players</h2>
        <ul id="team-list-one">{listItems}</ul>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default PlayerList;

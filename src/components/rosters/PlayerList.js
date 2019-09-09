import React from "react";
import { connect } from "react-redux";

function PlayerList(props) {
  // get list of players from parent component via props
  const playerList = props.players;

  console.log("uhhhhh my props for player list", props);
  console.log("uhhhhh containerValue", props.containerValue);

  //const mycurrentteam = props.currentTeam;

  //console.log(JSON.stringify(mycurrentteam.teamOne));

  // UI renders multiple times and has undefined values the first couples times so I need this if statement.
  if (playerList != undefined) {
    console.log("player list props", props);
    console.log("current team", props.currentTeam);
    console.log("my props.currentTeam.teamOne", props.currentTeam.teamOne);
    // filter player list based on selected team from parent component via props

    let myTeamObj = props.currentTeam;
    let comptCompKey = props.containerValue;

    console.log("myTeamObj", myTeamObj);
    console.log("comptCompKey", comptCompKey);

    console.log("uhhhhh containerValue", props.containerValue);
    console.log("current team", props.currentTeam);
    let filterVar = props.containerValue;

    function filterByTeam(item) {
      //if (item.team == props.currentTeam.teamOne) {
      if (item.team == props.currentTeam[filterVar]) {
        return true;
      }
      return false;
    }

    // filter the list
    let filteredList = playerList.filter(filterByTeam);

    /*
    if (props.containerValue == "teamOne") {
      const myTeamVar = props.containerValue;
      console.log("inside if v1", myTeamVar);
    }

    if (props.containerValue == "teamTwo") {
      const myTeamVar = props.containerValue;
      console.log("inside if v1", myTeamVar);
    }
*/
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

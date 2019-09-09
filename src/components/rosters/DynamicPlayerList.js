import React from "react";

function DynamicPlayerList(props) {
  console.log("dyyyyyyy", props);
  console.log("object it", Object.keys(props));
  console.log(
    "map keys",
    Object.keys(props).map((keyName, i) => props[keyName])
  );

  console.log("AHHHHHHHHHHHHH", props.selected_team.teamOne);

  const playerList = props.players;

  if (playerList != undefined) {
    function filterByTeamOne(item) {
      if (item.team == props.selected_team.teamOne) {
        return true;
      }
      return false;
    }

    // filter the list
    let filteredListOne = playerList.filter(filterByTeamOne);
    console.log("filteredListOne", filteredListOne);

    function filterByTeamTwo(item) {
      if (item.team == props.selected_team.teamTwo) {
        return true;
      }
      return false;
    }

    let filteredListTwo = playerList.filter(filterByTeamTwo);
    console.log("filteredListTwo", filteredListTwo);

    const listItemsOne = filteredListOne.map(player => (
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

    const listItemsTwo = filteredListTwo.map(player => (
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

    return (
      <div>
        <h2>Dynamic1</h2>
        <ul>{listItemsOne}</ul>
        <h2>Dynamic2</h2>
        <ul>{listItemsTwo}</ul>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

/*
class DynamicPlayerList extends React.Component {
  constructor(props) {
    super(props);
    console.log("comp props", this.props);
  }

  render() {
    return (
      <div>
        <h2>Dynamic player list</h2>
      </div>
    );
  }
}
*/
export default DynamicPlayerList;

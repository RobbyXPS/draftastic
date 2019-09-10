import React from "react";
import { connect } from "react-redux";
import { selectPlayer } from "../../store/actions/playerActions";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    console.log(
      "PLAYER SELECTED YO",
      event.currentTarget.getAttribute("playerid")
    );

    console.log("<<<<props when player selected>>>>", this.props);

    /*
    // this is working with player name, commenting out cuz I want the player object
    this.props.selectPlayer({
      team_container: this.props.containerValue,
      player_name: event.target.innerHTML
    });
*/
    this.props.selectPlayer({
      team_container: this.props.containerValue,
      player_name: event.currentTarget.getAttribute("playerid")
    });
  };

  render() {
    // get list of players from parent component via props
    const playerList = this.props.players;

    // UI renders multiple times and has undefined values the first couples times so I need this if statement
    if (playerList !== undefined) {
      // get vars passed down from parent component via props
      let currentTeams = this.props.currentTeams;
      let containerValue = this.props.containerValue;

      // filter helper to return list based on team name
      function filterByTeam(item) {
        if (item.team === currentTeams[containerValue]) {
          return true;
        }
        return false;
      }

      // filter the list
      let filteredList = playerList.filter(filterByTeam);

      // construct the list items for each player
      const listItems = filteredList.map(player => (
        <li
          className="player-card"
          playerid={player.id}
          key={player.id}
          onClick={this.handleClick}
        >
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

      // construct the list from the list items
      return (
        <div id="team-list-one-container">
          <h2>Players</h2>
          <ul id="team-list-one">{listItems}</ul>
        </div>
      );
    }
    // display placeholder text while getting data from db
    else {
      return <div>loading...</div>;
    }

    console.log("playerList1", playerList);
    return <div>Hey</div>;
  }
}

/*
function PlayerList(props) {
  // get list of players from parent component via props
  const playerList = props.players;

  // UI renders multiple times and has undefined values the first couples times so I need this if statement
  if (playerList !== undefined) {
    // get vars passed down from parent component via props
    let currentTeams = props.currentTeams;
    let containerValue = props.containerValue;

    // filter helper to return list based on team name
    function filterByTeam(item) {
      if (item.team === currentTeams[containerValue]) {
        return true;
      }
      return false;
    }

    // filter the list
    let filteredList = playerList.filter(filterByTeam);

    // construct the list items for each player
    const listItems = filteredList.map(player => (
      <li className="player-card" key={player.id}>
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

    // construct the list from the list items
    return (
      <div id="team-list-one-container">
        <h2>Players</h2>
        <ul id="team-list-one">{listItems}</ul>
      </div>
    );
  }
  // display placeholder text while getting data from db
  else {
    return <div>loading...</div>;
  }
}
*/

const mapDispatchToProps = dispatch => {
  return {
    selectPlayer: player => dispatch(selectPlayer(player))
  };
};

//export default PlayerList;

export default connect(
  null,
  mapDispatchToProps
)(PlayerList);

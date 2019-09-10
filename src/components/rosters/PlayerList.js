import React from "react";
import { connect } from "react-redux";
import { selectPlayer } from "../../store/actions/playerActions";
import { deletePlayer } from "../../store/actions/playerActions";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.filterByPlayer = this.filterByPlayer.bind(this);
  }

  // track when a player selects a player to be added to the trade
  handleClick = event => {
    console.log(
      "$$$$$ INSIDE HANDLECLICK",
      event.currentTarget.getAttribute("playerobj")
    );

    this.props.selectPlayer({
      team_container: this.props.containerValue,
      player_name: event.currentTarget.getAttribute("playerid")
    });
  };

  // track when a player selects a player to be removed from the trade
  handleDelete = event => {
    this.props.deletePlayer({
      team_container: this.props.containerValue,
      player_name: event.currentTarget.parentNode.parentNode.getAttribute(
        "playerid"
      )
    });
  };

  filterByPlayer(item) {
    const containerValue = this.props.containerValue;
    if (this.props.selected_players[containerValue].includes(item.id)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    // HANDLE LISTS THAT ARE FOR THE TRADE UI

    if (this.props.isTradeUI == "true") {
      // get list of players from parent component via props
      const playerList = this.props.players;

      // wait for playerlist to populate from db
      if (playerList !== undefined) {
        // only filter in players that the user has selected in the roster ui
        const filteredPlayerList = playerList.filter(this.filterByPlayer);

        // construct the list items for each player
        const listItems = filteredPlayerList.map(player => (
          <li className="player-card" playerid={player.id} key={player.id}>
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
            <div id="player-card-options">
              <button onClick={this.handleDelete}>X</button>
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
      } else {
        return <div>loading...</div>;
      }
    }

    // HANDLE LISTS THAT ARE FOR THE ROSTER UI

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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectPlayer: player => dispatch(selectPlayer(player)),
    deletePlayer: player => dispatch(deletePlayer(player))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlayerList);

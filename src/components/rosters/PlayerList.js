import React from "react";
import { connect } from "react-redux";
import { selectPlayer } from "../../store/actions/playerActions";
import { deletePlayer } from "../../store/actions/playerActions";
import {
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody
} from "reactstrap";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // track when a player selects a player to be added to the trade
  handleClick = event => {
    this.props.selectPlayer({
      team_container: this.props.containerValue,
      player_name: event.currentTarget.getAttribute("playerid"),
      player_contract_amount: event.currentTarget.getAttribute(
        "player_contract_amount"
      )
    });
  };

  // track when a player selects a player to be removed from the trade
  handleDelete = event => {
    this.props.deletePlayer({
      team_container: this.props.containerValue,
      player_name: event.currentTarget.parentNode.parentNode.getAttribute(
        "playerid"
      ),
      player_contract_amount: event.currentTarget.parentNode.parentNode.getAttribute(
        "player_contract_amount"
      )
    });
  };

  // helper function to add class based on if player has been selected for trade
  isActive(selectedPlayers, playerId) {
    if (selectedPlayers.player_id.indexOf(playerId) === -1) {
      return "";
    } else {
      return "disabled";
    }
  }

  // helper function to add class based on if player has been selected for trade
  isButtonActive(selectedPlayers, playerId) {
    if (selectedPlayers.player_id.indexOf(playerId) === -1) {
      return "player-list-danger-button hide";
    } else {
      return "player-list-danger-button";
    }
  }

  render() {
    // helper function to format contract amounts to dollars
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    });
    // HANDLE LISTS THAT ARE FOR THE ROSTER UI
    // get list of players from parent component via props
    const playerList = this.props.players;
    // get which team container this is for
    const contvalue = this.props.containerValue;
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
      // filter the list by team
      let filteredList = playerList.filter(filterByTeam);
      // get the list of currently selected players
      const selectedPlayerList = this.props.selected_players[containerValue];
      // construct the list items for each player
      const listItems = filteredList.map(player => (
        <div
          className="list-item-player-container"
          key={player.id}
          playerid={player.id}
          player_contract_amount={player.contract_amount}
        >
          <ListGroupItem
            className={
              "player-card " + this.isActive(selectedPlayerList, player.id)
            }
            tag="li"
            action
            playerid={player.id}
            player_contract_amount={player.contract_amount}
            key={player.id}
            onClick={this.handleClick}
          >
            <div className="player-info-container">
              <div id="player-card-name">
                <p>
                  <span className="player-info-highlight">
                    {player.first_name} {player.last_name}
                  </span>
                </p>
              </div>
              <div id="player-extended-info-container">
                <div id="player-card-position">
                  <p>
                    Position:
                    <span className="player-info-highlight">
                      {" " + player.position}
                    </span>
                  </p>
                </div>
                <p>
                  Contract:
                  <span className="player-info-highlight">
                    {" " + formatter.format(player.contract_amount)}
                  </span>
                </p>
                <p>
                  Contract Length:
                  <span className="player-info-highlight">
                    {" " + player.contract_length}
                  </span>
                </p>
              </div>
            </div>
          </ListGroupItem>
          <div id="player-card-options">
            <Button
              onClick={this.handleDelete}
              id="player-card-delete"
              outline
              color="danger"
              className={this.isButtonActive(selectedPlayerList, player.id)}
            >
              X
            </Button>
          </div>
        </div>
      ));
      // construct the list from the list items
      return (
        <div id="team-list-one-container">
          <Card>
            <CardHeader>
              <span className="team-info-highlight">
                {this.props.currentTeams[contvalue]}
              </span>
            </CardHeader>
            <CardBody>{listItems}</CardBody>
            <CardFooter></CardFooter>
          </Card>
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

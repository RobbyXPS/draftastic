import React from "react";
import { connect } from "react-redux";
import { selectPlayer } from "../../store/actions/playerActions";
import { deletePlayer } from "../../store/actions/playerActions";
import {
  ListGroup,
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
    this.filterByPlayer = this.filterByPlayer.bind(this);
    this.isActive = this.isActive;
    this.isButtonActive = this.isButtonActive.bind(this);
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

  filterByPlayer(item) {
    const containerValue = this.props.containerValue;
    if (
      this.props.selected_players[containerValue].player_id.includes(item.id)
    ) {
      return true;
    } else {
      return false;
    }
  }

  // helper function to add class based on if player has been selected for trade
  isActive(selectedPlayers, playerId) {
    if (selectedPlayers.player_id.indexOf(playerId) == -1) {
      return "";
    } else {
      return "disabled";
    }
  }

  // helper function to add class based on if player has been selected for trade
  isButtonActive(selectedPlayers, playerId) {
    if (selectedPlayers.player_id.indexOf(playerId) == -1) {
      return "player-list-danger-button hide";
    } else {
      return "player-list-danger-button";
    }
  }

  render() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    });

    const contvalue = this.props.containerValue;
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
          <ListGroupItem
            className="player-card trade-card"
            tag="li"
            action
            playerid={player.id}
            player_contract_amount={player.contract_amount}
            key={player.id}
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
                    {" " + player.contract_amount}
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
            <div id="player-card-options">
              <Button
                onClick={this.handleDelete}
                id="player-card-delete"
                outline
                color="danger"
              >
                X
              </Button>
            </div>
          </ListGroupItem>
        ));

        // construct the list from the list items
        return (
          <div id="team-list-one-container">
            {/* <ListGroup id="team-trade-list-one">{listItems}</ListGroup> */}

            <Card>
              <CardHeader>
                Players being aquired from {this.props.currentTeams[contvalue]}
              </CardHeader>
              <CardBody>{listItems}</CardBody>
              <CardFooter></CardFooter>
            </Card>
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
              className=""
              className={this.isButtonActive(selectedPlayerList, player.id)}
            >
              X
            </Button>
          </div>
        </div>
      ));

      const contvalue = this.props.containerValue;

      // construct the list from the list items
      return (
        <div id="team-list-one-container">
          {/* <ListGroup id="team-list-one">{listItems}</ListGroup> */}
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

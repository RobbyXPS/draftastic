import React from "react";

class TradeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.filterIncomingPlayers = this.filterIncomingPlayers.bind(this);
    this.calculateSalaries = this.calculateSalaries.bind(this);
  }

  calculateSalaries(list) {
    return list.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue.contract_amount;
    }, 0);
  }

  filterIncomingPlayers(item) {
    // filp which container value is because we want the top portion populating for the other teams players
    let selectedPlayersList = "teamOne";
    if (this.props.containerValue == "teamOne") {
      selectedPlayersList = "teamTwo";
    }

    if (this.props.selected_players[selectedPlayersList].includes(item.id)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const containerValue = this.props.containerValue;
    const playerList = this.props.players;

    if (playerList !== undefined) {
      //const filteredPlayerList = playerList.filter(this.filterIncomingPlayers);
      const incomingPlayersList = playerList.filter(this.filterIncomingPlayers);

      // construct text that should be displayed when user selects a player to trade
      let numofplayers = incomingPlayersList.length;
      //var returntext;
      let incomingPlayersMessage;
      const totalSalary = this.calculateSalaries(incomingPlayersList);

      if (numofplayers == 0) {
        incomingPlayersMessage = "";
      } else {
        incomingPlayersMessage =
          "aquireing " +
          numofplayers +
          " players with salaries totaling " +
          totalSalary;
      }

      let currentTeams = this.props.currentTeams;

      // filter helper to return list based on team name
      function filterByTeam(item) {
        if (item.team === currentTeams[containerValue]) {
          return true;
        }
        return false;
      }

      // construct the caproom for the selected team
      let filteredList = playerList.filter(filterByTeam);
      let wholeTeamSalary = this.calculateSalaries(filteredList);
      //2019-2020 cap room is 109,140,000
      let caproom = 109140000 - wholeTeamSalary;

      // construct the cap number text displayed when a user selects a team
      var capAmountMessage;
      // if a user hasn't selected a team yet don't display anything
      if (wholeTeamSalary == 0) {
        capAmountMessage = "";
      }
      // once they select a team show the cap room for that team
      else {
        capAmountMessage = "cap room " + caproom;
      }

      // return the jsx to the user
      return (
        <div>
          <h1>{this.props.currentTeams[containerValue]}</h1>
          <p>{incomingPlayersMessage}</p>
          <p>{capAmountMessage}</p>
        </div>
      );
    }
    // display placeholder text until you get data from db
    else {
      return <div>loading...</div>;
    }
  }
}

export default TradeInfo;

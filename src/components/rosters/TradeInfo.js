import React from "react";

class TradeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.filterByPlayer = this.filterByPlayer.bind(this);
    this.calculateSalaries = this.calculateSalaries.bind(this);
  }

  calculateSalaries(list) {
    var mines = list.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue.contract_amount;
    }, 0);

    return mines;
  }

  filterByPlayer(item) {
    let selectedPlayersList = "teamOne";
    if (this.props.containerValue == "teamOne") {
      selectedPlayersList = "teamTwo";
    }

    //const containerValue = this.props.containerValue;
    if (this.props.selected_players[selectedPlayersList].includes(item.id)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let contValue = this.props.containerValue;

    /*
    let selectedPlayersList = "teamOne";
    if (this.props.containerValue == "teamOne") {
      selectedPlayersList = "teamTwo";
    }
    */
    let selectedPlayersList = this.props.containerValue;

    const playerList = this.props.players;
    if (playerList !== undefined) {
      const filteredPlayerList = playerList.filter(this.filterByPlayer);

      if (filteredPlayerList.length >= 1) {
        var initialValue = 0;
        var sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.x;
        },
        initialValue);

        var initialValue2 = 0;
        var sum2 = filteredPlayerList.reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.contract_amount;
        },
        initialValue);
      }
      var numofplayers = filteredPlayerList.length;

      var returntext;

      if (numofplayers == 0) {
        returntext = "";
      } else {
        returntext =
          "aquireing " +
          numofplayers +
          " players with salaries totaling " +
          sum2;
      }

      //var returntext = "aquireing" + numofplayers + "players @" + sum2;

      //if (filteredPlayerList.length >= 1) return aquireing {numofplayers} players @ {sum2}

      console.log("FILTER LIST", filteredPlayerList);
      const totalSalary = this.calculateSalaries(filteredPlayerList);
      console.log("totalSalary", totalSalary);

      /*
      if (totalSalary == 0) {
        returntext = "";
      } else {
        returntext =
          "aquireing " +
          numofplayers +
          " players with salaries totaling " +
          sum2;
      }
      */

      let currentTeams = this.props.currentTeams;

      // filter helper to return list based on team name
      function filterByTeam(item) {
        console.log("inside filter 1", contValue);
        console.log("inside filter 2", currentTeams[contValue]);
        if (item.team === currentTeams[contValue]) {
          return true;
        }
        return false;
      }

      console.log("playerList", playerList);
      // filter the list
      let filteredList = playerList.filter(filterByTeam);
      console.log("filteredList", filteredList);
      let wholeTeamSalary = this.calculateSalaries(filteredList);
      console.log("wholeTeamSalary", wholeTeamSalary);
      let caproom = 109140000 - wholeTeamSalary;

      //console.log("<<<< RIGHT HERE >>>>", wholeTeamSalary);
      var returntext2;
      if (wholeTeamSalary == 0) {
        returntext2 = "";
      } else {
        returntext2 = "cap room " + caproom;
      }

      return (
        <div>
          <h1>{this.props.currentTeams[contValue]}</h1>
          <p>{returntext}</p>
          <p>{returntext2}</p>
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default TradeInfo;

import React from "react";
import { connect } from "react-redux";

class TradeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.filterByPlayer = this.filterByPlayer.bind(this);
  }

  filterByPlayer(item) {
    console.log("^^^^^ IN THIS FILTER BY YO! 1", item);
    console.log("^^^^^ IN THIS FILTER BY YO! 2", this);

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
    console.log("INSIDE TRADE INFO 1", this);
    console.log("INSIDE TRADE INFO 2", this.props.containerValue);
    let contValue = this.props.containerValue;
    console.log("INSIDE TRADE INFO 3", this.props.currentTeams[contValue]);

    /*
    let selectedPlayersList = "teamOne";
    if (this.props.containerValue == "teamOne") {
      selectedPlayersList = "teamTwo";
    }
    */
    let selectedPlayersList = this.props.containerValue;

    console.log("GGGGGGG --- GGGGG", selectedPlayersList);
    console.log(
      "INSIDE TRADE INFO 4 -- selected players",
      this.props.selected_players[selectedPlayersList]
    );

    console.log("ALL THE PLAYERS", this.props.players);

    const playerList = this.props.players;
    if (playerList !== undefined) {
      const filteredPlayerList = playerList.filter(this.filterByPlayer);

      console.log("PLAYER OBJ SHOULD BE HERE", filteredPlayerList);
      console.log("!!!!!!!!!!!! BLAST OFF", filteredPlayerList.length >= 1);

      if (filteredPlayerList.length >= 1) {
        console.log("************** ******** start of reduce");

        var initialValue = 0;
        var sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.x;
        },
        initialValue);
        console.log("MINES SUMMMMMMMMMMMMMM", sum);

        var initialValue2 = 0;
        var sum2 = filteredPlayerList.reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.contract_amount;
        },
        initialValue);
        console.log("MINES SUMMMMMMMMMMMMMM 2", sum2);
      }
      var numofplayers = filteredPlayerList.length;

      var returntext;

      console.log("hey", numofplayers == 0);

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
      return (
        <div>
          <h1>{this.props.currentTeams[contValue]}</h1>
          <p>{returntext}</p>
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default TradeInfo;

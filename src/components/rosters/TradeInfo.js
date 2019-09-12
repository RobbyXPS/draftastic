import React from "react";
import { connect } from "react-redux";
import { storeSalariesTotal } from "../../store/actions/capActions";

class TradeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomingPlayersMessage: "",
      capAmountMessage: ""
    };
    this.filterIncomingPlayers = this.filterIncomingPlayers.bind(this);
    this.calculateSalaries = this.calculateSalaries.bind(this);
    this.handleSendingSalaries = this.handleSendingSalaries.bind(this);
  }

  handleSendingSalaries(containerValue, wholeTeamSalary) {
    this.props.storeSalariesTotal({
      team_container: containerValue,
      team_salary_total: wholeTeamSalary
    });
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

    if (
      this.props.selected_players[selectedPlayersList].player_id.includes(
        item.id
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps) {
    // need to do a check on prevProps so that the componentdidupdate doesn't infinitely update when state changes
    if (
      this.props.currentTeams !== prevProps.currentTeams ||
      this.props.selected_players !== prevProps.selected_players
    ) {
      const containerValue = this.props.containerValue;
      const playerList = this.props.players;

      // wait for data to come in from db
      if (playerList !== undefined) {
        // get the list of players being traded
        const incomingPlayersList = playerList.filter(
          this.filterIncomingPlayers
        );

        // construct text that should be displayed when user selects a player to trade
        let numofplayers = incomingPlayersList.length;
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

        // this is what causes the state transition error if you don't check at beginning of code block
        this.handleSendingSalaries(containerValue, wholeTeamSalary);

        //2019-2020 cap room is 109,140,000
        let caproom = 109140000 - wholeTeamSalary;

        // construct the cap number text displayed when a user selects a team
        let capAmountMessage;
        // if a user hasn't selected a team yet don't display anything
        if (wholeTeamSalary == 0) {
          capAmountMessage = "";
        }
        // once they select a team show the cap room for that team
        else {
          capAmountMessage = "cap room " + caproom;
        }
        this.setState({ incomingPlayersMessage: incomingPlayersMessage });
        this.setState({ capAmountMessage: capAmountMessage });
      }
    }
  }

  render() {
    const containerValue = this.props.containerValue;

    return (
      <div>
        <h1>{this.props.currentTeams[containerValue]}</h1>
        <p>{this.state.incomingPlayersMessage}</p>
        <p>{this.state.capAmountMessage}</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeSalariesTotal: teamSalary => dispatch(storeSalariesTotal(teamSalary))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TradeInfo);

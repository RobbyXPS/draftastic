import React from "react";
import { connect } from "react-redux";

class TradeProposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team_one_failure_message: "",
      team_two_failure_message: "",
      success_message: ""
    };
    this.handleTrade = this.handleTrade.bind(this);
  }

  componentDidUpdate(prevProps) {
    // need to do a check on prevProps so that the componentdidupdate doesn't infinitely update when state changes
    if (
      this.props.selected_players.teamOne.player_contract !==
        prevProps.selected_players.teamOne.player_contract ||
      this.props.selected_players.teamTwo.player_contract !==
        prevProps.selected_players.teamTwo.player_contract
    ) {
      console.log("^^^^^^^ inside didupdate logic");

      this.setState({
        team_one_failure_message: "",
        team_two_failure_message: "",
        success_message: ""
      });
    }
  }

  handleTrade() {
    // get team salary

    //team one
    let teamOneTotalSalary = this.props.team_salaries_total.teamOne;
    let teamOneContractList = this.props.selected_players.teamOne
      .player_contract;
    let teamOneTotalContracts = teamOneContractList.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );

    //team two
    let teamTwoTotalSalary = this.props.team_salaries_total.teamTwo;
    let teamTwoContractList = this.props.selected_players.teamTwo
      .player_contract;
    let teamTwoTotalContracts = teamTwoContractList.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );

    //trade logic branching

    // TEAM ONE LOGIC
    if (teamOneTotalSalary > 109140000) {
      // do the math for the trade buffer per NBA rules
      let tradeBufferOne = teamOneTotalContracts * 1.25 + 100000;

      // check to see if the trade logic is valid for team two
      if (teamTwoTotalContracts <= tradeBufferOne == false) {
        this.setState({
          team_two_failure_message:
            "Error: 'Lakers' incoming slaries exceed the 125% plus $100,000 rule. Cut $'some amount' from the 'Lakers' incoming trade value to make the trade successful."
        });
      } else {
        this.setState({
          team_two_failure_message: ""
        });
      }

      // TEAM TWO LOGIC
      // do the math for the trade buffer per NBA rules
      let tradeBufferTwo = teamTwoTotalContracts * 1.25 + 100000;

      // check to see if the trade logic is valid for team two
      if (teamOneTotalContracts <= tradeBufferTwo == false) {
        this.setState({
          team_one_failure_message:
            "Error: 'Blazers' incoming slaries exceed the 125% plus $100,000 rule. Cut $'some amount' from the 'Blazers' incoming trade value to make the trade successful."
        });
      } else {
        this.setState({
          team_one_failure_message: ""
        });
      }

      if (
        this.state.team_one_failure_message.length == 0 &&
        this.state.team_two_failure_message.length == 0
      ) {
        console.log("inside last if 1");
        console.log("inside last if 2", this.state);
        console.log("inside last if 3", this.state.team_one_failure_message);
        console.log("inside last if 4", this.state.team_two_failure_message);
        this.setState({
          success_message: "TRADE SUCCESSFUL"
        });
      }
    } else {
      // do scenario 2
      console.log("inside scenario 2");
    }
  }

  render() {
    if (
      this.props.selected_players.teamOne.player_id.length !== 0 &&
      this.props.selected_players.teamTwo.player_id.length !== 0
    ) {
      return (
        <div id="trade-proposer-container">
          <h2 id="trade-proposer-header">Make the TRADE!</h2>
          <button
            id="trade-proposer-button"
            type="button"
            onClick={this.handleTrade}
          >
            TRADE
          </button>
          <div id="trade-validator-error-message-container">
            <p id="trade-validator-error-message-one">
              {this.state.team_one_failure_message}
            </p>
            <p id="trade-validator-error-message-two">
              {this.state.team_two_failure_message}
            </p>
            <h2 id="trade-validator-success-message">
              {this.state.success_message}
            </h2>
          </div>
        </div>
      );
    } else {
      return <h2></h2>;
    }
  }
}

export default TradeProposer;

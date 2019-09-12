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
    console.log("*** teamOneTotalContracts OUTGOING", teamOneTotalContracts);
    console.log("*** teamOneTotalSalary", teamOneTotalSalary);

    //team two
    let teamTwoTotalSalary = this.props.team_salaries_total.teamTwo;
    let teamTwoContractList = this.props.selected_players.teamTwo
      .player_contract;
    let teamTwoTotalContracts = teamTwoContractList.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );
    console.log("*** teamTwoTotalContracts", teamTwoTotalContracts);
    console.log("*** teamTwoTotalSalary", teamTwoTotalSalary);

    //trade logic branching

    //teamone
    if (teamOneTotalSalary > 109140000) {
      // do scenario 1
      console.log("inside scenario 1");
      // TEAM ONE LOGIC

      console.log("team ones incoming contracts", teamTwoTotalContracts);
      console.log("team ones outgoing contracts", teamOneTotalContracts);

      let tradeBufferOne = teamOneTotalContracts * 1.25 + 100000;
      console.log("trade buffer", tradeBufferOne);

      //let answer = teamTwoTotalContracts <= tradeBufferOne;
      console.log("math", teamTwoTotalContracts <= tradeBufferOne);

      // TEAM TWO LOGIC

      console.log("team twos incoming contracts", teamOneTotalContracts);
      console.log("team twos outgoing contracts", teamTwoTotalContracts);

      let tradeBufferTwo = teamTwoTotalContracts * 1.25 + 100000;
      console.log("trade buffer", tradeBufferTwo);

      //let answer = teamTwoTotalContracts <= tradeBufferOne;
      console.log("math", teamOneTotalContracts <= tradeBufferTwo);

      if (teamOneTotalContracts <= tradeBufferTwo == false) {
        this.setState({
          team_one_failure_message:
            "Error: 'Blazers' incoming slaries exceed the 125% plus $100,000 rule. Cut $'some amount' from the 'Blazers' incoming trade value to make the trade successful."
        });
      } else {
        console.log(
          "success !! 1",
          this.props.selected_players.teamOne.player_contract
        );
        this.setState({
          team_one_failure_message: "",
          success_message: "TRADE SUCCESSFUL"
        });
      }
    } else {
      // do scenario 2
      console.log("inside scenario 2");
    }
  }

  render() {
    console.log(
      "!!!!!!!!!!!!!!! 1",
      this.props.selected_players.teamOne.player_contract
    );
    console.log(
      "!!!!!!!!!!!!!!! 2",
      this.props.selected_players.teamTwo.player_contract
    );

    console.log("props1", this.props);
    console.log("props2", this.props.selected_players.teamOne.player_id.length);
    console.log("props3", this.props.selected_players.teamTwo.player_id);
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

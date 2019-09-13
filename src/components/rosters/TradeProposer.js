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
      this.setState({
        team_one_failure_message: "",
        team_two_failure_message: "",
        success_message: ""
      });
    }
  }

  handleTrade() {
    // setting local vars to check for trade success because setstate is having race conditions
    let mytestvar1 = "";
    let mytestvar2 = "";
    // get team salary

    //team one
    let teamOneTotalSalary = this.props.team_salaries_total.teamOne;
    let teamOneContractList = this.props.selected_players.teamOne
      .player_contract;
    // probably should name this outgoing contracts
    let teamOneTotalContracts = teamOneContractList.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );
    // do the math for the trade buffer per NBA rules
    let tradeBufferOne = teamOneTotalContracts * 1.25 + 100000;

    //team two
    let teamTwoTotalSalary = this.props.team_salaries_total.teamTwo;
    let teamTwoContractList = this.props.selected_players.teamTwo
      .player_contract;
    // probably should name this outgoing contracts
    let teamTwoTotalContracts = teamTwoContractList.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );
    // do the math for the trade buffer per NBA rules
    let tradeBufferTwo = teamTwoTotalContracts * 1.25 + 100000;

    //trade logic branching

    // TEAM ONE LOGIC

    if (teamOneTotalSalary > 109140000) {
      // sceanrio one

      // check to see if the trade logic is valid for team two
      if (teamTwoTotalContracts <= tradeBufferOne == false) {
        let teamOneName = this.props.currentTeams.teamOne;
        let teamOneTradeDeficit = Math.ceil(
          teamTwoTotalContracts - tradeBufferOne
        );

        mytestvar1 = "fail";
        this.setState({
          team_one_failure_message: `Error: ${teamOneName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamOneTradeDeficit} from the ${teamOneName} incoming trade value to make the trade successful.`
        });
      } else {
        this.setState({
          team_one_failure_message: ""
        });
      }
    } else {
      // sceanrio two

      // trade logic for teams under cap.
      // 1. they can trade however they like if they start and end under the cap
      // 2. if they end up over the cap + 100k they must follow the normal 125% + 100k rules
      if (
        teamOneTotalSalary + teamTwoTotalContracts - teamOneTotalContracts <
        109240000
      ) {
        console.log("branch logic t1, s2");
        this.setState({
          team_one_failure_message: ""
        });
      } else {
        console.log("branch logic t1, s1");
        // run s1 logic

        /// re-use s1 logic, combine at some point

        // check to see if the trade logic is valid for team two
        if (teamTwoTotalContracts <= tradeBufferOne == false) {
          let teamOneName = this.props.currentTeams.teamOne;
          let teamOneTradeDeficit = Math.ceil(
            teamTwoTotalContracts - tradeBufferOne
          );
          mytestvar1 = "fail";
          this.setState({
            team_one_failure_message: `Error: ${teamOneName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamOneTradeDeficit} from the ${teamOneName} incoming trade value to make the trade successful.`
          });
        } else {
          this.setState({
            team_one_failure_message: ""
          });
        }
      }
    }

    // TEAM TWO LOGIC
    if (teamTwoTotalSalary > 109140000) {
      // sceanrio one

      // check to see if the trade logic is valid for team two
      if (teamOneTotalContracts <= tradeBufferTwo == false) {
        let teamTwoName = this.props.currentTeams.teamTwo;
        let teamTwoTradeDeficit = Math.ceil(
          teamOneTotalContracts - tradeBufferTwo
        );
        mytestvar2 = "fail";
        this.setState({
          team_two_failure_message: `Error: ${teamTwoName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamTwoTradeDeficit} from the ${teamTwoName} incoming trade value to make the trade successful.`
        });
      } else {
        this.setState({
          team_two_failure_message: ""
        });
      }
    } else {
      // sceanrio two

      // trade logic for teams under cap.
      // 1. they can trade however they like if they start and end under the cap
      // 2. if they end up over the cap + 100k they must follow the normal 125% + 100k rules
      if (
        teamTwoTotalSalary + teamOneTotalContracts - teamTwoTotalContracts <
        109240000
      ) {
        // just pass sucess for this part
        console.log("branch logic t2, s2");

        this.setState({
          team_two_failure_message: ""
        });
      } else {
        console.log("branch logic t2, s1");
        // run s1 logic

        /// re-use s1 logic, combine at some point

        // check to see if the trade logic is valid for team two
        if (teamOneTotalContracts <= tradeBufferTwo == false) {
          let teamTwoName = this.props.currentTeams.teamTwo;
          let teamTwoTradeDeficit = Math.ceil(
            teamOneTotalContracts - tradeBufferTwo
          );
          mytestvar2 = "fail";
          this.setState({
            team_two_failure_message: `Error: ${teamTwoName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamTwoTradeDeficit} from the ${teamTwoName} incoming trade value to make the trade successful.`
          });
        } else {
          this.setState({
            team_two_failure_message: ""
          });
        }
      }
    }

    // BOTH TEAM SUCCESS LOGIC

    if (mytestvar1.length == 0 && mytestvar2.length == 0) {
      this.setState({
        success_message: "TRADE SUCCESSFUL"
      });
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

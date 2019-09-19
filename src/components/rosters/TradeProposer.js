import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";

class TradeProposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team_one_failure_message: "",
      team_two_failure_message: "",
      success_message: ""
    };
    this.handleTrade = this.handleTrade.bind(this);
    this.isHiddenFailMessageOne = this.isHiddenFailMessageOne.bind(this);
    this.isHiddenFailMessageTwo = this.isHiddenFailMessageTwo.bind(this);
    this.isHiddenSuccessMessage = this.isHiddenSuccessMessage.bind(this);
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
    // SET VARS THAT TRADE WILL USE FOR FORMULAS

    // setting local vars to check for trade success because setstate is having race conditions
    let teamOneTradeTest = "";
    let teamTwoTradeTest = "";

    // team one vars
    let teamOneTotalSalary = this.props.team_salaries_total.teamOne;
    let teamOneContractList = this.props.selected_players.teamOne
      .player_contract;
    // probably should name this outgoing contracts
    let teamOneTotalContracts = teamOneContractList.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );
    // do the math for the trade buffer per NBA trade rules
    let tradeBufferOne = teamOneTotalContracts * 1.25 + 100000;

    //team two vars
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

    // TRADE LOGIC FORMULAS
    // IF TEAM INITIATES TRADE WHILE OVER THE CAP (scenario 1)
    // 1. they must only have incoming salaries that are <= 125% + 100k of their outgoing salaries
    // IF TEAM INITIATES TRADE WHILE UNDER THE CAP (scenario 2)
    // 1. they can trade however they like if they start and end under the cap
    // 2. if they end up over the cap + 100k, they must follow the normal 125% + 100k rules (aka scenario 1)

    // TEAM ONE LOGIC

    // team 1 | scenario 1
    if (teamOneTotalSalary > 109140000) {
      // check to see if incoming contracts from team two are less then the outgoing contracts
      if (teamTwoTotalContracts <= tradeBufferOne == false) {
        let teamOneName = this.props.currentTeams.teamOne;
        let teamOneTradeDeficit = Math.ceil(
          teamTwoTotalContracts - tradeBufferOne
        );
        // if team one is over the cap, and their incoming contracts are more then they outgoing contracts...the trade fails
        teamOneTradeTest = "fail";
        this.setState({
          team_one_failure_message: `${teamOneName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamOneTradeDeficit} from the ${teamOneName} incoming trade value to make the trade successful.`
        });
      }
      // if team one is over the cap, and their incoming contracts are not more then their outgoing contracts...the trade is successful
      else {
        this.setState({
          team_one_failure_message: ""
        });
      }
    }
    // if the team has a team salary under the cap then they can trade however they want as long as they stay under the cap
    else {
      // team 1 | scenario 2
      // check to see if team will remain under the cap after trade, if so its valid
      if (
        teamOneTotalSalary + teamTwoTotalContracts - teamOneTotalContracts <
        109240000
      ) {
        this.setState({
          team_one_failure_message: ""
        });
      }
      // if they will end up over the cap they must follow scenario 1 rules
      else {
        // back to team 1 | scenario 1
        // TODO (reast): copied logic from top of if statement, combine them

        // check to see if the trade logic is valid for team two
        if (teamTwoTotalContracts <= tradeBufferOne == false) {
          let teamOneName = this.props.currentTeams.teamOne;
          let teamOneTradeDeficit = Math.ceil(
            teamTwoTotalContracts - tradeBufferOne
          );
          teamOneTradeTest = "fail";
          this.setState({
            team_one_failure_message: `${teamOneName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamOneTradeDeficit} from the ${teamOneName} incoming trade value to make the trade successful.`
          });
        } else {
          this.setState({
            team_one_failure_message: ""
          });
        }
      }
    }

    // TEAM TWO LOGIC

    // team 2 | scenario 1
    if (teamTwoTotalSalary > 109140000) {
      // sceanrio one

      // check to see if incoming contracts from team one are less then the outgoing contracts
      if (teamOneTotalContracts <= tradeBufferTwo == false) {
        let teamTwoName = this.props.currentTeams.teamTwo;
        let teamTwoTradeDeficit = Math.ceil(
          teamOneTotalContracts - tradeBufferTwo
        );
        // if team two is over the cap, and their incoming contracts are more then they outgoing contracts...the trade fails
        teamTwoTradeTest = "fail";
        this.setState({
          team_two_failure_message: `${teamTwoName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamTwoTradeDeficit} from the ${teamTwoName} incoming trade value to make the trade successful.`
        });
      }
      // if team two is over the cap, and their incoming contracts are not more then their outgoing contracts...the trade is successful
      else {
        this.setState({
          team_two_failure_message: ""
        });
      }
    }
    // if the team has a team salary under the cap then they can trade however they want as long as they stay under the cap
    else {
      // team 2 | scenario 2
      // check to see if team will remain under the cap after trade, if so its valid
      if (
        teamTwoTotalSalary + teamOneTotalContracts - teamTwoTotalContracts <
        109240000
      ) {
        this.setState({
          team_two_failure_message: ""
        });
      }
      // if they will end up over the cap they must follow scenario 1 rules
      else {
        // back to team 2 | scenario 1
        // TODO (reast): copied logic from top of if statement, combine them

        // check to see if the trade logic is valid for team one
        if (teamOneTotalContracts <= tradeBufferTwo == false) {
          let teamTwoName = this.props.currentTeams.teamTwo;
          let teamTwoTradeDeficit = Math.ceil(
            teamOneTotalContracts - tradeBufferTwo
          );
          teamTwoTradeTest = "fail";
          this.setState({
            team_two_failure_message: `${teamTwoName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamTwoTradeDeficit} from the ${teamTwoName} incoming trade value to make the trade successful.`
          });
        } else {
          this.setState({
            team_two_failure_message: ""
          });
        }
      }
    }

    // BOTH TEAM SUCCESS LOGIC
    if (teamOneTradeTest.length == 0 && teamTwoTradeTest.length == 0) {
      this.setState({
        success_message: "TRADE SUCCESSFUL"
      });
    }
  }

  isHiddenFailMessageOne() {
    if (this.state.team_one_failure_message.length == 0) {
      return "p-3 bg-danger my-2 rounded hide";
    } else {
      return "p-3 bg-danger my-2 rounded";
    }
  }

  isHiddenFailMessageTwo() {
    if (this.state.team_two_failure_message.length == 0) {
      return "p-3 bg-danger my-2 rounded hide";
    } else {
      return "p-3 bg-danger my-2 rounded";
    }
  }

  isHiddenSuccessMessage() {
    if (this.state.success_message.length == 0) {
      return "p-3 bg-success my-2 rounded hide";
    } else {
      return "p-3 bg-success my-2 rounded";
    }
  }

  render() {
    if (
      this.props.selected_players.teamOne.player_id.length !== 0 &&
      this.props.selected_players.teamTwo.player_id.length !== 0
    ) {
      return (
        <div id="trade-proposer-container">
          {/*
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
*/}

          <Card>
            <CardHeader>
              <span className="team-info-highlight">Make the TRADE!</span>
            </CardHeader>
            <CardBody id="trade-proposer-card-body">
              <Button
                color="success"
                id="trade-proposer-button"
                type="button"
                onClick={this.handleTrade}
              >
                SUBMIT
              </Button>

              <CardText>
                <div id="trade-validator-error-message-container">
                  <div
                    className={this.isHiddenFailMessageOne()}
                    id="trade-validator-error-message-one"
                  >
                    <Toast class="toast">
                      <ToastHeader>TRADE UNSUCCESSFUL:</ToastHeader>
                      <ToastBody>
                        {this.state.team_one_failure_message}
                      </ToastBody>
                    </Toast>
                  </div>

                  <div
                    className={this.isHiddenFailMessageTwo()}
                    id="trade-validator-error-message-two"
                  >
                    <Toast>
                      <ToastHeader>TRADE UNSUCCESSFUL:</ToastHeader>
                      <ToastBody>
                        {this.state.team_two_failure_message}
                      </ToastBody>
                    </Toast>
                  </div>
                </div>

                <div
                  className={this.isHiddenSuccessMessage()}
                  id="trade-validator-success-message"
                >
                  <Toast>
                    <ToastBody>{this.state.success_message}</ToastBody>
                  </Toast>
                </div>
              </CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <h2></h2>;
    }
  }
}

export default TradeProposer;

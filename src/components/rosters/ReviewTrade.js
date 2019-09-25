import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

import { Progress, ListGroupItem, ListGroup } from "reactstrap";

class ReviewTrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomingPlayersMessage: "",
      capAmountMessage: "",
      team_one_failure_message: "",
      team_two_failure_message: "",
      success_message: "",
      teamOneTradeDeficit: "",
      teamTwoTradeDeficit: "",
      teamOneBarPercent: "",
      teamTwoBarPercent: "",
      tradeIcon: faCheckCircle
    };
    this.handleTrade = this.handleTrade.bind(this);
    this.handleListOne = this.handleListOne.bind(this);
    this.handleListTwo = this.handleListTwo.bind(this);
    this.filterByPlayerTeamOne = this.filterByPlayerTeamOne.bind(this);
    this.filterByPlayerTeamTwo = this.filterByPlayerTeamTwo.bind(this);
  }

  tradeIconStatus() {
    if (this.state.tradeIcon == faTimesCircle) {
      return "fail";
    } else {
      return "success";
    }
  }

  filterByPlayerTeamOne(item) {
    const containerValue = "teamOne";
    if (
      this.props.selected_players[containerValue].player_id.includes(item.id)
    ) {
      return true;
    } else {
      return false;
    }
  }

  filterByPlayerTeamTwo(item) {
    const containerValue = "teamTwo";
    if (
      this.props.selected_players[containerValue].player_id.includes(item.id)
    ) {
      return true;
    } else {
      return false;
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

    console.log("<<<<<<<< - teamONETotalSalary", teamOneTotalSalary);
    console.log("<<<<<<<< - teamONEContractList", teamOneContractList);
    console.log("<<<<<<<< - teamONETotalContracts", teamOneTotalContracts);
    console.log("<<<<<<<< - tradeBufferONE", tradeBufferOne);

    console.log("<<<<<<<< - teamTWOTotalSalary", teamTwoTotalSalary);
    console.log("<<<<<<<< - teamTWOContractList", teamTwoContractList);
    console.log("<<<<<<<< - teamTWOTotalContracts", teamTwoTotalContracts);
    console.log("<<<<<<<< - tradeBufferTWO", tradeBufferTwo);

    // TRADE LOGIC FORMULAS
    // IF TEAM INITIATES TRADE WHILE OVER THE CAP (scenario 1)
    // 1. they must only have incoming salaries that are <= 125% + 100k of their outgoing salaries
    // IF TEAM INITIATES TRADE WHILE UNDER THE CAP (scenario 2)
    // 1. they can trade however they like if they start and end under the cap
    // 2. if they end up over the cap + 100k, they must follow the normal 125% + 100k rules (aka scenario 1)

    // TEAM ONE LOGIC

    // team 1 | scenario 1
    if (teamOneTotalSalary > 109140000) {
      console.log("TEAM 1 SCEN 1");
      // check to see if incoming contracts from team two are less then the outgoing contracts
      if (teamTwoTotalContracts <= tradeBufferOne == false) {
        let teamOneName = this.props.currentTeams.teamOne;
        let teamOneTradeDeficit = Math.ceil(
          teamTwoTotalContracts - tradeBufferOne
        );
        console.log("TEAM 1 SCEN 1 ---- IF BLOCK", teamOneTradeDeficit);
        //const teamOneBarPercentVar = tradeBufferOne / teamOneTradeDeficit;

        this.setState({
          teamOneBarPercent: tradeBufferOne / teamOneTradeDeficit
        });

        console.log("TEAM 1 SCEN 1 ---- IF BLOCK .. CK STATE", this.state);
        console.log(
          "TEAM 1 SCEN 1 ---- IF BLOCK .. tradeBufferOne",
          tradeBufferOne
        );
        console.log(
          "TEAM 1 SCEN 1 ---- IF BLOCK .. teamOneTradeDeficit",
          teamOneTradeDeficit
        );
        // if team one is over the cap, and their incoming contracts are more then they outgoing contracts...the trade fails
        teamOneTradeTest = "fail";

        const teamOneBarPercentTemp = (
          teamOneTradeDeficit / tradeBufferTwo
        ).toFixed(2);

        this.setState({
          team_one_failure_message: `${teamOneName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamOneTradeDeficit} from the ${teamOneName} incoming trade value to make the trade successful.`
        });

        this.setState({
          tradeIcon: faTimesCircle
        });

        this.setState({
          teamOneBarPercent: teamOneBarPercentTemp.slice(-2)
        });
      }
      // if team one is over the cap, and their incoming contracts are not more then their outgoing contracts...the trade is successful
      else {
        console.log("TEAM 1 SCEN 1 ---- ELSE BLOCK");
        this.setState({
          team_one_failure_message: ""
        });

        // bar info
        this.setState({
          teamOneBarPercent: "0"
        });
      }
    }
    // if the team has a team salary under the cap then they can trade however they want as long as they stay under the cap
    else {
      console.log("TEAM 1 SCEN 2");
      // team 1 | scenario 2
      // check to see if team will remain under the cap after trade, if so its valid
      if (
        teamOneTotalSalary + teamTwoTotalContracts - teamOneTotalContracts <
        109240000
      ) {
        this.setState({
          team_one_failure_message: ""
        });

        // bar info
        this.setState({
          teamOneBarPercent: "0"
        });
      }
      // if they will end up over the cap they must follow scenario 1 rules
      else {
        console.log("TEAM 1 SCEN 1 REVISITED");
        // back to team 1 | scenario 1
        // TODO (reast): copied logic from top of if statement, combine them

        // check to see if the trade logic is valid for team two
        if (teamTwoTotalContracts <= tradeBufferOne == false) {
          let teamOneName = this.props.currentTeams.teamOne;
          let teamOneTradeDeficit = Math.ceil(
            teamTwoTotalContracts - tradeBufferOne
          );

          const teamOneBarPercentTemp = (
            teamOneTradeDeficit / tradeBufferTwo
          ).toFixed(2);

          teamOneTradeTest = "fail";
          this.setState({
            team_one_failure_message: `${teamOneName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamOneTradeDeficit} from the ${teamOneName} incoming trade value to make the trade successful.`
          });

          // bar setting
          this.setState({
            teamOneBarPercent: teamOneBarPercentTemp.slice(-2)
          });

          this.setState({
            tradeIcon: faTimesCircle
          });
        } else {
          this.setState({
            team_one_failure_message: ""
          });

          // bar info
          this.setState({
            teamOneBarPercent: "0"
          });
        }
      }
    }

    // TEAM TWO LOGIC

    // team 2 | scenario 1
    if (teamTwoTotalSalary > 109140000) {
      console.log("TEAM 2 SCEN 1");
      // sceanrio one

      // check to see if incoming contracts from team one are less then the outgoing contracts
      if (teamOneTotalContracts <= tradeBufferTwo == false) {
        let teamTwoName = this.props.currentTeams.teamTwo;
        let teamTwoTradeDeficit = Math.ceil(
          teamOneTotalContracts - tradeBufferTwo
        );
        console.log("$$$$$ uhhhhh teamTwoTradeDeficit", teamTwoTradeDeficit);

        // if team two is over the cap, and their incoming contracts are more then they outgoing contracts...the trade fails
        teamTwoTradeTest = "fail";
        this.setState({
          team_two_failure_message: `${teamTwoName} incoming slaries exceed the 125% plus $100,000 rule. Cut ${teamTwoTradeDeficit} from the ${teamTwoName} incoming trade value to make the trade successful.`
        });

        console.log("+++++ short numb", teamTwoTradeDeficit / tradeBufferOne);
        console.log(
          "+++++ short numb 2",
          (teamTwoTradeDeficit / tradeBufferOne).toFixed(2)
        );
        const teamTwoBarPercentTemp = (
          teamTwoTradeDeficit / tradeBufferOne
        ).toFixed(2);
        //console.log("+++++ short numb 3", test.slice(-2));

        // bar setting
        this.setState({
          teamTwoBarPercent: teamTwoBarPercentTemp.slice(-2)
        });

        this.setState({
          tradeIcon: faTimesCircle
        });
      }
      // if team two is over the cap, and their incoming contracts are not more then their outgoing contracts...the trade is successful
      else {
        this.setState({
          team_two_failure_message: ""
        });

        // bar setting
        this.setState({
          teamTwoBarPercent: "0"
        });
      }
    }
    // if the team has a team salary under the cap then they can trade however they want as long as they stay under the cap
    else {
      console.log("TEAM 2 SCEN 2");
      // team 2 | scenario 2
      // check to see if team will remain under the cap after trade, if so its valid
      if (
        teamTwoTotalSalary + teamOneTotalContracts - teamTwoTotalContracts <
        109240000
      ) {
        this.setState({
          team_two_failure_message: ""
        });

        // bar setting
        this.setState({
          teamTwoBarPercent: "0"
        });
      }
      // if they will end up over the cap they must follow scenario 1 rules
      else {
        console.log("TEAM 2 SCEN 1 REVISITED");
        // back to team 2 | scenario 1
        // TODO (reast): copied logic from top of if statement, combine them

        // check to see if the trade logic is valid for team one
        if (teamOneTotalContracts <= tradeBufferTwo == false) {
          let teamTwoName = this.props.currentTeams.teamTwo;
          let teamTwoTradeDeficit = Math.ceil(
            teamOneTotalContracts - tradeBufferTwo
          );

          console.log("$$$$$ uhhhhh teamTwoTradeDeficit", teamTwoTradeDeficit);

          teamTwoTradeTest = "fail";
          this.setState({
            teamTwoTradeDeficit: teamTwoTradeDeficit
          });

          const teamTwoBarPercentTemp = (
            teamTwoTradeDeficit / tradeBufferOne
          ).toFixed(2);

          // bar setting
          this.setState({
            teamTwoBarPercent: teamTwoBarPercentTemp.slice(-2)
          });

          this.setState({
            tradeIcon: faTimesCircle
          });
        } else {
          this.setState({
            teamTwoTradeDeficit: ""
          });

          // bar setting
          this.setState({
            teamTwoBarPercent: "0"
          });
        }
      }
    }

    // BOTH TEAM SUCCESS LOGIC
    if (teamOneTradeTest.length == 0 && teamTwoTradeTest.length == 0) {
      this.setState({
        success_message: "TRADE SUCCESSFUL"
      });

      this.setState({
        tradeIcon: faCheckCircle
      });
    }
  }

  handleListOne() {
    console.log(
      "inside handlelist - team1 players",
      this.props.selected_players.teamOne
    );
    console.log(
      "inside handlelist - team2 players",
      this.props.selected_players.teamTwo
    );

    console.log("%%%%% props", this.props);

    const playerList = this.props.players;
    console.log("******* playerList !== undefined", playerList);

    if (playerList !== undefined) {
      const playerListOne = this.props.selected_players.teamOne;
      console.log("eff", playerListOne);

      const filteredPlayerListOne = playerList.filter(
        this.filterByPlayerTeamOne
      );

      // only filter in players that the user has selected in the roster ui

      //const filteredPlayerListOne = playerList.filter(this.filterByPlayer);

      console.log("filteredPlayerList", filteredPlayerListOne);

      const listItems = filteredPlayerListOne.map(player => (
        <li>
          {player.first_name} {player.last_name}{" "}
          {"( " + player.contract_amount + " )"}
        </li>
      ));

      return (
        <div>
          <p>{this.props.currentTeams.teamOne}</p>
          <div>{/* <ListGroup>{listItems}</ListGroup> */}</div>
          <ul>{listItems}</ul>
        </div>
      );
    } else {
    }
  }

  handleListTwo() {
    console.log(
      "inside handlelist - team1 players",
      this.props.selected_players.teamOne
    );
    console.log(
      "inside handlelist - team2 players",
      this.props.selected_players.teamTwo
    );

    console.log("%%%%% props", this.props);

    const playerList = this.props.players;
    console.log("******* playerList !== undefined", playerList);

    if (playerList !== undefined) {
      const playerListTwo = this.props.selected_players.teamTwo;
      //console.log("eff", playerListOne);

      console.log(
        "!!!!!!!!!!!!!!! - !!!!!!!!!!!!!!!!!!!! playerList",
        playerList
      );

      const filteredPlayerListTwo = playerList.filter(
        this.filterByPlayerTeamTwo
      );

      // only filter in players that the user has selected in the roster ui

      //const filteredPlayerListOne = playerList.filter(this.filterByPlayer);

      console.log("filteredPlayerList", filteredPlayerListTwo);

      const listItems = filteredPlayerListTwo.map(player => (
        <li>
          {player.first_name} {player.last_name}{" "}
          {"( " + player.contract_amount + " )"}
        </li>
      ));

      return (
        <div>
          <p>{this.props.currentTeams.teamTwo}</p>
          <div>{/* <ListGroup>{listItems}</ListGroup> */}</div>
          <ul>{listItems}</ul>
        </div>
      );
    } else {
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentTeams !== prevProps.currentTeams ||
      this.props.selected_players !== prevProps.selected_players
    ) {
      this.handleTrade();
    }
  }

  render() {
    return (
      <div id="new-review-panel">
        <FontAwesomeIcon icon={faCheckCircle} id="trade-status-fail" />
        <FontAwesomeIcon icon={faTimesCircle} id="trade-status-success" />
        <h1>this is the new trade review area</h1>
        <div id="bar-container-main">
          <div className="text-center">
            {" "}
            incoming salary for team ONE 25%{" "}
            {this.props.outgoing_players_salary.teamTwo}
          </div>

          <div className="text-center">
            {" "}
            incoming salary for team TWO 25%{" "}
            {this.props.outgoing_players_salary.teamOne}
          </div>
          <div className="text-center">
            TEAM ONES NAME IS: {this.props.currentTeams.teamOne} AND{" "}
            {this.state.teamTwoTradeDeficit}
          </div>
          <div className="text-center">
            TEAM ONES ERROR IS: {this.state.team_one_failure_message}
          </div>
          <div className="text-center">
            TEAM ONES BAR IS: {this.state.teamOneBarPercent}
          </div>

          <div className="text-center">
            TEAM TWOS NAME IS: {this.props.currentTeams.teamTwo} AND{" "}
            {this.state.teamTwoTradeDeficit}
          </div>
          <div className="text-center">
            TEAM TWOS ERROR IS: {this.state.team_two_failure_message}
          </div>
          <div className="text-center">
            TEAM TWOS BAR IS: {this.state.teamTwoBarPercent}
          </div>

          <div className="text-center">
            SUCCESSFUL ERROR IS: {this.state.success_message}
          </div>
          <div id="trade-helper-text">
            {this.state.team_one_failure_message.length == 0
              ? this.state.team_two_failure_message
              : this.state.team_one_failure_message}
          </div>

          <div id="bar-sub-container">
            <Progress
              className="bar"
              id="flip-bar"
              value={this.state.teamOneBarPercent}
            />
            {console.log(
              "####### this.state.tradeIcon ######",
              this.state.tradeIcon
            )}
            <FontAwesomeIcon
              icon={this.state.tradeIcon}
              id="trade-status-success"
              className={this.tradeIconStatus()}
            />
            <Progress className="bar" value={this.state.teamTwoBarPercent} />
          </div>

          <div id="player-list-review-container">
            <div id="review-list-one">{this.handleListOne(this.props)}</div>
            <div id="review-list-one">{this.handleListTwo(this.props)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewTrade;

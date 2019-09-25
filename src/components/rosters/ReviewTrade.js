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
    this.statusTextColor = this.statusTextColor.bind(this);
    this.tradeHelperText = this.tradeHelperText.bind(this);
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

        // if team one is over the cap, and their incoming contracts are more then they outgoing contracts...the trade fails
        teamOneTradeTest = "fail";

        const teamOneBarPercentTemp = (
          teamOneTradeDeficit / tradeBufferTwo
        ).toFixed(2);

        this.setState({
          team_one_failure_message: `${teamOneName} incoming salaries exceed the 125% plus $100,000 rule. Cut ${teamOneTradeDeficit} from the ${teamOneName} incoming trade value to make the trade successful.`
        });

        this.setState({
          tradeIcon: faTimesCircle
        });

        this.setState({
          success_message: "TRADE INVALID"
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
            team_one_failure_message: `${teamOneName} incoming salaries exceed the 125% plus $100,000 rule. Cut ${teamOneTradeDeficit} from the ${teamOneName} incoming trade value to make the trade successful.`
          });

          // bar setting
          this.setState({
            teamOneBarPercent: teamOneBarPercentTemp.slice(-2)
          });

          this.setState({
            tradeIcon: faTimesCircle
          });

          this.setState({
            success_message: "TRADE INVALID"
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

        // if team two is over the cap, and their incoming contracts are more then they outgoing contracts...the trade fails
        teamTwoTradeTest = "fail";
        this.setState({
          team_two_failure_message: `${teamTwoName} incoming salaries exceed the 125% plus $100,000 rule. Cut ${teamTwoTradeDeficit} from the ${teamTwoName} incoming trade value to make the trade successful.`
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

        this.setState({
          success_message: "TRADE INVALID"
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

          teamTwoTradeTest = "fail";

          this.setState({
            team_two_failure_message: `${teamTwoName} incoming salaries exceed the 125% plus $100,000 rule. Cut ${teamTwoTradeDeficit} from the ${teamTwoName} incoming trade value to make the trade successful.`
          });

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
          this.setState({
            success_message: "TRADE INVALID"
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
    const playerList = this.props.players;

    if (playerList !== undefined) {
      const playerListOne = this.props.selected_players.teamOne;

      const filteredPlayerListOne = playerList.filter(
        this.filterByPlayerTeamOne
      );

      // only filter in players that the user has selected in the roster ui

      //const filteredPlayerListOne = playerList.filter(this.filterByPlayer);

      const listItems = filteredPlayerListOne.map(player => (
        <li key={player.id}>
          {player.first_name} {player.last_name}{" "}
          {"( " + player.contract_amount + " )"}
        </li>
      ));

      return (
        <div className="list-review-sub-container">
          <h3 className="list-review-header">
            {this.props.currentTeams.teamOne}
          </h3>
          <div>{/* <ListGroup>{listItems}</ListGroup> */}</div>
          <ul className="trade-review-player-list">{listItems}</ul>
        </div>
      );
    } else {
    }
  }

  handleListTwo() {
    const playerList = this.props.players;

    if (playerList !== undefined) {
      const playerListTwo = this.props.selected_players.teamTwo;

      const filteredPlayerListTwo = playerList.filter(
        this.filterByPlayerTeamTwo
      );

      // only filter in players that the user has selected in the roster ui

      //const filteredPlayerListOne = playerList.filter(this.filterByPlayer);

      const listItems = filteredPlayerListTwo.map(player => (
        <li>
          {player.first_name} {player.last_name}{" "}
          {"( " + player.contract_amount + " )"}
        </li>
      ));

      return (
        <div className="list-review-sub-container">
          <h3 className="list-review-header">
            {this.props.currentTeams.teamTwo}
          </h3>
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

  statusTextColor(state_status) {
    if (state_status == faCheckCircle) {
      return "success";
    } else {
      return "fail";
    }
  }

  tradeHelperText(team_one_failure_message) {
    if (team_one_failure_message == 0) {
      //const tempMessage = this.state.team_two_failure_message;

      //return this.state.team_two_failure_message;

      const tempMessage = this.state.team_two_failure_message.split(" ");

      const teamNameTemp1 = tempMessage[0];

      const teamSalTemp1 = tempMessage[10];

      const sectionOneSlice = tempMessage.slice(1, 10);

      const sectionTwoSlice = tempMessage.slice(11);

      return (
        <div>
          <div>
            <span className="fail">{teamNameTemp1}</span>{" "}
            {sectionOneSlice.join(" ")}{" "}
            <span className="fail">{teamSalTemp1}</span>{" "}
            {sectionTwoSlice.join(" ")}
          </div>
        </div>
      );
    } else {
      const tempMessage = this.state.team_one_failure_message.split(" ");

      const teamNameTemp1 = tempMessage[0];

      const teamSalTemp1 = tempMessage[10];

      const sectionOneSlice = tempMessage.slice(1, 10);

      const sectionTwoSlice = tempMessage.slice(11);

      return (
        <div>
          <div>
            <span className="fail">{teamNameTemp1}</span>{" "}
            {sectionOneSlice.join(" ")}{" "}
            <span className="fail">{teamSalTemp1}</span>{" "}
            {sectionTwoSlice.join(" ")}
          </div>
        </div>
      );
    }
  }

  /*
    {this.state.team_one_failure_message.length == 0
        ? this.state.team_two_failure_message
        : this.state.team_one_failure_message}
        */
  //}

  render() {
    return (
      <div id="bar-container-main">
        <h2
          id="trade-status-text"
          className={this.statusTextColor(this.state.tradeIcon)}
        >
          {this.state.success_message}
        </h2>

        <div id="trade-helper-text">
          {this.tradeHelperText(this.state.team_one_failure_message.length)}
        </div>

        <div id="bar-sub-container">
          <Progress
            className="bar"
            animated
            color="warning"
            id="flip-bar"
            value={this.state.teamOneBarPercent}
          />
          <FontAwesomeIcon
            icon={this.state.tradeIcon}
            id="trade-status-success"
            className={this.tradeIconStatus()}
          />
          <Progress
            className="bar"
            animated
            color="warning"
            value={this.state.teamTwoBarPercent}
          />
        </div>

        <div id="player-list-review-container">
          <div>{this.handleListOne(this.props)}</div>
          <div>{this.handleListTwo(this.props)}</div>
        </div>
      </div>
    );
  }
}

export default ReviewTrade;

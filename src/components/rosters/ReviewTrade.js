import React from "react";
//import { connect } from "react-redux";
//import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { Progress } from "reactstrap";

class ReviewTrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team_one_failure_message: "",
      team_two_failure_message: "",
      success_message: "",
      teamOneTradeDeficit: "",
      teamTwoTradeDeficit: "",
      teamOneBarPercent: "",
      teamTwoBarPercent: "",
      tradeIcon: faCheckCircle
    };
  }

  handleTrade() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    });
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
      if (teamTwoTotalContracts <= tradeBufferOne === false) {
        let teamOneName = this.props.currentTeams.teamOne;
        let teamOneTradeDeficit = Math.ceil(
          teamTwoTotalContracts - tradeBufferOne
        );

        //const teamOneBarPercentVar = tradeBufferOne / teamOneTradeDeficit;

        this.setState({
          teamOneBarPercent: tradeBufferOne / teamOneTradeDeficit
        });

        // if team one is over the cap, and their incoming contracts are more then they outgoing contracts...the trade fails
        teamOneTradeTest = "fail";

        const teamOneBarPercentTemp = (
          teamOneTradeDeficit / tradeBufferTwo
        ).toFixed(2);

        this.setState({
          team_one_failure_message:
            teamOneName +
            " incoming salaries exceed the 125% plus $100,000 rule. Cut " +
            formatter.format(teamOneTradeDeficit) +
            " from the " +
            teamOneName +
            " incoming trade value to make the trade successful."
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
        // back to team 1 | scenario 1
        // TODO (reast): copied logic from top of if statement, combine them

        // check to see if the trade logic is valid for team two
        if (teamTwoTotalContracts <= tradeBufferOne === false) {
          let teamOneName = this.props.currentTeams.teamOne;
          let teamOneTradeDeficit = Math.ceil(
            teamTwoTotalContracts - tradeBufferOne
          );

          const teamOneBarPercentTemp = (
            teamOneTradeDeficit / tradeBufferTwo
          ).toFixed(2);

          teamOneTradeTest = "fail";

          this.setState({
            team_one_failure_message:
              teamOneName +
              " incoming salaries exceed the 125% plus $100,000 rule. Cut " +
              formatter.format(teamOneTradeDeficit) +
              " from the " +
              teamOneName +
              " incoming trade value to make the trade successful."
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
      // sceanrio one

      // check to see if incoming contracts from team one are less then the outgoing contracts
      if (teamOneTotalContracts <= tradeBufferTwo === false) {
        let teamTwoName = this.props.currentTeams.teamTwo;
        let teamTwoTradeDeficit = Math.ceil(
          teamOneTotalContracts - tradeBufferTwo
        );

        // if team two is over the cap, and their incoming contracts are more then they outgoing contracts...the trade fails
        teamTwoTradeTest = "fail";

        this.setState({
          team_two_failure_message:
            teamTwoName +
            " incoming salaries exceed the 125% plus $100,000 rule. Cut " +
            formatter.format(teamTwoTradeDeficit) +
            " from the " +
            teamTwoName +
            " incoming trade value to make the trade successful."
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
        // back to team 2 | scenario 1
        // TODO (reast): copied logic from top of if statement, combine them

        // check to see if the trade logic is valid for team one
        if (teamOneTotalContracts <= tradeBufferTwo === false) {
          let teamTwoName = this.props.currentTeams.teamTwo;
          let teamTwoTradeDeficit = Math.ceil(
            teamOneTotalContracts - tradeBufferTwo
          );

          teamTwoTradeTest = "fail";

          this.setState({
            team_two_failure_message:
              teamTwoName +
              " incoming salaries exceed the 125% plus $100,000 rule. Cut " +
              formatter.format(teamTwoTradeDeficit) +
              " from the " +
              teamTwoName +
              " incoming trade value to make the trade successful."
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
    if (teamOneTradeTest.length === 0 && teamTwoTradeTest.length === 0) {
      this.setState({
        success_message: "TRADE SUCCESSFUL"
      });

      this.setState({
        tradeIcon: faCheckCircle
      });
    }
  }

  // helper function to filter out any player that was not selected by the user
  filterByPlayer(team, item) {
    if (this.props.selected_players[team].player_id.includes(item.id)) {
      return true;
    } else {
      return false;
    }
  }

  // function to construct lists of players selected for trade
  handleTradedPlayers() {
    const playerList = this.props.players;
    const currentTeams = this.props.currentTeams;
    const listHolder = [];

    // wait for data to be retrieved from db before list construction
    if (playerList !== undefined) {
      // perform the list construction for both teamOne & teamTwo
      for (var team in currentTeams) {
        const filteredPlayerList = playerList.filter(
          this.filterByPlayer.bind(this, team)
        );
        // for each player in the filtered list, create a list item for them
        const listItems = filteredPlayerList.map(
          player =>
            `<li key=${player.id}>
            ${player.first_name} ${player.last_name}
          </li>`
        );
        // push the list item into a holding array because it loops twice
        listHolder.push(
          `
          <div class="player-list-review-container">
            <div class="list-review-sub-container">
              <h3 class="list-review-header">
                ${this.props.currentTeams[team]}
              </h3>
              <ul class="trade-review-player-list">${listItems.join("")}</ul>
            </div>
          </div>
          `
        );
      }
      // return the main div element that contains both lists
      return (
        <div
          id="player-list-review-main-container"
          // dangerouslySetInnerHTML is subject to XSS, sanitize later
          dangerouslySetInnerHTML={{ __html: listHolder }}
        ></div>
      );
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

  // helper function to display error message if trade does't have successful contract amounts
  tradeHelperText(team_one_failure_message) {
    if (team_one_failure_message === 0) {
      // deconstruct the string stored in react state
      const tempMessage = this.state.team_two_failure_message.split(" ");
      const teamNameTemp1 = tempMessage[0];
      const teamSalTemp1 = tempMessage[10];
      const sectionOneSlice = tempMessage.slice(1, 10);
      const sectionTwoSlice = tempMessage.slice(11);
      // reconstruct the string inside html so it can be styled
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
    // if team one does have an error
    else {
      // deconstruct the string stored in react state
      const tempMessage = this.state.team_one_failure_message.split(" ");
      const teamNameTemp1 = tempMessage[0];
      const teamSalTemp1 = tempMessage[10];
      const sectionOneSlice = tempMessage.slice(1, 10);
      const sectionTwoSlice = tempMessage.slice(11);
      // reconstruct the string inside html so it can be styled
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

  render() {
    return (
      <div id="bar-container-main">
        <h2
          id="trade-status-text"
          className={
            this.state.tradeIcon === faCheckCircle ? "success" : "fail"
          }
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
            className={
              this.state.tradeIcon === faTimesCircle ? "fail" : "success"
            }
          />
          <Progress
            className="bar"
            animated
            color="warning"
            value={this.state.teamTwoBarPercent}
          />
        </div>
        {this.handleTradedPlayers()}
      </div>
    );
  }
}

export default ReviewTrade;

import React from "react";
import PlayerList from "../rosters/PlayerList";
import TradeInfo from "../rosters/TradeInfo";
import TradeProposer from "../rosters/TradeProposer";
import ReviewTrade from "../rosters/ReviewTrade";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { clearPlayerList } from "../../store/actions/playerActions";

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
    this.isHiddenPlayers = this.isHiddenPlayers.bind(this);
    this.isHiddenTeams = this.isHiddenTeams.bind(this);
    this.isHiddenTeamOne = this.isHiddenTeamOne.bind(this);
    this.isHiddenTeamTwo = this.isHiddenTeamTwo.bind(this);
    this.marginSpacer = this.marginSpacer.bind(this);
    this.marginSpacerTwo = this.marginSpacerTwo.bind(this);
    this.isHiddenPlayerSelectOne = this.isHiddenPlayerSelectOne.bind(this);
    this.isHiddenPlayerSelectTwo = this.isHiddenPlayerSelectTwo.bind(this);
  }
  // helper function to add class based on if player has been selected for trade
  isHiddenPlayers(selected_players) {
    if (
      selected_players.teamOne.player_id.length == 0 &&
      selected_players.teamTwo.player_id.length == 0
    ) {
      return "hide";
    }
  }

  // helper function to add class based on if team has been selected for trade
  isHiddenTeams(selected_teams) {
    if (
      selected_teams.teamOne.length == 0 &&
      selected_teams.teamTwo.length == 0
    ) {
      return "hide";
    }
  }

  // helper function to add class based on if team has been selected for trade
  isHiddenTeamOne(selected_teams) {
    if (selected_teams.teamOne.length == 0) {
      return "area-container hide";
    } else {
      return "area-container";
    }
  }

  // helper function to add class based on if team has been selected for trade
  isHiddenTeamTwo(selected_teams) {
    if (selected_teams.teamTwo.length == 0) {
      return "area-container hide";
    } else {
      return "area-container";
    }
  }

  marginSpacer(selected_teams) {
    const marginObj = {
      leftCont: "1rem",
      rightCont: "1rem"
    };

    if (selected_teams.teamOne.length == 0) {
      marginObj.rightCont = "51%";
    }

    if (selected_teams.teamTwo.length == 0) {
      marginObj.leftCont = "51%";
    }
    return marginObj;
  }

  marginSpacerTwo(selected_players) {
    const marginObj = {
      leftCont: "1rem",
      rightCont: "1rem"
    };

    if (selected_players.teamOne.player_id == 0) {
      marginObj.rightCont = "51%";
    }

    if (selected_players.teamTwo.player_id == 0) {
      marginObj.leftCont = "51%";
    }

    return marginObj;
  }

  // helper function to add class based on if team has been selected for trade
  isHiddenPlayerSelectOne(selected_players) {
    if (selected_players.teamOne.player_id == 0) {
      return "area-container hide";
    } else {
      return "area-container";
    }
  }

  // helper function to add class based on if team has been selected for trade
  isHiddenPlayerSelectTwo(selected_players) {
    if (selected_players.teamTwo.player_id == 0) {
      return "area-container hide";
    } else {
      return "area-container";
    }
  }

  componentDidUpdate(prevProps) {
    // need to do a check on prevProps so that the componentdidupdate doesn't infinitely update when state changes
    if (
      this.props.selected_teams.teamOne !== prevProps.selected_teams.teamOne
    ) {
      this.props.clearPlayerList({
        team_container: "teamOne"
      });
    }
    if (
      this.props.selected_teams.teamTwo !== prevProps.selected_teams.teamTwo
    ) {
      this.props.clearPlayerList({
        team_container: "teamTwo"
      });
    }
  }

  render() {
    // deconstruct props passed in from state
    const { teams } = this.props;
    const { players } = this.props;
    const { selected_teams } = this.props;
    const { selected_players } = this.props;
    const { team_salaries_total } = this.props;
    const { outgoing_players_salary } = this.props;

    return (
      <div className="main-content-area" id="admin-tools-container">
        <header>
          <div id="header-container">
            <h1 id="header-title">The Robby Trade Machine</h1>
            <p id="header-body">
              A sub section paragraph to have some clever text. Something about
              you're lucky enough to be one of my 5 friends or I somehow drew
              you into looking at something dope I made. Yeah Yeah Yeah, it's
              missing a few things like team picks and trade exceptions but
              those will be coming shortly!
            </p>
            <div className="ball"></div>
            <div id="trade-machine-rules">
              <h2 id="trade-machine-rules-header">
                How does the Trade Machine Work?
              </h2>
              <ol id="rule-list">
                <li>Pick your favorite team + another team to trade with</li>
                <li>
                  Select at least one player from each team you want to be in
                  the trade
                </li>
                <li>
                  Once you have players selected for both teams, execute the
                  trade!
                </li>
                <li>
                  The trade machine will let you know if it's a successful trade
                </li>
              </ol>
            </div>
          </div>
        </header>
        <div id="header-gradient"></div>

        {/* <div id="team-trades-container"> */}

        <div id="team-selection-main-container">
          <div className="step-label">#1</div>
          <h1 id="team-selection-section-header" className="section-title">
            Select Teams:
          </h1>
          <ReviewTrade
            selected_players={selected_players}
            players={players}
            currentTeams={selected_teams}
            outgoing_players_salary={outgoing_players_salary}
            team_salaries_total={team_salaries_total}
          />
          {/*<div id="team-selection-container"> */}
          <div id="team-selection-sub-container">
            {/* <div id="team-two-container-selection"> */}
            <div className="area-container">
              <TradeInfo
                selected_players={selected_players}
                players={players}
                currentTeams={selected_teams}
                containerValue="teamOne"
                teams={teams}
              />

              {/* 
            
            <PlayerList
              class="team-list"
              players={players}
              currentTeams={selected_teams}
              containerValue="teamTwo"
              isTradeUI="true"
              selected_players={selected_players}
            />
            
            */}
            </div>
            {/* <div id="team-one-container-selection"> */}
            <div className="area-container">
              <TradeInfo
                selected_players={selected_players}
                players={players}
                currentTeams={selected_teams}
                containerValue="teamTwo"
                teams={teams}
              />
              {/*<PlayerList
              class="team-list"
              players={players}
              currentTeams={selected_teams}
              containerValue="teamOne"
              isTradeUI="true"
              selected_players={selected_players}
            /> */}
            </div>
          </div>
        </div>

        <div
          id="team-rosters-main-container"
          className={this.isHiddenTeams(selected_teams)}
        >
          <div className="step-label">#2</div>
          <h1 id="team-roster-section-header" className="section-title">
            Select Players:
          </h1>
          {/* <div id="team-rosters-container"> */}
          <div id="team-rosters-sub-container">
            {/* <div id="team-one-container"> */}
            <div
              id="team-rosters-team-one"
              className={this.isHiddenTeamOne(selected_teams)}
              style={{
                marginRight: this.marginSpacer(selected_teams).leftCont
              }}
            >
              <PlayerList
                players={players}
                currentTeams={selected_teams}
                containerValue="teamOne"
                selected_players={selected_players}
              />
            </div>
            {/* <div id="team-two-container"> */}
            <div
              id="team-rosters-team-two"
              className={this.isHiddenTeamTwo(selected_teams)}
              //style="color:red"
              style={{
                marginLeft: this.marginSpacer(selected_teams).rightCont
              }}
            >
              <PlayerList
                players={players}
                currentTeams={selected_teams}
                containerValue="teamTwo"
                selected_players={selected_players}
              />
            </div>
          </div>
        </div>

        <div
          id="trade-proposition-main-container"
          className={this.isHiddenPlayers(selected_players)}
        >
          <div className="step-label">#3</div>
          <h1 id="team-trade-review-section-header" className="section-title">
            Review Trade:
          </h1>
          <div id="trade-proposition-sub-container">
            {/*}

            <div
              id="player-list-holder-team-two"
              className={this.isHiddenPlayerSelectTwo(selected_players)}
              style={{
                "margin-right": this.marginSpacerTwo(selected_players).rightCont
              }}
            >
              <PlayerList
                class="team-list"
                players={players}
                currentTeams={selected_teams}
                containerValue="teamTwo"
                isTradeUI="true"
                selected_players={selected_players}
              />

            </div>


            <div
              className={this.isHiddenPlayerSelectOne(selected_players)}
              style={{
                "margin-left": this.marginSpacerTwo(selected_players).leftCont
              }}
            >
              <PlayerList
                class="team-list"
                players={players}
                currentTeams={selected_teams}
                containerValue="teamOne"
                isTradeUI="true"
                selected_players={selected_players}
              />
            </div>

            */}

            <TradeProposer
              selected_players={selected_players}
              team_salaries_total={team_salaries_total}
              currentTeams={selected_teams}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.firestore.ordered.teams,
    players: state.firestore.ordered.players,
    selected_teams: state.selected_teams,
    selected_players: state.selected_players,
    team_salaries_total: state.team_salaries_total,
    outgoing_players_salary: state.outgoing_players_salary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearPlayerList: player => dispatch(clearPlayerList(player))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "teams" }, { collection: "players" }])
)(AdminTools);

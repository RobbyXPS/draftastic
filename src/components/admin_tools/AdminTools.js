import React from "react";
import PlayerList from "../rosters/PlayerList";
import TradeInfo from "../rosters/TradeInfo";
import TradeProposer from "../rosters/TradeProposer";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
    this.isHiddenPlayers = this.isHiddenPlayers.bind(this);
    this.isHiddenTeams = this.isHiddenTeams.bind(this);
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

  render() {
    // deconstruct props passed in from state
    const { teams } = this.props;
    const { players } = this.props;
    const { selected_teams } = this.props;
    const { selected_players } = this.props;
    const { team_salaries_total } = this.props;

    console.log("uhhh selected_players", selected_teams);

    return (
      <div className="main-content-area" id="admin-tools-container">
        <TradeProposer
          selected_players={selected_players}
          team_salaries_total={team_salaries_total}
          currentTeams={selected_teams}
        />
        {/* <div id="team-trades-container"> */}
        <div id="team-selection-main-container">
          <h1>Select Teams:</h1>
          {/*<div id="team-selection-container"> */}
          <div id="team-selection-sub-container">
            {/* <div id="team-two-container-selection"> */}
            <div class="area-container">
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
            <div class="area-container">
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
          id="trade-proposition-main-container"
          className={this.isHiddenPlayers(selected_players)}
        >
          <h1>Trade Proposition:</h1>
          <div id="trade-proposition-sub-container">
            <div class="area-container">
              <PlayerList
                class="team-list"
                players={players}
                currentTeams={selected_teams}
                containerValue="teamTwo"
                isTradeUI="true"
                selected_players={selected_players}
              />
            </div>
            <div class="area-container">
              <PlayerList
                class="team-list"
                players={players}
                currentTeams={selected_teams}
                containerValue="teamOne"
                isTradeUI="true"
                selected_players={selected_players}
              />
            </div>
          </div>
        </div>

        <div
          id="team-rosters-main-container"
          className={this.isHiddenTeams(selected_teams)}
        >
          <h1>Team Roster:</h1>
          {/* <div id="team-rosters-container"> */}
          <div id="team-rosters-sub-container">
            {/* <div id="team-one-container"> */}
            <div class="area-container">
              <PlayerList
                players={players}
                currentTeams={selected_teams}
                containerValue="teamOne"
                selected_players={selected_players}
              />
            </div>
            {/* <div id="team-two-container"> */}
            <div class="area-container">
              <PlayerList
                players={players}
                currentTeams={selected_teams}
                containerValue="teamTwo"
                selected_players={selected_players}
              />
            </div>
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
    team_salaries_total: state.team_salaries_total
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "teams" }, { collection: "players" }])
)(AdminTools);

import React from "react";
import TeamList from "../rosters/TeamList";
import CreateTeam from "../admin_tools/CreateTeam";
import PlayerList from "../rosters/PlayerList";
import TradeInfo from "../rosters/TradeInfo";
import TradeProposer from "../rosters/TradeProposer";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class AdminTools extends React.Component {
  render() {
    // deconstruct props passed in from state
    const { teams } = this.props;
    const { players } = this.props;
    const { selected_teams } = this.props;
    const { selected_players } = this.props;
    const { team_salaries_total } = this.props;

    return (
      <div className="main-content-area" id="admin-tools-container">
        <CreateTeam />
        <TradeProposer
          selected_players={selected_players}
          team_salaries_total={team_salaries_total}
        />
        <div id="team-trades-container">
          <div id="team-two-container-trade">
            <h2>TEAM ONE: (TRADE)</h2>
            <TradeInfo
              selected_players={selected_players}
              players={players}
              currentTeams={selected_teams}
              containerValue="teamOne"
            />
            <PlayerList
              class="team-list"
              players={players}
              currentTeams={selected_teams}
              containerValue="teamTwo"
              isTradeUI="true"
              selected_players={selected_players}
            />
          </div>
          <div id="team-one-container-trade">
            <h2>TEAM TWO: (TRADE)</h2>
            <TradeInfo
              selected_players={selected_players}
              players={players}
              currentTeams={selected_teams}
              containerValue="teamTwo"
            />
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
        <div id="team-rosters-container">
          <div id="team-one-container">
            <h2>TEAM ONE:</h2>
            <TeamList
              class="team-list"
              teams={teams}
              containerValue="teamOne"
            />
            <PlayerList
              players={players}
              currentTeams={selected_teams}
              containerValue="teamOne"
            />
          </div>
          <div id="team-two-container">
            <h2>TEAM TWO:</h2>
            <TeamList
              class="team-list"
              teams={teams}
              containerValue="teamTwo"
            />
            <PlayerList
              players={players}
              currentTeams={selected_teams}
              containerValue="teamTwo"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
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

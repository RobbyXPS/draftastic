import React from "react";
import TeamList from "../rosters/TeamList";
import CreateTeam from "../admin_tools/CreateTeam";
import PlayerList from "../rosters/PlayerList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import DynamicPlayerList from "../rosters/DynamicPlayerList";

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // deconstruct props passed in from store
    const { teams } = this.props;
    const { players } = this.props;
    const { selected_team } = this.props;

    console.log("my selected team", selected_team);

    return (
      <div className="main-content-area" id="admin-tools-container">
        <CreateTeam />
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
              currentTeam={selected_team}
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
              currentTeam={selected_team}
              containerValue="teamTwo"
            />
          </div>
        </div>
        <DynamicPlayerList players={players} selected_team={selected_team} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log("$$$$$$$$$$$$$$$$$$", state);
  return {
    teams: state.firestore.ordered.teams,
    players: state.firestore.ordered.players,
    selected_team: state.selected_teams
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "teams" }, { collection: "players" }])
)(AdminTools);

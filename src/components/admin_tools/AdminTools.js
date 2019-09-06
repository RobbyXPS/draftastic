import React from "react";
import TeamList from "../rosters/TeamList";
import CreateTeam from "../admin_tools/CreateTeam";
import PlayerList from "../rosters/PlayerList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTeam: "blazers"
    };
  }

  render() {
    const { teams } = this.props;
    const { players } = this.props;
    console.log("hey1", this);
    console.log("its state", this.state);

    return (
      <div className="main-content-area" id="admin-tools-container">
        <div>current team is: {this.state.currentTeam}</div>
        <CreateTeam />
        <TeamList teams={teams} />
        <PlayerList players={players} currentTeam={this.state.currentTeam} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("alsdfjklaskdf1", state);
  //console.log("alsdfjklaskdf2", store.getState());
  return {
    teams: state.firestore.ordered.teams,
    players: state.firestore.ordered.players
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "teams" }, { collection: "players" }])
)(AdminTools);

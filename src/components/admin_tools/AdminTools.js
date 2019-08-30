import React from "react";
import TeamList from "../rosters/TeamList";
import CreateTeam from "../admin_tools/CreateTeam";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class AdminTools extends React.Component {
  render() {
    //console.log("uhh", this.props);
    const { teams } = this.props;
    console.log("teams", teams);
    return (
      <div className="main-content-area" id="admin-tools-container">
        <CreateTeam />
        <TeamList teams={teams} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state<<<", state);
  return {
    //teams: state.team.teams
    teams: state.firestore.ordered.teams
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "teams" }])
)(AdminTools);

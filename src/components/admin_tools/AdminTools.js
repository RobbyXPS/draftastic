import React from "react";
import TeamList from "../rosters/TeamList";
import CreateTeam from "../admin_tools/CreateTeam";
import { connect } from "react-redux";

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
  return {
    teams: state.team.teams
  };
};

export default connect(mapStateToProps)(AdminTools);

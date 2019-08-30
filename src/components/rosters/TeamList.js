import React from "react";
import { connect } from "react-redux";

const TeamList = ({ teams }) => {
  return (
    <div id="team-list-container">
      <h2>Teams</h2>
      <div>
        {teams &&
          teams.map(team => {
            return <div key={team.name}>{team.name}</div>;
          })}
      </div>
    </div>
  );
};
/*
class TeamList extends React.Component {
  
  render() {
    return (
      <div id="team-list-container">
        <h2>Teams</h2>
        <div>
          {teams &&
            teams.map(team => {
              return <div key={team.id}>{team.name}</div>;
            })}
        </div>
      </div>
    );
  }
}
*/
export default TeamList;

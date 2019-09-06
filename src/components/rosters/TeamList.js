import React from "react";
import { connect } from "react-redux";

const TeamList = ({ teams }) => {
  return (
    <div id="team-list-container">
      <h2>Teams</h2>
      <div>
        {teams &&
          teams.map(team => {
            return <button key={team.name}>{team.name}</button>;
          })}
      </div>
    </div>
  );
};

export default TeamList;

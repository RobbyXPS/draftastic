import React from "react";
import { connect } from "react-redux";
import { selectTeam } from "../../store/actions/teamActions";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    this.props.selectTeam({
      team_container: this.props.containerValue,
      team_name: event.target.innerHTML
    });
  };

  render() {
    const teams = this.props.teams;
    return (
      <div id="team-list-container">
        <h2>Teams</h2>
        <div>
          {teams &&
            teams.map(team => {
              return (
                <button onClick={this.handleClick} key={team.id}>
                  {team.name}
                </button>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectTeam: team => dispatch(selectTeam(team))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TeamList);

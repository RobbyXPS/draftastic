import React from "react";
import { connect } from "react-redux";
import { selectTeam } from "../../store/actions/teamActions";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => {
    //this.props.selectTeam(e.target.innerHTML);
    console.log("inside handle click", this.props.containerValue);

    this.props.selectTeam({
      team_container: this.props.containerValue,
      team_name: e.target.innerHTML
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
                <button onClick={this.handleClick} key={team.name}>
                  {team.name}
                </button>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedTeam: state.team
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectTeam: team => dispatch(selectTeam(team))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamList);

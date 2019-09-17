import React from "react";
import { connect } from "react-redux";
import { selectTeam } from "../../store/actions/teamActions";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  handleClick = event => {
    this.props.selectTeam({
      team_container: this.props.containerValue,
      team_name: event.target.innerHTML
    });
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  isActive(currentTeams, team_name) {
    if (
      currentTeams["teamOne"] == team_name ||
      currentTeams["teamTwo"] == team_name
    ) {
      return "disabled";
    } else {
      return "enabled";
    }
  }

  render() {
    const teams = this.props.teams;
    const currentTeams = this.props.currentTeams;
    const containerValue = this.props.containerValue;
    console.log("<<<<<<<<< right here 1", currentTeams);
    console.log("<<<<<<<<< right here 2", containerValue);
    console.log("<<<<<<<<< right here 3", this.props);
    //console.log("<<<<<<<<< right here", currentTeams[containerValue]);

    if (currentTeams !== undefined) {
      return (
        <div id="team-list-container">
          <div>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {/*{currentTeams[containerValue]}*/}
                {currentTeams[containerValue]
                  ? currentTeams[containerValue]
                  : "Select Team"}
              </DropdownToggle>
              {/* 
    <DropdownToggle caret>
      {currentTeams[containerValue]
                  ? currentTeams[containerValue]
                  : "Select Team"}
  
              </DropdownToggle>
    */}

              <DropdownMenu>
                {teams &&
                  teams.map(team => {
                    return (
                      <DropdownItem
                        onClick={this.handleClick}
                        key={team.id}
                        className={this.isActive(currentTeams, team.name)}
                      >
                        {team.name}
                      </DropdownItem>
                    );
                  })}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
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

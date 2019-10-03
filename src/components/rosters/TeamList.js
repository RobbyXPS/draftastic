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

              <DropdownMenu
                modifiers={{
                  setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: data => {
                      return {
                        ...data,
                        styles: {
                          ...data.styles,
                          overflow: "auto",
                          maxHeight: 300
                        }
                      };
                    }
                  }
                }}
              >
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

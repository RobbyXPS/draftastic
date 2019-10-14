import React from "react";
import { connect } from "react-redux";
import { selectTeam } from "../../store/actions/teamActions";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  // let redux store know when a team is selected
  handleClick = event => {
    this.props.selectTeam({
      team_container: this.props.containerValue,
      team_name: event.target.innerHTML
    });
  };
  // helper function for reactstrap dropdown
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
                {currentTeams[containerValue]
                  ? currentTeams[containerValue]
                  : "Select Team"}
              </DropdownToggle>
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
                        className={
                          currentTeams.teamOne === team.name ||
                          currentTeams.teamTwo === team.name
                            ? "disabled"
                            : "enabled"
                        }
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

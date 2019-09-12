import React from "react";
import { createTeam } from "../../store/actions/teamActions";
import { connect } from "react-redux";

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createTeam(this.state);
  };

  render() {
    return (
      <div id="create-team-container">
        <h1>Create a new team:</h1>
        <form onSubmit={this.handleSubmit}>
          <h2>Team Name:</h2>
          <input type="text" id="name" onChange={this.handleChange}></input>
          <button type="submit">Add Team</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTeam: team => dispatch(createTeam(team))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTeam);

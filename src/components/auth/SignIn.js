import React from "react";

class signIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="main-content-area" id="signup-container">
        <form onSubmit={this.handleSubmit}>
          <h2>Sign In</h2>
          <div id="email-container">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={this.handleChange}></input>
          </div>
          <div id="password-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
            ></input>
          </div>
          <div id="submit-container">
            <button type="submit">Create Team</button>
          </div>
        </form>
      </div>
    );
  }
}

export default signIn;

/*
import React from 'react';
import { Component } from 'react';

const SignIn extends Component {
    state = {
        email: '',
        passowrd: '',
        first_name: '',
        last_name: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div id="sign-in-container">
                <form>
                    <h5>Sign In</h5>
                    <div id="email-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={handleChange}></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;
*/

import React, { Component } from "react";
import axios from "axios";

export default class Logging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;

    let result = axios
      .post(
        "http://localhost:8000/login/",
        JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      );

    result.then(response => {
      alert(response.data);
    });

    result.catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
import React, { Component } from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import './Style.css';
import './MainStyle.css';
// import './RegisterStyle.css';

export default class Logging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: "",
      redirectToWelcome: false,
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
     /* alert(response.data);*/
      this.setState({redirectToWelcome: true});
    });

    result.catch(error => {
        console.log("login error", error);
        alert("Blad w trakcie logowania")
      });
    event.preventDefault();
  }

  render() {
    require('./Style.css');
    require('./MainStyle.css');


    if (this.state.redirectToWelcome) {
      return <Redirect to="/welcome" />;
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light sticky-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="/">insta-app</a>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <i className="fas fa-bars"/>
            </button>
            <div className="collapse navbar-collapse"
              id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div className="btn-group">
                  <Link to="/register" className="btn bg-primary light">Kliknij do rejestracji</Link>
                  <Link to="/login" className="btn bg-primary light">Kliknij do logowania</Link>
                </div>
              </ul>
            </div>
          </div>
        </nav>

          <div className="base-container center form-group justify-content-center row">
            <div className="container register-form flex-column">
              <div className="form">
                <div className="form-content">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label id="username"/>
                          <input
                            type="username"
                            name="username"
                            placeholder="Nazwa użytkownika *"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                          />
                      </div>
                      <div className="form-group">
                        <div className="form-group">
                          <label id="password" />
                          <input
                            type="password"
                            name="password"
                            placeholder="Hasło *"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-auto">
                        <button type="button" className="btnSubmit" onClick={this.handleSubmit}>Zaloguj się</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
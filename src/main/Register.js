import React from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this); //tego nie
    this.handleSubmit = this.handleSubmit.bind(this); //i tego tez
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password
    };

    let result = axios.post('http://localhost:8000/register/', JSON.stringify(data))
    result.then(response => {
      console.log(response);
      this.setState({redirectToWelcome: true});
    })

    result.catch(error => {
      if (error.response.status === 400) {
        alert("Użytkownik o danej nazwie już istnieje");
      }
    })
  }


  render() {
    require('./Style.css');
    require('./MainStyle.css');

    if (this.state.redirectToWelcome) {
      return <Redirect to="/mainpageforloggedin"/>;
    }
    return (

      <div>
        {/*tutaj jest nagłówek navbar */}
        <nav className="navbar navbar-expand-lg navbar-light sticky-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="\">WhiteWall</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
              <i className="fas fa-bars"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div className="btn-group">
                  <Link to="/register" className="btn bg-primary light">Kliknij do rejestracji</Link>
                  <Link to="/login" className="btn bg-primary light">Kliknij do logowania</Link>
                </div>
              </ul>
            </div>
          </div>
        </nav>

        {/*tutaj zaczyna się formularz rejstracji*/}
        <div className="base-container center form-group justify-content-center row">
          <div className="container register-form flex-column">
            <div className="form">
              <div className="form-content">
                <div className="row">
                  <div className="col-md-6 mx-auto">
                    <p>Utwórz konto w WhiteWall</p>
                    <div className="form-group">
                      <label id="username"/>
                      <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Nazwa użytkownika *"
                      />
                    </div>
                    <div className="form-group">
                      {/*<div className="form-group">*/}
                        <label id="password"/>
                        <input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                          className="form-control"
                          placeholder="Hasło *"
                        />
                      {/*</div>*/}
                    </div>
                    <div className="form-group col-md-auto">
                      <button type="button" className="btnSubmit" onClick={this.handleSubmit}>Zarejestruj</button>
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
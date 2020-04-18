import axios from 'axios';
import React, { Component } from "react";
import {Link, Redirect} from "react-router-dom";
import './MyProfileStyle.css';


export default class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state= {
      username: "",
      Logout: "",
      redirectToWelcome: false,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    axios.post('http://localhost:8000/logout/').then(response => {
      console.log(response.data.Logout);
      this.setState({redirectToWelcome: true});
    });
  }

  componentDidMount() {
    axios.get('http://localhost:8000/myProfile/').then(response =>{
      console.log(response.data.username);
      this.setState({username: response.data.username});
    })
  }


  render(){
    if (this.state.redirectToWelcome) {
      return <Redirect to="/welcome" />;
    }
    return (
      <div>

        <div className="layout">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container">
              <a className="navbar-brand js-scroll-trigger" href="/">insta-app</a>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                      data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                      aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <div className="btn-group">
                    <Link to="/seeyoulater" className="btn bg-primary light" onClick={this.handleLogout}>Wyloguj się</Link>

                  </div>
                </ul>
              </div>
            </div>
          </nav>


          <div className="container">
            <div className="row profile">
              <div className="col-md-3">
                <div className="profile-sidebar">
                  <div className="profile-userpic">
                    <img
                      src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg"
                      className="img-responsive" alt=""/>
                  </div>

                  <div className="profile-usertitle">
                    <div className="profile-usertitle-name">
                      <h2>{this.state.username}</h2>
                    </div>

                  </div>

                  <div className="profile-userbuttons">
                    <button type="button" className="btn btn-success btn-sm">Obserwuj</button>
                  </div>

                  <div className="profile-usermenu">
                    <ul className="nav">
                      <li className="active">
                        <a href="#">
                          <i className="glyphicon glyphicon-home"></i>
                          Przegląd </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="glyphicon glyphicon-user"></i>
                          Ustawienia konta </a>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
              <div className="col-md-9">
                <div className="profile-content">
                  Some user related content goes here...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



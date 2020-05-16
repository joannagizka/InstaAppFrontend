import axios from 'axios';
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";


export default class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      Logout: "",
      photos: [],
      displaySettings: false,
      redirectToMainPage: false,
    };
  }

  componentDidMount() {
    this.fetchProfileData()
  }

  fetchProfileData() {
    axios.get('http://localhost:8000/myProfile/').then(response => {
      this.setState({username: response.data.username, photos: response.data.photos});
    })
  }

  renderAllPhotos() {
    const renderedPhotos = [];

    for (let photo of this.state.photos) {
      renderedPhotos.push(this.renderPhoto(photo));
    }

    return (
      <div className="row">
        {renderedPhotos}
      </div>
    )
  }

  renderPhoto(photo) {
    const src = "http://localhost:8000/photo/" + photo.id + "/"
    const linkTo = "/photodetails/" + photo.id;
    return (
      <div>
        <Link to={linkTo} className="card col-md-4 thumbnail">
          <img src={src} alt="Lights"/>
          <div className="card-body">
            <p className="card-text">{photo.description}</p>
          </div>
        </Link>
        <button type="button" className="btn bg-primary light" onClick={() => this.deletePhoto(photo.id)}>Usun</button>
      </div>
    )
  }

  deletePhoto(photoId) {
    axios.post('http://localhost:8000/photoMeta/' + photoId + "/delete/").then(response => {
      this.fetchProfileData()
    })
  }

  renderSettings() {
    return (
      <div>
        <p>Uwaga usuniecie konta jest nieodwracalne!</p>
        <button type="button" className="btn bg-primary light" onClick={() => this.deleteAccount()}>Usun</button>
      </div>
    )
  }

  deleteAccount() {
    axios.post('http://localhost:8000/deleteAccount/').then(response => {
      this.setState({redirectToMainPage: true})
    })
  }

  render() {
    require('./MyProfileStyle.css');
    require('./Style.css');
    require('./MainStyle.css');

    if (this.state.redirectToMainPage) {
      return <Redirect to="/"/>;
    }

    return (
      <div>
        <div className="layout">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container">
              <a
                className="navbar-brand js-scroll-trigger"
                href="/mainpageforloggedin">
                insta-app
              </a>
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button" data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <div className="btn-group">
                    <Link to="/addphoto" className="btn bg-primary light">Dodaj zdjęcie</Link>
                    <Link to="/search" className="btn bg-primary light">Znajdź innych użytkowników</Link>
                    <Link to="/logout" className="btn bg-primary light">Wyloguj się</Link>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="row profile">
              <div className="col-md-3">
                <div className="profile-sidebar">
                  <div className="profile-usertitle">
                    <div className="profile-usertitle-name">
                      <h2>{this.state.username}</h2>
                    </div>
                  </div>
                  <div className="profile-usermenu">
                    <ul className="nav">
                      <li className={this.state.displaySettings ? "" : "active"}>
                        <a href="#" onClick={() => this.setState({displaySettings: false})}>
                          <i className="glyphicon glyphicon-home"></i>Przegląd </a>
                      </li>
                      <li className={this.state.displaySettings ? "active" : ""}>
                        <a href="#" onClick={() => this.setState({displaySettings: true})}>
                          <i className="glyphicon glyphicon-user"></i>Ustawienia konta </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="profile-content">
                  {this.state.displaySettings ? this.renderSettings() : this.renderAllPhotos()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



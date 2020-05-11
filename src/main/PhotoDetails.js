import React from 'react'
import {
  Link,
} from "react-router-dom";
import axios from "axios";

export default class PhotoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
  }

  componentDidMount() {
    const arr = window.location.href.split("/");
    const photoId = arr[arr.length - 1];

    axios.get("http://localhost:8000/photoMeta/" + photoId + "/").then(response => {
      this.setState({description: response.data.description});
    })
  }


  render() {
    require('./Style.css');
    require('./AddPhotoStyle.css');

    const arr = window.location.href.split("/");
    const photoId = arr[arr.length - 1];
    const photoSrc = "http://localhost:8000/photo/" + photoId + "/";

    return (
      <div className="layout">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">insta-app</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div className="btn-group">

                  <Link to="/myprofile" className="btn bg-primary light">Pokaż mój profil</Link>
                  <Link to="/seeyoulater" className="btn bg-primary light" onClick={this.handleLogout}>Wyloguj
                    się</Link>
                </div>
              </ul>
            </div>
          </div>
        </nav>
        <div className="card mx-auto">
          <img className="centered-and-cropped rounded mx-auto d-block"

               src={photoSrc}
               alt="your image"/>
          <div className="card-body">

            <div className="well well-lg light">
              <h4 className="media-heading text-uppercase reviews">Bella </h4>
              <ul className="media-date text-uppercase reviews list-inline">
                <li className="dd">22</li>
                <li className="mm">09</li>
                <li className="aaaa">2014</li>
              </ul>
            <p className="card-text text-justify">{this.state.description}</p>
            </div>
            <div className="media-body">
              <span className="badge badge-light"><h4>KOMENTARZE:</h4></span>
              <div className="well well-lg">
                <h4 className="media-heading text-uppercase reviews">Bella </h4>
                <ul className="media-date text-uppercase reviews list-inline">
                  <li className="dd">22</li>
                  <li className="mm">09</li>
                  <li className="aaaa">2014</li>
                </ul>

                <p className="media-comment">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

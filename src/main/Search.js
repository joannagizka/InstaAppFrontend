import React from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

export default class Search extends React.Component {

  componentDidMount() {
    axios.get("http://localhost:8000/users/").then(response => {
      console.log(response.data);

    })
  }

  render() {
    require('./Style.css');

    return (
      <div className="body">
        <div className="layout">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container">
              <a className="navbar-brand js-scroll-trigger" href="/mainpageforloggedin">insta-app</a>
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button" data-toggle="collapse"
                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <div className="btn-group">
                    <Link to="/addphoto" className="btn bg-primary light">Dodaj zdjęcie</Link>
                    <Link to="/myprofile" className="btn bg-primary light">Pokaż mój profil</Link>
                    <Link to="/seeyoulater" className="btn bg-primary light" onClick={this.handleLogout}>Wyloguj
                      się</Link>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto">
                <h5 className="font-weight-light mb-4 ">Znajdź użytkowników, którzy Cię intersują i obserwuj ich</h5>
                <div className="bg-white p-5 rounded shadow">
                  <form action="">
                    <div className="input-group-prepend border-0">
                      <button type="button" className="btn btn-link text-info"><i
                        className="fa fa-search"/></button>
                      <i className="fas fa-search fa-7x"/>
                    </div>
                    <div className="row">
                      <div className="col-md-9">
                        <input
                          type="search"
                          placeholder="Wpisz nazwę użytkownika, którego szukasz"
                          aria-describedby="button-addon4"
                          className="form-control bg-none border-1">
                        </input>
                      </div>
                      <div>
                        <ul className="ml-auto">
                          <div className="btn-group">
                            <Link to="/myprofile" className="btn bg-primary light">Szukaj</Link>
                          </div>
                        </ul>
                      </div>
                      <div className="container">
                        <div className="row justify-content-md-center">
                          <ul className="list-group align-content-center">
                            <div>
                              <li className="list-group-item border-0">
                                <div className="container d-flex ">
                                  <div className="card p-3">
                                    <div className="media">
                                      <img src="https://imgur.com/ZnxJ2SY.png" className="mr-3"/>
                                      <div className="media-body">
                                        <h5 className="mt-2 mb-0">Bella joe</h5>
                                        <div className="d-flex flex-row justify-content-between align-text-center">
                                          <small
                                            className="text-muted">programista</small>
                                          <div className="col col-lg-2">
                                            <Link
                                              to="/myprofile"
                                              className="btn bg-primary light align-top">
                                              obserwuj
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </div>
                            <div>
                              <li className="list-group-item border-0">
                                <div className="container d-flex justify-content-left">
                                  <div className="card p-3">
                                    <div className="media">
                                      <img src="https://imgur.com/ZnxJ2SY.png" className="mr-3"/>
                                      <div className="media-body">
                                        <h5 className="mt-2 mb-0">Bella joe</h5>
                                        <div className="d-flex flex-row justify-content-between align-text-center">
                                          <small
                                            className="text-muted">programista</small>
                                          <div className="col col-lg-2">
                                            <Link
                                              to="/myprofile"
                                              className="btn bg-primary light align-top">
                                              obserwuj
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </div>
                            <div>
                              <li className="list-group-item border-0">
                                <div className="container d-flex justify-content-left">
                                  <div className="card p-3">
                                    <div className="media">
                                      <img src="https://imgur.com/ZnxJ2SY.png" className="mr-3"/>
                                      <div className="media-body">
                                        <h5 className="mt-2 mb-0">Bella joe</h5>
                                        <div className="d-flex flex-row justify-content-between align-text-center">
                                          <small
                                            className="text-muted">programista</small>
                                          <div className="col col-lg-2">
                                            <Link
                                              to="/myprofile"
                                              className="btn bg-primary light align-top">
                                              obserwuj
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </div>
                            <div>
                              <li className="list-group-item border-0">
                                <div className="container d-flex justify-content-left ">
                                  <div className="card p-3">
                                    <div className="media">
                                      <img src="https://imgur.com/ZnxJ2SY.png" className="mr-3"/>
                                      <div className="media-body">
                                        <h5 className="mt-2 mb-0">Bella joe</h5>
                                        <div className="d-flex flex-row justify-content-between align-text-center">
                                          <small
                                            className="text-muted">programista</small>
                                          <div className="col col-lg-2">
                                            <Link
                                              to="/myprofile"
                                              className="btn bg-primary light align-top">
                                              obserwuj
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
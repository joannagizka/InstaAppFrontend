import React from 'react';
import {Link} from "react-router-dom";


const MainPage = () => {
  return (
    <div className="layout">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="/">WhiteWall</a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <div className="btn-group">
                <Link to="/register" className="btn bg-primary light">
                  Kliknij do rejestracji
                </Link>
                <Link to="/login" className="btn bg-primary light">
                  Kliknij do logowania
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-7 my-auto">
              <div className="header-content mx-auto">
                <h1 className="mb-5">
                  Dziel się chwilą ze swoimi znajomymi,
                  wrzucaj zdjęcia kiedy chcesz i gdzie chcesz!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default MainPage;
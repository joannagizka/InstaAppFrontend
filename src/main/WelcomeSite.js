import React from 'react'
import {Link} from 'react-router-dom'


export default class WelcomeSite extends React.Component{
  render () {
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
                  <Link to="/seeyoulater" className="btn bg-primary light" onClick={this.handleLogout}>Wyloguj się</Link>
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
                  <h1 className="mb-5">Dziel się chwilą ze swoimi znajomymi, wrzucaj zdjęcia kiedy chcesz i gdzie chcesz!</h1>
                  <a href="#download" className="btn btn-outline btn-xl js-scroll-trigger">Zobacz jak!</a>
                </div>
              </div>
              {/*<div className="col-lg-5 my-auto">*/}
              {/*  /!*<div className="device-container">*!/*/}
              {/*  /!*  <div className="device-mockup iphone6_plus portrait white">*!/*/}
              {/*  /!*    <div className="device">*!/*/}
              {/*  /!*      <div className="screen">*!/*/}
              {/*  */}
              {/*  /!*        /!*<img src={bg} className="img-fluid" alt=""/>*!/*!/*/}
              {/*  /!*      </div>*!/*/}
              {/*  /!*      <div className="button">*!/*/}
              {/*  */}
              {/*  /!*      </div>*!/*/}
              {/*  /!*    </div>*!/*/}
              {/*  /!*  </div>*!/*/}
              {/*  /!*</div>*!/*/}
              {/*</div>*/}
            </div>
          </div>
        </header>


      </div>
    )
  }
}
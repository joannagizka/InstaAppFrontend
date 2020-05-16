import React from 'react';
import {Link, Redirect} from "react-router-dom";
import './Style.css';
import './MainStyle.css';
import axios from "axios";
import ReactPaginate from 'react-paginate';

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      pageCount: 0
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.fetchPhotosMetadata(0);
  }

  handlePageClick(page) {
    this.fetchPhotosMetadata(page.selected);
  }

  fetchPhotosMetadata(pageNumber) {
    axios.get('http://localhost:8000/allPhotos/?page=' + pageNumber).then(response => {
      const pageCount = response.data.totalCount / 21;
      this.setState({photos: response.data.photos, pageCount: pageCount});
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
    const src = "http://localhost:8000/photo/" + photo.id + "/";
    const linkTo = "/photodetails/" + photo.id;
    return (
      <Link to={linkTo} className="card col-md-4 thumbnail">
        <img src={src} alt="Lights"/>
        <div className="card-body">
          <p className="card-text">{photo.description}</p>
        </div>
        <p>likes: {photo.likesCount}</p>
        <p>comments: {photo.commentsCount}</p>

      </Link>
    )
  }

  render() {
    return (
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
                  <Link to="/myprofile" className="btn bg-primary light">Mój profil </Link>
                  <Link to="/search" className="btn bg-primary light">Znajdź innych użytkowników</Link>
                  <Link to="/logout" className="btn bg-primary light">Wyloguj się</Link>
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
                  <h1 className="mb-5">Dziel się chwilą ze swoimi znajomymi, wrzucaj zdjęcia kiedy chcesz i gdzie
                    chcesz!</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="profile-content col-md-2s align-content-md-center">
            {this.renderAllPhotos()}
          </div>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  }
}
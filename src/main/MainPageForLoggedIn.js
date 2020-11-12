import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './Style.css';
import './MainStyle.css';
import axios from "axios";
import ReactPaginate from 'react-paginate';

const MainPage = () => {

  const [photos, setPhotos] = useState([])
  const [pageCount, setPageCount] = useState(0)


  useEffect(() => {
    fetchPhotosMetadata(0);
  }, [])


  const handlePageClick = (page) => {
    fetchPhotosMetadata(page.selected);
  }

  const fetchPhotosMetadata = (pageNumber) => {
    axios.get('http://localhost:8000/allPhotos/?page=' + pageNumber)
      .then((response) => {
        const pageCount = response.data.totalCount / 21;
        setPhotos(response.data.photos)
        setPageCount(pageCount)
      })
  }


  const renderAllPhotos = () => {
    const renderedPhotos = [];
    for (let photo of photos) {
      renderedPhotos.push(renderPhoto(photo));
    }
    return (
      <div className="row">
        {renderedPhotos}
      </div>
    )
  }


  const renderPhoto = (photo) => {
    const src = "http://localhost:8000/photo/" + photo.id + "/";
    const linkTo = "/photodetails/" + photo.id;
    return (
      <Link to={linkTo} className="card col-md-4 thumbnail">
        <img src={src} alt="Lights"/>
        <div className="card-body text-muted">
          <span className="badge badge-primary">
            {photo.authorUsername}
          </span>
          <p className="text-decoration-none">
            {photo.description}
          </p>
          <p>
            <svg
              className="bi bi-heart"
              width="1em" height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd"
                    d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                    clip-rule="evenodd"
              />
            </svg>
            {photo.likesCount}
            <svg
              className="bi bi-chat"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd"
                    d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                    clip-rule="evenodd"/>
            </svg>
            {photo.commentsCount}
          </p>
        </div>
      </Link>
    )
  }


  return (
    <div className="layout">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="/mainpageforloggedin">WhiteWall</a>
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
                <h1 className="mb-5">
                  Dziel się chwilą ze swoimi znajomymi, wrzucaj zdjęcia kiedy chcesz i gdzie chcesz!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="profile-content col-md-2s align-content-md-center">
          {renderAllPhotos()}
        </div>
        <ReactPaginate
          previousLabel={'poprzednia'}
          nextLabel={'następna'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}

export default MainPage;
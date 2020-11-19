import axios from 'axios';
import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";


const MyProfile = () => {

  const [username, setUsername] = useState('')
  const [photos, setPhotos] = useState([])
  const [displaySettings, setDisplaySettings] = useState(false)
  const [redirect, setRedirect] = useState(false)


  useEffect(() => {
    fetchProfileData()
  }, [])


  const fetchProfileData = () => {
    axios.get('http://localhost:8000/api/myprofilephotos/')
      .then((response) => {
        // setUsername(response.data.username)
        // console.log(response.data.username)
        setPhotos(response.data)
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

    const src = "http://localhost:8000" + photo.photo;
    // const linkTo = "/photodetails/" + photo.id;


    return (
      <div>
        <div className="card-body">
          <Link /*to={linkTo}*/ className="card col-md-8 thumbnail">
            <img src={src} alt="Lights"/>
            <p className="card-text">
              {photo.description}
            </p>
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
            >
              <button
                type="button"
                className="btn"
                onClick={() => deletePhoto(photo.id)}
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  const deletePhoto = (photoId) => {
    axios.post('http://localhost:8000/photoMeta/' + photoId + "/delete/")
      .then((response) => {
        fetchProfileData()
        console.log(response)
      })
  }


  const renderSettings = () => {
    return (
      <div>
        <p>Uwaga usuniecie konta jest nieodwracalne!</p>
        <button
          type="button"
          className="btn bg-primary light"
          onClick={() => deleteAccount()}
        >
          Usuń
        </button>
      </div>
    )
  }

  const deleteAccount = () => {
    axios.post('http://localhost:8000/deleteAccount/')
      .then((response) => {
        setRedirect(true)
        console.log(response)
      })
  }


  require('./MyProfileStyle.css');
  require('./Style.css');
  require('./MainStyle.css');


  if (redirect) {
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
              WhiteWall
            </a>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button" data-toggle="collapse"
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
                  <Link to="/addphoto" className="btn bg-primary light">
                    Dodaj zdjęcie
                  </Link>
                  <Link to="/search" className="btn bg-primary light">
                    Znajdź innych użytkowników
                  </Link>
                  <Link to="/logout" className="btn bg-primary light">
                    Wyloguj się
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row profile ">
            <div className="col-md-3">
              <div className="profile-sidebar  ">
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    <h2>{username}</h2>
                  </div>
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className={displaySettings ? "" : "active"}>
                      <a href="#" onClick={() => setDisplaySettings(false)}>
                        <i className="glyphicon glyphicon-home"/>
                        Przegląd
                      </a>
                    </li>
                    <li className={displaySettings ? "active" : ""}>
                      <a href="#" onClick={() => setDisplaySettings(true)}>
                        <i className="glyphicon glyphicon-user"/>
                        Ustawienia konta
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="profile-content">
                {displaySettings ? renderSettings() : renderAllPhotos()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile

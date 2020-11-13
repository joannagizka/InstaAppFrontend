import axios from 'axios';
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";


const Profile = () => {
  const arr = window.location.href.split("/");

  const [username, setUsername] = useState('')
  const [photos, setPhotos] = useState([])
  const [userId, setUserId] = useState(arr[arr.length - 1])
  const [isObserved, setIsObserved] = useState(false)


  useEffect(() => {
    axios.get("http://localhost:8000/profile/" + userId + "/").then(response => {
      setUsername(response.data.username)
      setIsObserved(response.data.isObserved)
      setPhotos(response.data.photos)
    })
  }, [])


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
    const src = "http://localhost:8000/photo/" + photo.id + "/"
    const linkTo = "/photodetails/" + photo.id;
    return (
      <Link to={linkTo} className="card col-md-4 thumbnail">
        <img src={src} alt="Lights"/>
        <div className="card-body">
          <p className="card-text">{photo.description}</p>
        </div>
      </Link>
    )
  }



  const handleClick = () => {
    const path = isObserved ? "unfollow/" : "follow/";
    axios.get("http://localhost:8000/" + path + userId + "/").then(response => {
      setIsObserved(!isObserved);
    })
  }



  const isFollowed = () => {
    return (
      <button type="button" className="btn btn-primary" onClick={handleClick} id={userId}>
        {isObserved ? 'przestań obserwować' : 'obserwuj'}
      </button>
    );
  }



  require('./MyProfileStyle.css');
  require('./Style.css');
  require('./MainStyle.css');

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
              aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div className="btn-group">
                  <Link to="/addphoto" className="btn bg-primary light">Dodaj zdjęcie</Link>
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
                    <h2>{username}</h2>
                  </div>
                </div>
                <div className="profile-userbuttons">
                  {isFollowed()}
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className="active">
                      <a href="#">
                        <i className="glyphicon glyphicon-home"/>
                        Przegląd </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="profile-content">
                {renderAllPhotos()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Profile
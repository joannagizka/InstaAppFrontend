import axios from 'axios';
import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import LeftSideNavBarComponent from "./Components/LeftSideNavBarComponent";
import CenterComponent from "./Components/CenterComponent";
import RightSideComponent from "./Components/RightSideComponent ";
import PageTemplateComponent from "./Components/PageTemplateComponent";


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

    const src = photo.photo;
    const linkTo = "/photodetails/" + photo.id;


    return (
      <div>
        <div className="card-body">
          <Link to={linkTo} className="col-md-6 thumbnail">
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


  if (redirect) {
    return <Redirect to="/"/>;
  }

  return (
    <PageTemplateComponent>
      <LeftSideNavBarComponent/>
      <CenterComponent>
        <div className="container">
          <div className="col-md-9">
            <div className="profile-content">
              {displaySettings ? renderSettings() : renderAllPhotos()}
            </div>
          </div>
        </div>
      </CenterComponent>
      <RightSideComponent/>
    </PageTemplateComponent>

  );
}

export default MyProfile

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
  const redirect = false;

  useEffect(() => {
    fetchProfileData()
  }, [])


  const fetchProfileData = () => {
    axios.get('http://localhost:8000/api/myprofilephotos/')
      .then((response) => {
        setPhotos(response.data.photos)

        setUsername(response.data)
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
      <div className="col-md-4" key={photo.id}>
        <Link to={linkTo}>
          <div className="image-container">
            <img id="profilePhotos" src={src} alt="Lights"/>
          </div>
        </Link>
      </div>
    )
  }


  if (redirect) {
    return <Redirect to="/"/>;
  }

  return (
    <PageTemplateComponent>
      <LeftSideNavBarComponent tabToHighlight="myprofile"/>
      <CenterComponent>
        {(photos.length === 0) ?
          <div>
            <div id="user-bio">
              <h4>{username.username}
              </h4>
              <h5><b>{username.followersAmount}</b> followers</h5>
              <h5><b>{photos.length}</b> posts</h5>
            </div>
            Your profile is empty now, start adding photos.
          </div>
          :
          <div>
            <div id="user-bio">
              <h4>{username.username}
              </h4>
              <h5><b>{username.followersAmount}</b> followers</h5>
              <h5><b>{photos.length}</b> posts</h5>
            </div>
            {renderAllPhotos()}
          </div>
        }
      </CenterComponent>
      <RightSideComponent/>
    </PageTemplateComponent>
  );
}

export default MyProfile

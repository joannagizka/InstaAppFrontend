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
  const [redirect, setRedirect] = useState(false)

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

      <div className="col-md-4">
        <Link to={linkTo}>
          <img src={src} alt="Lights"/>
          <p className="card-text">
            {photo.description}
          </p>
        </Link>
      </div>
    )
  }


  if (redirect) {
    return <Redirect to="/"/>;
  }

  return (
    <PageTemplateComponent>
      <LeftSideNavBarComponent/>
      <CenterComponent>
        {(photos.length === 0) ?
          <div>
            <div>
              <h2>{username.username}</h2>
              <h4>followers: {username.followersAmount}</h4>
            </div>
            Your profile is empty now, start adding content.
          </div>
          :
          <div>
            <div>
              <h2>{username.username}</h2>
              <h4>followers: {username.followersAmount}</h4>
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

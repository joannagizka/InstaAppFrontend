import axios from 'axios';
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PageTemplateComponent from "./Components/PageTemplateComponent";
import LeftSideNavBarComponent from "./Components/LeftSideNavBarComponent";
import CenterComponent from "./Components/CenterComponent";
import RightSideComponent from "./Components/RightSideComponent ";
import ButtonComponent from "./Components/ButtonComponent";


const Profile = () => {
  const arr = window.location.href.split("/");
  const userId = arr[arr.length - 1]

  const [users, setUsers] = useState([])
  const [photos, setPhotos] = useState([])
  const [isObserved, setIsObserved] = useState(false)


  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    axios.get("http://localhost:8000/api/users/" + userId + "/").then(response => {
      setUsers(response.data);
      setPhotos(response.data.photos)
      setIsObserved(response.data.followedByMe)
      console.log(response)
      console.log(isObserved)
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
    const src = photo.photo
    const linkTo = "/photodetails/" + photo.id;
    return (
      <div className="col-md-4">
        <Link to={linkTo}>
          <div id="profilePhotos" className="image-container">
            <img src={src} alt="Lights"/>
            <p/>
          </div>
        </Link>
      </div>
    )
  }


  const handleClick = (userId, followedByMe) => {
    const path = followedByMe ? "unfollow/" : "follow/";

    axios.post("http://localhost:8000/api/users/" + userId + "/" + path)
      .then(() => {
        getUser()
      })
  }


  const isFollowed = (isObserved) => {
    return (
      <ButtonComponent
        id="follow"
        type="button "
        onClick={() => handleClick(userId, isObserved)}
      >
        {isObserved ? 'unfollow' : 'follow'}
      </ButtonComponent>
    );
  }


  require('./MyProfileStyle.css');
  require('./Style.css');
  require('./MainStyle.css');

  return (
    <PageTemplateComponent>
      <LeftSideNavBarComponent/>
      <CenterComponent>
        <div>
          <h2>{users.username}</h2>
          <h4>followers: {users.followersAmount}</h4>
        </div>
        <div>
          {isFollowed(isObserved)}
        </div>
        <div>
          {renderAllPhotos()}
        </div>
      </CenterComponent>
      <RightSideComponent/>
    </PageTemplateComponent>
  );
}


export default Profile
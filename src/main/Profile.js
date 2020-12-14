import axios from 'axios';
import React, {useState, useEffect, useCallback} from "react";
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

  const getUser = useCallback(() => {
    axios.get("http://localhost:8000/api/users/" + userId + "/").then(response => {
      setUsers(response.data);
      setPhotos(response.data.photos)
      setIsObserved(response.data.followedByMe)
    })
  }, [userId])

  useEffect(() => {
    getUser()
  }, [getUser])

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
      <div className="col-md-4" key={photo.id}>
        <Link to={linkTo}>
          <div className="image-container">
            <img id="profilePhotos" src={src} alt="Lights"/>
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
        id="follow-on-profile"
        type="button "
        onClick={() => handleClick(userId, isObserved)}
      >
        {isObserved ? 'followed' : 'follow'}
      </ButtonComponent>
    );
  }

  return (
    <PageTemplateComponent>
      <LeftSideNavBarComponent/>
      <CenterComponent>
        <div id="user-bio">
          <h4>{users.username}
            {isFollowed(isObserved)}
          </h4>
          <h5><b>{users.followersAmount}</b> followers</h5>
          <h5><b>{photos.length}</b> posts</h5>
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
import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Redirect} from "react-router-dom";

const LeftSideNavBarComponent = () => {

  const [redirectToMain, setRedirectToMain] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
    setRedirectToMain(true);
  }


  if (redirectToMain) {
    return (<Redirect to="/main"/>)
  }

  return (
    <div className="col-md-2">
      <div className="navbar-brand" href="/mainpageforloggedin">WhiteWall</div>
      <ul className="navbar-nav ml-auto">
        <Link to="/addphoto">Add photo</Link>
        <Link to="/myprofile">My profile</Link>
        <Link to="/search">Search for other users</Link>
        <Link to="/logout" onClick={handleLogout}>Log out</Link>
      </ul>
    </div>
  )
}

export default LeftSideNavBarComponent
import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Redirect} from "react-router-dom";

const LeftSideNavBarComponent = ({ tabToHighlight }) => {

  const [redirectToMain, setRedirectToMain] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
    setRedirectToMain(true);
  }


  if (redirectToMain) {
    return (<Redirect to="/main"/>)
  }

  const isActive = (tabName) => {
    if (tabName === tabToHighlight) {
      return "active"
    }
    return ""
  }

  return (
    <div className="col-md-2">
      <div className="site-logo">
        <Link to="/mainpageforloggedin">
        <img  id="logo" src="/WhiteWallLogo.png" alt="logo"/>
        </Link>
      </div>
      <h5>Menu</h5>
      <ul className="list-group list-group-flush list-group-item-action">
        <Link to="/mainpageforloggedin">
          <li className={"list-group-item list-group-item-action " + isActive("mainpageforloggedin")}>
            <a>Home</a>
          </li>
        </Link>
        <Link to="/addphoto">
          <li className={"list-group-item list-group-item-action " + isActive("addphoto")}>
           <a>Add photo</a>
          </li>
          </Link>
        <Link to="/myprofile">
          <li className={"list-group-item list-group-item-action " + isActive("myprofile")} >
            <a>My profile</a>
          </li>
        </Link>
        <Link to="/login" onClick={handleLogout}>
          <li className="list-group-item list-group-item-action">
            <a>Logout</a>
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default LeftSideNavBarComponent
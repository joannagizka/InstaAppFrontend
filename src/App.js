import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainPage from "./main/MainPage";
import Register from "./main/Register";
import Logging from "./main/Logging";
import MyProfile from "./main/MyProfile";
import AddPhoto from "./main/AddPhoto";
import MainPageForLoggedIn from "./main/MainPageForLoggedIn";
import PhotoDetails from "./main/PhotoDetails";
import Search from "./main/Search";
import Profile from "./main/Profile";
import axios from 'axios';
import Logout from "./main/Logout";

axios.defaults.withCredentials = true;
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Logging />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
          </Route>
          <Route path="/addphoto">
            <AddPhoto />
          </Route>
          <Route path="/mainpageforloggedin">
            <MainPageForLoggedIn />
          </Route>
          <Route path="/photodetails/:id"  >
            <PhotoDetails />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


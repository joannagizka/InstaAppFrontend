import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainPage from "./main/MainPage";
import Register from "./main/Register";
import Logging from "./main/Logging";
import WelcomeSite from "./main/WelcomeSite";
import MyProfile from "./main/MyProfile";
import AddPhoto from "./main/AddPhoto";
import SeeYouLater from "./main/SeeYouLater";
import MainPageForLoggedIn from "./main/MainPageForLoggedIn";
import axios from 'axios';

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
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/welcome">
            <WelcomeSite />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
          </Route>
          <Route path="/addphoto">
            <AddPhoto />
          </Route>
          <Route path="/seeyoulater">
            <SeeYouLater />
          </Route>
          <Route path="/mainpageforloggedin">
            <MainPageForLoggedIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


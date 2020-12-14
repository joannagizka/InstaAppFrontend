import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import PageTemplateComponent from "./Components/PageTemplateComponent";
import CenterComponent from "./Components/CenterComponent";
import ButtonComponent from "./Components/ButtonComponent";
import axios from "axios";
import FooterComponent from "./Components/FooterComponent";


const MainPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToWelcome, setRedirectToWelcome] = useState(false)


  const handleSubmit = (event) => {
      event.preventDefault();

      const data = {
        username: username,
        password: password
      };

      axios.post('http://127.0.0.1:8000/api/users/', data)
        .then((response) => {

          setRedirectToWelcome(true);
          const token = `Token ${response.data.token}`
          axios.defaults.headers.common['Authorization'] = token;

          localStorage.setItem('token', token);
        })

    }

  ;

  if (redirectToWelcome) {
    return <Redirect to="/mainpageforloggedin"/>;
  }

  return (
    <PageTemplateComponent>
      <nav className=" navbar-expand-sm col-md-2">
        <div className="site-logo">
          <Link to="/">
            <img id="logo" src="/WhiteWallLogo.png" alt="logo"/>
          </Link>
        </div>
      </nav>
      <CenterComponent>
        <div id="main-page-center-content">
          <div className=" d-flex flex-row-reverse">
            <div className="dropdown col-3">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="follow-unfollow-button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Login
              </button>
              <form className="dropdown-menu p-4">
                <h5>Log in</h5>
                <div className="form-group">
                  <label htmlFor="dropdown-username">Username</label>
                  <input type="email" className="form-control" id="dropdown-username"
                         placeholder="username"/>
                </div>
                <div className="form-group">
                  <label htmlFor="dropdown-password">Password</label>
                  <input type="password" className="form-control" id="dropdown-password"
                         placeholder="password"/>
                </div>

                <button type="submit" id="follow-unfollow-button" className="btn btn-primary">Log in</button>
              </form>
            </div>
          </div>


          <div id="main-page-lower-content" className="row">
            <div id="text-col-main-page" className="col-6">
              <div className="base-container center form-group justify-content-center row">
                <div className="container register-form flex-column">
                  <div className="form">
                    <div className="form-content">
                      <div className="row">
                        <div className="col-md-6 mx-auto">
                          <h4>Register right now! </h4>
                          <div className="form-group">
                            <label id="username"/>
                            <input
                              type="text"
                              name="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className="form-control"
                              placeholder="Username"
                            />
                          </div>
                          <div className="form-group">
                            <label id="password"/>
                            <input
                              type="password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                              placeholder="Password"
                            />
                          </div>
                          <div className="form-group">
                            <ButtonComponent
                              id="follow-unfollow-button"
                              type="button"
                              className="btnSubmit"
                              onClick={handleSubmit}
                            >
                              Sign up
                            </ButtonComponent>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="image-container2">
                <img src="/mockup.png" alt="logo"/>
              </div>
            </div>
          </div>
        </div>
      </CenterComponent>
    </PageTemplateComponent>
  );
}

export default MainPage;
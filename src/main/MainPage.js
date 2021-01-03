import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import PageTemplateComponent from "./Components/PageTemplateComponent";
import CenterComponent from "./Components/CenterComponent";
import ButtonComponent from "./Components/ButtonComponent";
import axios from "axios";


const MainPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToWelcome, setRedirectToWelcome] = useState(false)


  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    login(usernameLogin, passwordLogin)
  }

  const login = (username, password) => {

    const dataLogin = {
      username,
      password
    }

    axios.post("auth/", dataLogin
    ).then((response) => {
      const token = `Token ${response.data.token}`
      axios.defaults.headers.common['Authorization'] = token;

      localStorage.setItem('token', token);

      setRedirectToWelcome(true);
    }).catch((error) => {
      alert("Blad w trakcie logowania")
    });
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    axios.post('http://127.0.0.1:8000/api/registration/', data)
      .then(() => {
        login(username, password)
      })
      .catch(() => {
        alert("Ups! Something went wrong, try again later.")
      })
  }

  if (redirectToWelcome) {
    return <Redirect to="/mainpageforloggedin"/>;
  }

  return (
    <PageTemplateComponent>
      <nav className="navbar-expand-sm col-md-2">
        <div className="site-logo">
          <Link to="/">
            <img id="logo" src="/WhiteWallLogo.png" alt="logo"/>
          </Link>
        </div>
      </nav>
      <CenterComponent>
        <div id="main-page-center-content">
          <div className=" d-flex flex-row-reverse">
            <div className="dropdown col-md-3 col-sm-4 col-xs-4">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="strech-button-violet"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Login
              </button>
              <form className="dropdown-menu p-4">
                <h5>Log in</h5>
                <div className="form-group">
                    Username
                  <input
                    type="email"
                    className="form-control"
                    id="dropdown-username"
                    placeholder="username"
                    value={usernameLogin}
                    onChange={(e) => setUsernameLogin(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                    Password
                  <input
                    type="password"
                    className="form-control"
                    id="dropdown-password"
                    placeholder="password"
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    required
                  />
                </div>

                <form onSubmit={handleSubmitLogin}>
                  <ButtonComponent
                    id="loggin-button"
                    type="submit"
                    className="btnSubmit"
                  >
                    Login
                  </ButtonComponent>
                </form>
              </form>
            </div>
          </div>


          <div id="main-page-lower-content" className="row">
            <div id="text-col-main-page" className="col-md-6 col-sm-12 col-xs-12">
              <div className="base-container center form-group justify-content-center row">
                <div className="container register-form flex-column">
                  <div className="form-content">
                    <div className="row">
                      <div className="col-6 mx-auto">
                        <h4>Register right now! </h4>
                        <div className="form-group">
                          <p>username</p>
                          <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="username"
                          />
                        </div>
                        <div className="form-group">
                          <p>password</p>
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="password"
                          />
                        </div>
                        <div className="form-group">
                          <ButtonComponent
                            id="strech-button-violet"
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
            <div className="col-md-6 col-sm-12 col-xs-12">
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
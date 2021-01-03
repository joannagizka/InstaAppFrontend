import React, {useState} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToWelcome, setRedirectToWelcome] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

   axios.post('api/users/', data)
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

    <div>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="\">WhiteWall</a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="fas fa-bars"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <div className="btn-group">
                <Link to="/register" className="btn bg-primary light">
                  Kliknij do rejestracji
                </Link>
                <Link to="/login" className="btn bg-primary light">
                  Kliknij do logowania
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div className="base-container center form-group justify-content-center row">
        <div className="container register-form flex-column">
          <div className="form">
            <div className="form-content">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <p>Utwórz konto w WhiteWall</p>
                  <div className="form-group">
                    <label id="username"/>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                      placeholder="Nazwa użytkownika *"
                    />
                  </div>
                  <div className="form-group">
                    {/*<div className="form-group">*/}
                    <label id="password"/>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Hasło *"
                    />
                    {/*</div>*/}
                  </div>
                  <div className="form-group col-md-auto">
                    <button type="button" className="btnSubmit" onClick={handleSubmit}>Zarejestruj</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}

export default Register
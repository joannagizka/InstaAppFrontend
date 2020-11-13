import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Search = () => {

  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')


  useEffect(() => {
    searchUsers()
  }, [])


  const searchUsers = () => {
    setQuery(query ? "?username=" + query : "");

    axios.get("http://localhost:8000/users/" + query)
      .then((response) => {
        setUsers(response.data.users);
      })
  }


  const renderUsers = () => {
    const renderedUsers = [];

    for (let user of users) {
      renderedUsers.push(makeListOftheSearchedProfiles(user.id, user.username, user.isObserved));
    }
    return (
      <ul>
        {renderedUsers}
      </ul>
    )
  }


  const handleClick = (id, isObserved) => {
    console.log(id);
    console.log(isObserved);

    const path = isObserved ? "unfollow/" : "follow/";

    axios.get("http://localhost:8000/" + path + id + "/")
      .then((response) => {
        searchUsers()
        (console.log(response))
      })
  }


  const makeListOftheSearchedProfiles = (id, username, isObserved) => {
    const to = "/profile/" + id
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to={to}>
              <p>
                {username}
              </p>
            </Link>
            <button type="button" className="btn btn-primary" onClick={() => handleClick(id, isObserved)} id={id}>
              {isObserved ? 'przestań obserwować' : 'obserwuj'}
            </button>
          </li>
        </ul>
      </div>
    )
  }


  require('./Style.css');

  return (
    <div className="body">
      <div className="layout">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger rounded mb-0" href="/mainpageforloggedin">WhiteWall</a>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button" data-toggle="collapse"
              data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
              aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div className="btn-group">
                  <Link to="/addphoto" className="btn bg-primary light">Dodaj zdjęcie</Link>
                  <Link to="/myprofile" className="btn bg-primary light">Pokaż mój profil</Link>
                  <Link to="/logout" className="btn bg-primary light">Wyloguj się</Link>
                </div>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <h5 className="font-weight-light mb-4 ">Znajdź użytkowników, którzy Cię intersują i obserwuj ich</h5>
              <div className="bg-white p-5 rounded shadow">
                <form action="">
                  <div className="input-group-prepend border-0">
                    <button type="button" className="btn btn-link text-info"><i
                      className="fa fa-search"/></button>
                    <i className="fas fa-search fa-7x"/>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <input
                        type="search"
                        placeholder="Wpisz nazwę użytkownika, którego szukasz"
                        aria-describedby="button-addon4"
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="form-control bg-none border-1"
                        required/>
                    </div>
                    <div>
                      <ul className="ml-auto">
                        <div className="btn-group">
                          <button type="button" className="btn bg-primary light" onClick={() => searchUsers()}>
                            Szukaj
                          </button>
                        </div>
                      </ul>
                    </div>
                    <div className="container">
                      <div className="profile-content col-md-2s align-content-md-center">
                        {renderUsers()}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
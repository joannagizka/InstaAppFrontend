import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

const RightSideComponent = (props) => {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')

  const searchUsers = (query) => {
    const queryString = query ? "?search=" + query : "";

    axios.get("http://localhost:8000/api/users/" + queryString)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data)
      })
    console.log(query)
  }

  const renderUsers = () => {
    const renderedUsers = [];

    for (let user of users) {
      renderedUsers.push(makeListOftheSearchedProfiles(user.id, user.username, user.followedByMe));
    }
    return (
      <React.Fragment>
        {renderedUsers}
      </React.Fragment>
    )
  }

  useEffect(() => {
    searchUsers('')
  }, [])


  const handleClick = (id, followedByMe) => {
    console.log(id);
    console.log(followedByMe);

    const path = followedByMe ? "unfollow/" : "follow/";

    axios.post("http://localhost:8000/api/users/" + id + "/" + path)
      .then(() => {
        searchUsers(query)
      })
  }


  const makeListOftheSearchedProfiles = (id, username, isObserved) => {
    const to = "/profile/" + id
    return (
      <ul id="follow-unfollow" className="list-group">
        <li className="list-group-item">

          <Link to={to}>
            <h5 id="search-username" className="mb-2 col-sm-12">
              {username}
            </h5>
          </Link>

          <span className="col-sm-12">
            <ButtonComponent id="follow-unfollow-button" type="button " onClick={() => handleClick(id, isObserved)} id={id}>
              {isObserved ? 'unfollow' : 'follow'}
            </ButtonComponent>
          </span>
        </li>
      </ul>

    )
  }


  return (
    <div id="RightSideComponent" className="col-md-3">
      <nav className="navbar navbar-light">
        <form className="form-inline" id="search">
          <input
            id="search-input"
            className="form-control col-sm-12 mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ButtonComponent className="btn my-2 my-sm-0" type="button" onClick={() => searchUsers(query)}>
            Search
          </ButtonComponent>
        </form>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">{renderUsers()}</li>
        </ul>
      </nav>
    </div>
  )
}

export default RightSideComponent
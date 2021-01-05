import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

const RightSideComponent = () => {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')

  const searchUsers = (query) => {
    const queryString = query ? "?search=" + query : "";

    axios.get("api/users/" + queryString)
      .then((response) => {
        setUsers(response.data);
      })
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


  function refreshPage() {
    window.location.reload(false);
  }

  const handleClick = (id, followedByMe) => {
    const path = followedByMe ? "unfollow/" : "follow/";

    axios.post("api/users/" + id + "/" + path)
      .then(() => {
        searchUsers(query)
        refreshPage()
      })
      .catch(() => {
        alert('Ups! Something went wrong, try again later.')
      })
  }


  const makeListOftheSearchedProfiles = (id, username, isObserved) => {
    const to = "/profile/" + id
    return (
      <div id="user-list" className="row" key={id}>
        <div className="col-xl-6 col-lg-12 col-md-6">
          <Link to={to}>
            <h5 id="search-username">
              {username}
            </h5>
          </Link>
        </div>
        <div className="col-xl-6 col-lg-12 col-md-6">
          <ButtonComponent
            className="btn-block"
            id="strech-button-violet"
            type="button "
            onClick={() => handleClick(id, isObserved)}
          >
            {isObserved ? 'unfollow' : 'follow'}
          </ButtonComponent>
        </div>
      </div>
    )
  }


  return (
    <div id="RightSideComponent" className="col-lg-2 col-md-12">
      <form id="search" className="d-flex justify-content-center">
        <div className="input-group row">
          <input
            id="search-input"
            className="form-control "
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <span className="input-group-btn">
          <ButtonComponent
            className="btn-block"
            id="search-button"
            type="button"
            onClick={() => searchUsers(query)}
          >
            <span className="fa fa-search" aria-hidden="true"/>
          </ButtonComponent>
            </span>
        </div>
      </form>
      <h6>Some interesting users for You:</h6>
      <div>{renderUsers()}</div>
    </div>
  )
}

export default RightSideComponent
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
      <div id="user-list" className="row">
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
            id="follow-unfollow-button"
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
            <span className="fa fa-search" aria-hidden="true"
            />
          </ButtonComponent>
            </span>
        </div>
      </form>
      <div>{renderUsers()}</div>
    </div>
  )
}

export default RightSideComponent
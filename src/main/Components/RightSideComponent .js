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
      <ul className="list-group row">
        <li className="list-group-item ">
          <div className=" col-xs-1  center-block align-baseline">
            <Link to={to}>
              <h5 id="search-username" className="mb-2">
                {username}
              </h5>
            </Link>
          </div>
          <div className="float-right align-baseline ">
          <ButtonComponent
            className="mb-2"
            id="follow-unfollow-button"
            type="button "
            onClick={() => handleClick(id, isObserved)}
          >
            {isObserved ? 'unfollow' : 'follow'}
          </ButtonComponent>
          </div>
        </li>
      </ul>
    )
  }


  return (
    <div id="RightSideComponent" className="col-md-3">
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
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{renderUsers()}</li>
      </ul>
    </div>
  )
}

export default RightSideComponent
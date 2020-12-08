import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

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

  useEffect(() => {
    searchUsers('')
  }, [])

  const renderUsers = () => {
    const renderedUsers = [];

    for (let user of users) {
      renderedUsers.push(makeListOftheSearchedProfiles(user.id, user.username, user.followedByMe));
    }
    return (
      <ul>
        {renderedUsers}
      </ul>
    )
  }


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
      <div className="row">
        <Link to={to}>
          <p>
            {username}
          </p>
        </Link>
        <button type="button" onClick={() => handleClick(id, isObserved)} id={id}>
          {isObserved ? 'unfollow' : 'follow'}
        </button>
      </div>
    )
  }


  return (
    <div className="col-md-3">
      <form>
          <div>
            <input
              type="search"
              placeholder="Search"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
              required/>
            <button type="button" onClick={() => searchUsers(query)}>
              Search
            </button>
          </div>
          <div className="row">
            {renderUsers()}
          </div>
      </form>
    </div>

  )
}

export default RightSideComponent
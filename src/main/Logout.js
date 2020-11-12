import React, {useState, useEffect} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

const Logout = () => {

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    axios.post('http://localhost:8000/logout/').then((response) => {
      setRedirect(true);
    });
  }, [])


  if (redirect) {
    return <Redirect to="/"/>;
  }
  return ""
}

export default Logout;
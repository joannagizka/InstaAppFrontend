import axios from 'axios';
import React, { Component } from "react";
import {Link} from "react-router-dom";


export default class MyProfile extends Component {

  state= {
      username: ""
  };

  componentDidMount() {
    axios.get('http://localhost:8000/myProfile/').then(response =>{
      console.log(response.data.username);
      this.setState({username: response.data.username});
    })

  }
  render(){
    return (
      <div>
        <h1>to jest twoj profil</h1>
        <h2>{this.state.username}</h2>
        <Link to="/addphoto">Dodaj zdjęcie</Link>
      </div>
    );
  }
}



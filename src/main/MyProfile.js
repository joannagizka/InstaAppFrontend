import axios from 'axios';
import React, { Component } from "react";


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

      </div>
    );
  }
}



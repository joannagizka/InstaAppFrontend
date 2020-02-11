import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this); //tego nie
    this.handleSubmit = this.handleSubmit.bind(this); //i tego tez
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault(); //tego tez

    const data = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('http://localhost:8000/register/', JSON.stringify(data))
      .then(response => {
        alert(response.data);
        console.log(response);
      })
      .catch(error => {
        if (error.response.status===400){
          alert("Użytkownik o danej nazwie użytkownika już istnieje");
        }
      });
  }





  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
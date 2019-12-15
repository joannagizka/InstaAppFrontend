import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    event.preventDefault();
    //TODO jesli username i password beda puste wyswietl alert i nie wysylaj na serwer
    // alert('A name was submitted: ' + this.state.use/name + ' password ' + this.state.password);

    const data = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('http://localhost:8000/register/', JSON.stringify(data))
      .then(function (response) {
        alert(response.data);
        console.log(response);
      })
      .catch(function (error) {
        alert(error.body);
        console.log(error);
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
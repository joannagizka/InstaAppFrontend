import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

export default class AddPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.handlePhotoUploadChange = this.handlePhotoUploadChange.bind(this);
  }

  handleDescriptionChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handlePhotoUploadChange(event) {
    console.log(event);
  }

  handleSubmit(event) {
    const { description } = this.state;

    axios.post(
      "http://localhost:8000/addPhoto/",
      JSON.stringify({
        photoA: {
          description: description
        }
      })
    ).then(response => {
      this.uploadPhoto(response.data.photoId);
    })

    event.preventDefault();
  }

  uploadPhoto(id) {

  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            required
          />
          <input
            type="file"
            id="photoUpload"
            name="Upload photo"
            accept="image/png, image/jpeg"
            onChange={this.handlePhotoUploadChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}



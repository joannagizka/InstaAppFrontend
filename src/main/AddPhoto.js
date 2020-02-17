import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

export default class AddPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      photoSrc: ""

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.handlePhotoUploadChange = this.handlePhotoUploadChange.bind(this);
    this.setPhotoSource = this.setPhotoSource.bind(this);
  }

  handleDescriptionChange(event) {
    this.setState({
      "description": event.target.value
    });
  }

  setPhotoSource(event) {
    this.setState({
      "photoSrc": event.target.result
    });
  }

  handlePhotoUploadChange(event) {
    // console.log(event.target.files);
    let input = event.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = this.setPhotoSource;

      reader.readAsDataURL(input.files[0]);
    }
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
    });

    event.preventDefault();
  }

  uploadPhoto(id) {
    axios.post(
      //poczytaj o "url path parameters"
      "http://localhost:8000/addPhotoContent/" + id,
      //wylij zawartos zjecia
      //poszukaj jak "convert html image src to raw bytes" a potem wysłać to tutaj przez axiosa
    ).then(response => {
      this.uploadPhoto(response.data.photoId);
    })
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
          <img
            id="photo"
            src={this.state.photoSrc}
            alt="your image"
            height="500"
            width="500"
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



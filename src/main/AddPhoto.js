import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

export default class AddPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      photoSrc: "",
      photoData: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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
    this.setState({photoData: event.target.files[0]});
    let input = event.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = this.setPhotoSource;

      reader.readAsDataURL(input.files[0]);
    }
  }

  handleSubmit(event) {
    const formData = new FormData();
    formData.append(
      'file',
      this.state.photoData,
    );
    formData.append('description', this.state.description);
    axios.post(
      "http://localhost:8000/addPhoto/",
      formData
    ).then(response => {
      console.log(response);
    });

    event.preventDefault();
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



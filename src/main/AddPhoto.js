import React, {Component} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";

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

    require('./Style.css');
    require('./MainStyle.css');
    require("./AddPhotoStyle.css");

    return (
      <div className="layout text-center col-md-8">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="/mainpageforloggedin">insta-app</a>
            <button className="navbar-toggler navbar-toggler-right"
                    type="button" data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div className="btn-group">
                  <Link to="/myprofile" className="btn bg-primary light">Mój profil</Link>
                  <Link
                    to="/seeyoulater"
                    className="btn bg-primary light"
                    onClick={this.handleLogout}>
                    Wyloguj się
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </nav>
        <form onSubmit={this.handleSubmit}>
          <div className="center1">
            <div className="frame">
              <div className="center">
                <div className="title">
                  <h1>Wybierz zdjęcie</h1>
                </div>
                <div className="dropzone">
                  <img src="https://img.icons8.com/wired/64/000000/add-image.png"/>
                  <input
                    type="file"
                    name="Upload photo"
                    accept="image/png, image/jpeg"
                    onChange={this.handlePhotoUploadChange}
                    className="upload-input"
                  />
                </div>
                <textarea
                  id="description"
                  placeholder="Dodaj opis do zdjęcia"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                  required
                />
                <button type="submit" className="btn" name="uploadbutton">Dodaj</button>
              </div>
              <img
                className="centered-and-cropped"
                width="500"
                height="500"
                src={this.state.photoSrc}
                alt="your image"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}



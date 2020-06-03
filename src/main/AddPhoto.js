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
      redirectToMyProfile: false,
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
        this.setState({redirectToMyProfile: true});
      }
    );

    event.preventDefault();
  }

  render() {

    require('./Style.css');
    require('./MainStyle.css');


    if (this.state.redirectToMyProfile) {
      return <Redirect to="/myprofile"/>;
    }

    return (
      <div className="layout text-center">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="/mainpageforloggedin">WhiteWall</a>
            <button className="navbar-toggler navbar-toggler-right"
                    type="button" data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div className="btn-group">
                  <Link to="/myprofile" className="btn bg-primary light">Mój profil</Link>
                  <Link to="/search" className="btn bg-primary light">Znajdź innych użytkowników</Link>
                  <Link
                    to="/logout"
                    className="btn bg-primary light"
                  >
                    Wyloguj się
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </nav>

        <div className="d-flex justify-content-center col-6 mx-auto">
          <div className="container">
            <row>
              <form onSubmit={this.handleSubmit}>
                <div className="col">
                  <h3 className="text-left">Wybierz zdjęcie</h3>
                </div>


                <div className="col mx-auto text-center">

                  <div className="form-group">
                    <input
                      type="file" c
                      lassName="form-control-file"
                      id="exampleFormControlFile1"
                      accept="image/png, image/jpeg"
                      onChange={this.handlePhotoUploadChange}
                    />
                  </div>

                </div>

                <div className="col mx-auto text-center">
                <textarea
                  className="form-control"
                  id="textareacontent"
                  rows="3"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                  required
                />
                </div>

                <img
                  className="centered-and-cropped rounded mx-auto d-block"
                  src={this.state.photoSrc}
                  alt="your image"/>

                <button type="submit" className="btn btn-primary button-button" name="uploadbutton">Dodaj</button>

              </form>
            </row>


          </div>
        </div>

      </div>
    );
  }
}

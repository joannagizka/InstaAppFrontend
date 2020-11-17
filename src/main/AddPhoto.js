import React, {useState} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import ButtonComponent from "./Components/ButtonComponent";

const AddPhoto = () => {

  const [description, setDescription] = useState('')
  const [photoSrc, setPhotoSrc] = useState('')
  const [photoData, setPhotoData] = useState('')
  const [redirectToMyProfile, setRedirectToMyProfile] = useState('')


  const photoSourceSetter = (event) => {
    setPhotoSrc(event.target.result)
  }

  const handlePhotoUploadChange = (event) => {
    setPhotoData(event.target.files[0]);
    let input = event.target;

    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = photoSourceSetter;
      reader.readAsDataURL(input.files[0]);
    }
  }


  const handleSubmit = (event) => {
    const formData = new FormData();

    formData.append('photo', photoData);
    formData.append('description', description);

    axios.post("http://127.0.0.1:8000/api/photo/", formData)
      .then(response => {
          console.log(response);
          setRedirectToMyProfile(true);
        }
      );

    event.preventDefault();
  }

  require('./Style.css');
  require('./MainStyle.css');


  if (redirectToMyProfile) {
    return <Redirect to="/myprofile"/>;
  }


  return (
    <div className="layout text-center">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="/mainpageforloggedin">
            WhiteWall
          </a>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <div className="btn-group">
                <Link to="/myprofile" className="btn bg-primary light">
                  Mój profil
                </Link>
                <Link to="/search" className="btn bg-primary light">
                  Znajdź innych użytkowników
                </Link>
                <Link to="/logout" className="btn bg-primary light">
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
            <form onSubmit={handleSubmit}>
              <div className="col">
                <h3 className="text-left">Wybierz zdjęcie</h3>
              </div>
              <div className="col mx-auto text-center">
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoUploadChange}
                  />
                </div>
              </div>
              <div className="col mx-auto text-center">
                  <textarea
                    className="form-control"
                    id="textareacontent"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
              </div>

              <img
                className="centered-and-cropped rounded mx-auto d-block"
                src={photoSrc}
                alt="your added content"
              />

              <ButtonComponent
                type="submit"
                label="dodaj"
              />

            </form>
          </row>
        </div>
      </div>
    </div>
  );
}

export default AddPhoto;

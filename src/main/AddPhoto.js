import React, {useState} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import ButtonComponent from "./Components/ButtonComponent";
import PageTemplateComponent from "./Components/PageTemplateComponent";
import LeftSideNavBarComponent from "./Components/LeftSideNavBarComponent";
import CenterComponent from "./Components/CenterComponent";
import RightSideComponent from "./Components/RightSideComponent ";
import "../css/app.css";

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
    <PageTemplateComponent>
      <LeftSideNavBarComponent/>
      <CenterComponent>
        <row>
          <form onSubmit={handleSubmit}>
            {photoData ?
              (<div>
                <div className="col">
                  <h3>Add your post!</h3>
                </div>
                  <img
                    src={photoSrc}
                    alt="your added content"
                  />
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <ButtonComponent
                    type="submit"
                    label="add"
                  />
                </div>)
              :
              (<div>
                <div className="col">
                  <h3>Choose photo</h3>
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoUploadChange}
                  />
                </div>
              </div>
              )
            }
          </form>
        </row>
      </CenterComponent>
      <RightSideComponent/>
    </PageTemplateComponent>
  );
}

export default AddPhoto;

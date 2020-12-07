import React, {useState, useCallback} from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import getCroppedImg from './cropImage'
import {styles} from './styles'
import ButtonComponent from "./Components/ButtonComponent";

const AddPhoto = ({classes}) => {


  const [redirectToMyProfile, setRedirectToMyProfile] = useState('')
  const [description, setDescription] = useState('')
  const [photoData, setPhotoData] = useState('')
  const [photoSrc, setPhotoSrc] = useState('')
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        photoSrc,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', {croppedImage})
      setCroppedImage(croppedImage)

    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])


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
    handleSubmit2().then(() => console.log("image uploaded"))
    event.preventDefault();
  }

  const handleSubmit2 = async () => {
    const formData = new FormData();

    const config = {responseType: 'blob'};
    const imageResponse = await axios.get(croppedImage, config)

    const imageFile = new File([imageResponse.data], "tempFile.jpg")
    console.log(imageFile)
    formData.append('photo', imageFile);
    formData.append('description', description);

    const response = await axios.post("http://127.0.0.1:8000/api/photo/", formData)
    console.log(response);
    setRedirectToMyProfile(true);
  }

  require('./Style.css');
  require('./MainStyle.css');


  if (redirectToMyProfile) {
    return <Redirect to="/myprofile"/>;
  }

  return (
    <div>
      <div className={classes.cropContainer}>
        <Cropper
          image={photoSrc}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <div className={classes.sliderContainer}>
          <Typography
            variant="overline"
            classes={{root: classes.sliderLabel}}
          >
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{container: classes.slider}}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div className={classes.sliderContainer}>
          <Typography
            variant="overline"
            classes={{root: classes.sliderLabel}}
          >
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            classes={{container: classes.slider}}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{root: classes.cropButton}}
        >
          Show Result
        </Button>
      </div>


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
              accept="image/jpeg"
              onChange={handlePhotoUploadChange}
            />
          </div>
        </div>
        <div
          className="col mx-auto text-center">
          <textarea
            className="form-control"
            id="textareacontent"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <ButtonComponent
          type="submit"
          label="dodaj"
        />

      </form>
    </div>
  )

}

const StyledAddPhoto = withStyles(styles)(AddPhoto)

export default StyledAddPhoto;

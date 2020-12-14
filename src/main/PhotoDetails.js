import React, {useState, useEffect, useCallback} from 'react'
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import 'moment-timezone';
import Moment from 'react-moment';
import PageTemplateComponent from "./Components/PageTemplateComponent";
import LeftSideNavBarComponent from "./Components/LeftSideNavBarComponent";
import CenterComponent from "./Components/CenterComponent";
import RightSideComponent from "./Components/RightSideComponent ";
import ButtonComponent from "./Components/ButtonComponent";

const PhotoDetails = () => {

  const arr = window.location.href.split('/');
  const photoId = arr[arr.length - 1]

  const [photoMeta, setPhotoMeta] = useState({
    likes: [],
    comments: []
  })
  const [content, setContent] = useState('')
  const [redirectToProfile, setRedirectToProfile] = useState(false)


  const fetchPhotoMetadata = useCallback(() => {
    axios.get("http://localhost:8000/api/photodetails/" + photoId + "/").then(response => {
      setPhotoMeta(response.data)
    })
  }, [photoId])


  useEffect(() => {
    fetchPhotoMetadata();
  }, [fetchPhotoMetadata])


  const handleSubmitComment = (event) => {
    event.preventDefault()
    const data = {
      content: content,
      photo: photoId
    }

    axios.post("http://localhost:8000/api/comments/", data)
      .then(() => {
        setContent('')
        fetchPhotoMetadata()
      })
      .catch(error => {
        console.log(error);
      })
  }


  const renderAllComments = () => {
    const renderedComments = [];

    for (let comment of photoMeta.comments) {
      renderedComments.push(commentPattern(comment));
    }

    return (
      <div>
        {renderedComments}
      </div>
    )
  }


  const commentPattern = (comment) => {
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div>{renderCommentAuthorLinkTo(comment)} {comment.content}</div>
          <p className="text-muted">
            <Moment format="YYYY/MM/DD">
              {photoMeta.creationTime}
            </Moment>
          </p>
        </li>
      </ul>
    );
  }


  const renderAuthorLinkTo = () => {
    if (photoMeta.isMe) {
      return (
        <Link to="/myprofile">
          <h5 id="search-username">
            <b>{photoMeta.username}</b>
          </h5>
        </Link>
      )
    }

    const to = "/profile/" + photoMeta.ownerId;
    return (
      <Link to={to}>
        <h5 id="search-username">
          <b>{photoMeta.username}</b>
        </h5>
      </Link>
    )
  }


  const renderCommentAuthorLinkTo = (comment) => {
    if (comment.isMe) {
      return (
        <Link to="/myprofile">
          <h5 id="search-username">
            {comment.username}
          </h5>
        </Link>
      )
    }

    const to = "/profile/" + comment.owner;
    return (
      <Link to={to}>
        <h5 id="search-username">
          {comment.username}
        </h5>
      </Link>
    )
  }


  const handleLikeUnlikeClick = () => {
    const path = photoMeta.isLikedByMe ? "unlike/" : "like/";
    axios.post("http://localhost:8000/api/photodetails/" + photoId + "/" + path).then(
      () => {
        fetchPhotoMetadata()
      })
  }


  const deletePhoto = () => {
    axios.delete('http://localhost:8000/api/photo/' + photoId + '/').then(
      () => {
        setRedirectToProfile(true)
      })
  }

  const photoSrc = photoMeta.photo;

  if (redirectToProfile) {
    return (<Redirect to="/myprofile"/>)
  }


  return (
    <PageTemplateComponent>
      <LeftSideNavBarComponent/>
      <CenterComponent>
        <div id="photo-details-center">
          <div className="row">
            <div id="photo-details-photo-class" className="col-xl-8 col-l-8 col-md-8 col-sm-12 col-xs-12">
              <div id="photo-details-photo" className="image-container">
                <img src={photoSrc} alt="Lights"/>
              </div>
            </div>
            <div id="photo-details-row" className="col-xl-4 col-l-4 col-md-4 col-sm-12 col-xs-12">
              <div id="main-username" className="">
                {renderAuthorLinkTo()}
              </div>


              <div id="photo-details-list-container">
                <div id="photo-details-list" className="">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {renderAuthorLinkTo()}
                      {photoMeta.description}
                      <div className="row">
                        <div className="col-6">
                          <p className="text-muted">
                            <Moment format="YYYY/MM/DD">
                              {photoMeta.creationTime}
                            </Moment>
                          </p>
                        </div>
                        <div className="col-12">
                          {photoMeta.isMe ?
                            <span
                              title="Delete photo."
                              type="button"
                              onClick={() => deletePhoto()}
                              className="fa fa-trash"
                            />
                            : null}
                        </div>
                      </div>
                    </li>
                  </ul>
                  {!(photoMeta.comments.length === 0) ?
                    <div>
                      <b className="text-secondary">
                        Comments:
                      </b>
                      {renderAllComments()}
                    </div> :
                    <div>
                      <b className="text-secondary">
                        There is no comments yet. Add one below!
                      </b>
                    </div>
                  }
                </div>
              </div>

              <div id="photo-details-likes-and-comments" className="row">
                <div className="col-1">
                  <div
                    className=""
                    onClick={() => handleLikeUnlikeClick(photoId)}
                    id={photoId}>
                    {photoMeta.isLikedByMe ?
                      <svg
                        className="bi bi-heart"
                        width="1.3em" height="1.3em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                          clipRule="evenodd"/>
                      </svg>
                      :
                      <svg
                        className="bi bi-heart-fill"
                        width="1.3em"
                        height="1.3em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                          clipRule="evenodd"/>
                      </svg>
                    }
                    <div>
                      {photoMeta.likesAmount}
                    </div>
                  </div>
                </div>

                <div className="col-1">
                  <svg
                    className="bi bi-chat"
                    width="1.3em"
                    height="1.3em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{photoMeta.comments.length}</p>
                </div>
              </div>

              <div id="photo-details-textarea" className="">
                <h5>
                  Add comment:
                </h5>
                <textarea
                  id="photo-details-textarea-field"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="">
                  <ButtonComponent
                    className="btn-block"
                    id="follow-unfollow-button"
                    type="button "
                    onClick={handleSubmitComment}>
                    Add comment
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CenterComponent>
      <RightSideComponent/>
    </PageTemplateComponent>
  )
}


export default PhotoDetails
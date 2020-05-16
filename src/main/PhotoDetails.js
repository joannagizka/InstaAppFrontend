import React from 'react'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import 'moment-timezone';
import Moment from 'react-moment';

export default class PhotoDetails extends React.Component {
  constructor(props) {
    super(props);

    const arr = window.location.href.split("/");
    const photoId = arr[arr.length - 1];

    this.state = {
      description: "",
      photoId: photoId,
      content: "",
      comments: [],
      authorId: "",
      authorUsername: "",
      isMe: false,
      likes: [],
      isLikedByMe: false,
      redirectToProfile: false,
    };


    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleLikeUnlikeClick = this.handleLikeUnlikeClick.bind(this);
    this.fetchPhotoMetadata = this.fetchPhotoMetadata.bind(this);
  }

  componentDidMount() {
    this.fetchPhotoMetadata();
  }

  fetchPhotoMetadata() {
    axios.get("http://localhost:8000/photoMeta/" + this.state.photoId + "/").then(response => {
      this.setState({
        description: response.data.description,
        comments: response.data.comments,
        authorId: response.data.authorId,
        authorUsername: response.data.authorUsername,
        isMe: response.data.isMe,
        creationTime: response.data.creationTime,
        likes: response.data.likes,
        isLikedByMe: response.data.isLikedByMe
      });
    })
  }

  handleContentChange(event) {
    this.setState({
      "content": event.target.value
    });
  }

  handleSubmitComment(event) {
    const data = {
      "content": this.state.content,
    };
    let result = axios.post("http://localhost:8000/photoMeta/" + this.state.photoId + "/comments/", JSON.stringify(data))
    result.then(response => {
      this.setState({content: ""})
      this.fetchPhotoMetadata("")
    })
    result.catch(error => {
      console.log(error);
    })
  }

  renderAllComments() {
    const renderedComments = [];

    for (let comment of this.state.comments) {
      renderedComments.push(this.commentPattern(comment));

    }

    return (
      <div>
        {renderedComments}
      </div>
    )
  }


  commentPattern(comment) {

    return (

      <div>
        <div className="well well-lg">
          <h4 className="media-heading text-uppercase reviews">
            {this.renderCommentAuthorLinkTo(comment)}
          </h4>
          <ul className="media-date text-uppercase reviews list-inline">
            <Moment format="YYYY/MM/DD">
              {comment.creationTime}
            </Moment>
          </ul>
          <p className="media-comment">
            {comment.content}
          </p>

        </div>
      </div>
    );
  }

  renderAuthorLinkTo() {
    if (this.state.isMe) {
      return (
        <Link to="/myprofile">
          {this.state.authorUsername}
        </Link>
      )
    }

    const to = "/profile/" + this.state.authorId;
    return (
      <Link to={to}>
        {this.state.authorUsername}
      </Link>
    )
  }


  renderCommentAuthorLinkTo(comment) {
    if (comment.isMe) {
      return (
        <Link to="/myprofile">
          {comment.authorUsername}
        </Link>
      )
    }

    const to = "/profile/" + comment.authorId;
    return (
      <Link to={to}>
        {comment.authorUsername}
      </Link>
    )
  }

  handleLikeUnlikeClick() {
    const path = this.state.isLikedByMe? "unlike/" : "like/";

    axios.get("http://localhost:8000/photoMeta/"  + this.state.photoId + "/" + path).then(response => {
      this.fetchPhotoMetadata()
    })
  }

  renderDeleteButton() {
    if (this.state.isMe) {
      return (
        <button type="button" className="btn bg-primary light" onClick={this.deletePhoto}>Usun</button>
      )
    }

    return null;
  }

  deletePhoto() {
    axios.post('http://localhost:8000/photoMeta/' + this.state.photoId + "/delete/").then(response => {
      this.setState({redirectToProfile: true})
    })
  }

  render() {
    require('./Style.css');
    const photoSrc = "http://localhost:8000/photo/" + this.state.photoId + "/";

    if (this.state.redirectToProfile) {
      return (<Redirect to="/myprofile"/>)
    }

    return (
      <div className="layout">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">

            <div className="collapse navbar-collapse" id="navbarResponsive">
              <a className="navbar-brand js-scroll-trigger" href="/mainpageforloggedin">insta-app</a>
              <ul className="navbar-nav ml-auto">

                <div className="btn-group">

                  <Link to="/myprofile" className="btn bg-primary light">Pokaż mój profil</Link>
                  <Link to="/logout" className="btn bg-primary light">Wyloguj się</Link>
                </div>
              </ul>
              <div className="card mx-auto">
                <img className="centered-and-cropped rounded mx-auto d-block"

                     src={photoSrc}
                     alt="your image"/>
                <div className="card-body">

                  <div className="well well-lg light">

                    <h4 className="media-heading text-uppercase reviews">
                      {this.renderAuthorLinkTo()}

                    </h4>
                  <div>
                    <button type="button" className="btn btn-primary"
                            onClick={() => this.handleLikeUnlikeClick(this.state.photoId, this.state.isObserved)}
                            id={this.state.photoId}>
                      {this.state.isLikedByMe ?
                        <svg className="bi bi-heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                                clip-rule="evenodd"/>
                        </svg> : <svg className="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                      fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                clip-rule="evenodd"/>
                        </svg>}
                    </button>
                    <p>{this.state.likes.length}</p>
                  </div>





                    <svg className="bi bi-chat" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                            clip-rule="evenodd"/>
                    </svg>
                    <p>{this.state.comments.length}</p>


                    <ul className="media-date text-uppercase reviews list-inline">
                      <Moment format="YYYY/MM/DD">
                        {this.state.creationTime}
                      </Moment>

                    </ul>
                    <p className="card-text text-justify">{this.state.description}</p>

                    {this.state.isMe ? <button type="button" className="btn bg-primary light" onClick={() => this.deletePhoto()}>Usun</button> : null}
                  </div>
                  <div className="media-body">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Dodaj komentarz:</label>

                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                value={this.state.content}
                                onChange={this.handleContentChange}/>
                      <button className="btn bg-primary light" onClick={this.handleSubmitComment}> Dodaj</button>
                    </div>
                  </div>

                </div>
                <div>{this.renderAllComments()}</div>

              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

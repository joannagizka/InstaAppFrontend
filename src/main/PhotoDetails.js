import React from 'react'
import {
  Link,
} from "react-router-dom";
import axios from "axios";

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
      isMe: false
    };


    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/photoMeta/" + this.state.photoId + "/").then(response => {
      this.setState({
        description: response.data.description,
        comments: response.data.comments,
        authorId: response.data.authorId,
        authorUsername: response.data.authorUsername,
        isMe: response.data.isMe,
        creationTime: response.data.creationTime
      });
    })
  }

  handleContentChange(event) {
    this.setState({
      "content": event.target.value
    });
  }

  handleSubmit(event) {
    const data = {
      "content": this.state.content,
    };
    let result = axios.post("http://localhost:8000/photoMeta/" + this.state.photoId + "/comments/", JSON.stringify(data))
    result.then(response => {
      console.log(response);
      this.setState({
        description: response.data.description,
        comments: response.data.comments,
        authorId: response.data.authorId,
        authorUsername: response.data.authorUsername,
        isMe: response.data.isMe,
      });
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
          <h4 className="media-heading text-uppercase reviews">{comment.authorUsername} </h4>
          <ul className="media-date text-uppercase reviews list-inline">
            {comment.creationTime}
          </ul>
          <p className="media-comment">
            {comment.content}
          </p>
        </div>
      </div>
    );
  }


  render() {
    require('./Style.css');
    require('./AddPhotoStyle.css');
    const arr = window.location.href.split("/");
    const photoId = arr[arr.length - 1];
    const photoSrc = "http://localhost:8000/photo/" + photoId + "/";


    return (


      <div className="layout">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">insta-app</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div className="btn-group">

                  <Link to="/myprofile" className="btn bg-primary light">Pokaż mój profil</Link>
                  <Link to="/seeyoulater" className="btn bg-primary light" onClick={this.handleLogout}>Wyloguj
                    się</Link>
                </div>
              </ul>
              <div className="card mx-auto">
                <img className="centered-and-cropped rounded mx-auto d-block"

                     src={photoSrc}
                     alt="your image"/>
                <div className="card-body">

                  <div className="well well-lg light">
                    <h4 className="media-heading text-uppercase reviews">{this.state.authorUsername} </h4>
                    <ul className="media-date text-uppercase reviews list-inline">
                      {this.state.creationTime}
                    </ul>
                    <p className="card-text text-justify">{this.state.description}</p>
                  </div>
                  <div className="media-body">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Dodaj komentarz:</label>

                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                onChange={this.handleContentChange}/>
                      <button className="btn bg-primary light" onClick={this.handleSubmit}> Dodaj</button>
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

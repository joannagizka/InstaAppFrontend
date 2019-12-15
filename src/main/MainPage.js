import React from 'react';
import {Link} from "react-router-dom";

export default class MainPage extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/register">Kliknij do rejestracji</Link>
          </li>
          <li>
            <Link to="/login">Kliknij do logowania</Link>
          </li>
        </ul>
      </div>
    );
  }
}
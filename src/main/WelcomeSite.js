import React from 'react'
import {Link} from 'react-router-dom'


export default class WelcomeSite extends React.Component{
  render () {
    return (
      <div>
        <Link to="/myprofile">Pokaż mój profil</Link>
      </div>
    )
  }
}
import React from 'react';


const ButtonComponent = (props) => {
  return (
    <button
      type={props.type}
      className="btn btn-primary button-button"
      onClick={props.handleClick}
    >
      {props.label}
    </button>

  )
}

export default ButtonComponent;
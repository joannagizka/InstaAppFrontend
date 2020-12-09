import React from 'react';


const ButtonComponent = (props) => {
  return (
    <button
      id="ButtonComponent"
      className="btn"
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>

  )
}

export default ButtonComponent;
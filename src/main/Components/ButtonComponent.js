import React from 'react';


const ButtonComponent = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.handleClick}
    >
      {props.label}
    </button>

  )
}

export default ButtonComponent;
import React from 'react';


const ButtonComponent = (props) => {
  return (
    <button
      id="ButtonComponent"
      className="btn"
      type={props.type}
      onClick={props.onClick}
    />

  )
}

export default ButtonComponent;
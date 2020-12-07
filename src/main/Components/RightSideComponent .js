import React from "react";

const RightSideComponent = (props) => {
  return (
    <div className="col-md-3">
      <hr/>
      {props.children}
    </div>
  )
}

export default RightSideComponent
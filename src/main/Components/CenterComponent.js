import React from "react";

const CenterComponent = (props) => {
  return (
    <div id="CenterComponent" className="col-lg-8 col-md-12">
      {props.children}
    </div>
  )
}

export default CenterComponent
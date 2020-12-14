import React from "react";

const PageTemplateComponent = (props) => {
  return (
    <div className="row body">
        {props.children}
    </div>

  )
}

export default PageTemplateComponent
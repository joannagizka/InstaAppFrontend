import React from "react";
import LeftSideNavBarComponent from "./LeftSideNavBarComponent";

const PageTemplateComponent = (props) => {
  return (
    <div className="row body">
        {props.children}
    </div>

  )
}

export default PageTemplateComponent
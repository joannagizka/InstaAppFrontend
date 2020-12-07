import React from "react";
import LeftSideNavBarComponent from "./LeftSideNavBarComponent";

const PageTemplateComponent = (props) => {
  return (
    <div className="wrapper">
        {props.children}
    </div>

  )
}

export default PageTemplateComponent
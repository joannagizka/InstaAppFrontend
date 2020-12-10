import React from "react";
import LeftSideNavBarComponent from "./LeftSideNavBarComponent";
import PageTemplateComponent from "./PageTemplateComponent";

const CenterComponent = (props) => {
  return (
    <div id="CenterComponent" className="col-8">
      {props.children}
    </div>
    )
}

export default CenterComponent
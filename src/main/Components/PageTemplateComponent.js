import React from "react";
import FooterComponent from "./FooterComponent";

const PageTemplateComponent = (props) => {
  return (
    <div className="row body">
      {props.children}
      <FooterComponent/>
    </div>

  )
}

export default PageTemplateComponent
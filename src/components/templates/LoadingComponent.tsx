import React from "react";
import Loader from "../atoms/Loader";

function LoadingComponent() {

    const divStyles = {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
  return (
    <div style={divStyles}>
      <Loader size={80} />
    </div>
  );
}

export default LoadingComponent;

import React from "react";
import safehand from "../../assets/images/safehand.png";
import Image from "next/image";

function Logo() {

  return (
    <div className="logo">
      <div className="text">
        <span style={{ color: "blue" }}>S</span>
        <span style={{ color: "red" }}>H</span>{" "}
      </div>
    </div>
  );
}

export default Logo;

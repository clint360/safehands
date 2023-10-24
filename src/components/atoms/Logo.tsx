import React from "react";
import safehand from "../../assets/images/safehand.png";
import Image from "next/image";

function Logo() {
  const typography = {
    fontSize: "3rem",
    fontWeight: "800",
    UserSelect: "none",
  };

  return (
    <div className="logo">
      <div style={typography}>
        <span style={{ color: "blue" }}>S</span>
        <span style={{ color: "red" }}>H</span>{" "}
      </div>
    </div>
  );
}

export default Logo;

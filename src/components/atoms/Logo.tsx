import React from "react";
import logo from "../../assets/images/logo.png"
import Image from "next/image";

function Logo() {
  return (
    <div className="logo">
      {<Image src={logo} alt="Logo"/> || <div> Safe Hands </div>}
    </div>
  );
}

export default Logo;

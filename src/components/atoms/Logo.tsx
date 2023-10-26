import React from "react";
import safehand from "../../assets/images/safehand.png";
import Image from "next/image";
import Link from "next/link";

function Logo() {

  return (
    <Link href={"/"}>
    <div className="logo">
      <div className="text">
        <span style={{ color: "blue" }}>S</span>
        <span style={{ color: "red" }}>H</span>
      </div>
    </div>
    </Link>
  );
}

export default Logo;

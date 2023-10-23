import React from "react";

function Logo() {
  return (
    <div>
      {<img src="../../assets/images/logo.png" /> || <div> Safe Hands </div>}
    </div>
  );
}

export default Logo;

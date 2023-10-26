import React from "react";
import "./Messages.scss";
import sampleImage from '../../../assets/images/face21.jpg'
import Image from "next/image";
import Seen from "./Seen";

function Contact() {
  return (
    <div className="chatListItem">
      <div className="circleProfile">
        <Image src={sampleImage} alt="" />
      </div>
      <div className="middle">
        <div className="usersname">Clint</div>
        <div className="peepMessage">
          <span className="text_message">You: Hello Clint How are You</span>・
          <span className="timeago">
            2 Mins Ago
          </span>
        </div>
      </div>
      <div className="ending">
        <div className="seenDiv">
         <Seen seen={true} />
        </div>
      </div>
    </div>
  );
}

export default Contact;

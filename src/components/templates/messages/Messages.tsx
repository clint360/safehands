"use client";
import React from "react";
import "./Messages.scss";
import Contacts from "./Contacts";
import MessageBoard from "./MessageBoard";
function Messages() {
  return (
    <div
      className="messageswindow"
      style={{
        width: `${
          window.innerWidth > 726
            ? window.innerWidth - 160
            : window.innerWidth - 25
        }px`,
      }}
    >
      <div className="contactsDiv">
        <Contacts />
      </div>
      <div className="messageboardDiv">
        <MessageBoard />
      </div>
    </div>
  );
}

export default Messages;

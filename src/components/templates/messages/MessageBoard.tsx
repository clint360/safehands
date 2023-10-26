import Image from "next/image";
import React, { useState } from "react";
import "./MessageBoard.scss";
import sampleImage from "../../../assets/images/face21.jpg";
import Seen from "./Seen";

interface MessageInterface {
  id: string | number;
  senderId: string | number;
  receiverId: string | number;
  content: string;
  body: string;
  timestamp: Record<string, string | number>; // or Date
}

function MessageBoard() {
  return (
    <div className="chatArea">
      <div className="chatAreaHeader">
        <div className="userDetails">
          <div className="circle">
            <Image src={sampleImage} alt=" " />
          </div>
          <div className="middle">
            <div className="usersname">Clint</div>
            <div className="peepMessage">
              {(
                <span style={{ color: "blue", fontSize: "12px" }}>
                  Active Now
                </span>
              ) || (
                <span style={{ color: "grey", fontSize: "12px" }}>
                  Active 12 Mins Ago
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="chatBody">
        <div className="dayRow">
            <div className="day">
                Monday, 28th August
            </div>
        </div>
        <div className="myrow">
          <div className="mymessagebody">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
              incidunt, distinctio amet non repellat doloribus modi voluptates
              ullam? Praesentium maiores expedita minima! Debitis omnis nostrum
              quod saepe, cum deserunt suscipit?
            </p>
            <div className="downerpart">
              <span>
                <Seen seen={false} />
              </span>
              <span className="time">5:14PM</span>
            </div>
          </div>
        </div>
        <div className="thierrow">
          <div className="thiermessagebody">
            <p>Paragraph Here</p>
            <div className="downerpart">
              <span className="time">5:14PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chatInputSection">
        <div className="fourIcons">
          <div className="icon hoverEffect">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="longinput">
          <div>
            <div
              contentEditable
              className="textarea"
              role="textbox"
              tabIndex={0}
            />
          </div>
          <div></div>
        </div>
        <div className="submirOrLike">
          <i className="material-icons-outlined">thumb_up</i>
        </div>
      </div>
    </div>
  );
}

export default MessageBoard;

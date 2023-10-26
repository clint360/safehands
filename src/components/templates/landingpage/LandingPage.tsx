"use client";
import React from "react";
import "./LandingPage.scss";
import Logo from "@/components/atoms/Logo";
import Home from "./sections/Home";
import About from "./sections/About";
import Report from "./sections/Report";
import Contact from "./sections/Contact";

let prevScrollpos = window.pageYOffset;;
const navElement = document.getElementById("navbar")
window.onscroll = function() {
  if (!!navElement){
  const currentScrollPos = window.pageYOffset;;
  if (prevScrollpos > currentScrollPos) {
     navElement.style.top = "0";
  } else {
     navElement.style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}
}

export function scrollTo(section: string) {
  let element = document.getElementById(`${section}`);
  element &&
    element.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
}

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <nav className="nav" id="navbar">
        <div className="logodiv">
          <Logo />
        </div>
        <ul className="navbar">
          <li>
            <a
              onClick={() => {
                scrollTo("home");
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                scrollTo("about");
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                scrollTo("report");
              }}
            >
              Report
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                scrollTo("contact");
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
     <Home />
     <About />
     <Report />
     <Contact />
    </div>
  );
};

export default LandingPage;

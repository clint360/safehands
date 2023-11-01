"use client";
import React, { useEffect, useState } from "react";
import "./LandingPage.scss";
import Logo from "@/components/atoms/Logo";
import Home from "./sections/Home";
import About from "./sections/About";
import Report from "./sections/Report";
import Contact from "./sections/Contact";
import { getWebSite } from "@/services/website";

export function scrollTo(section: string) {
  let element = document.getElementById(`${section}`);
  element &&
    element.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
}

const LandingPage: React.FC = () => {
  const [webData, setWebData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch website data
      const websiteData = await getWebSite();
      websiteData && setWebData(websiteData);

      if (!websiteData) {
        // Handle error or redirect
        return;
      }
    }
    fetchData();
  }, []);

  return (
    <div className="landingpage">
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
      <Home webData={webData} />
      <About webData={webData} />
      <Report webData={webData} />
      <Contact webData={webData} />
    </div>
  );
};

export default LandingPage;

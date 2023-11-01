import React from 'react';
import aboutImage from "../../../../assets/images/families.png";
import Image from 'next/image';

function About({ webData }: any) {
  return (
    <section id="about">
    <div className="content">
      <div className="image-wrapper">
        <Image src={aboutImage} alt="About Safe Hands" />
      </div>
      <div className="texthouse">
        <div className="text">
          <h2>About Safe Hands</h2>
          <div dangerouslySetInnerHTML={{ __html: webData?.aboutSafeHands }} /> 
        </div>
      </div>
    </div>
    <hr />
  </section>

  )
}

export default About
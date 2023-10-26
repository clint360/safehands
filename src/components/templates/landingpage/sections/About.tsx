import React from 'react';
import aboutImage from "../../../../assets/images/families.png";
import Image from 'next/image';

function About() {
  return (
    <section id="about">
    <div className="content">
      <div className="image-wrapper">
        <Image src={aboutImage} alt="About Safe Hands" />
      </div>
      <div className="texthouse">
        <div className="text">
          <h2>About Safe Hands</h2>
          <p>
            Safe Hands is a platform dedicated to addressing child abuse and
            safeguarding children's well-being. Our mission is to protect
            children from abuse and provide resources for intervention,
            prevention, and support.
          </p>
          <p>
            Child abuse has a devastating impact on children, affecting
            their physical, emotional, and psychological well-being. By
            prioritizing child protection, we can work towards creating a
            society where every child can thrive without the fear of abuse.
          </p>
          <p>
            Join us in making a difference and creating a world where
            children can grow up free from abuse.
          </p>
        </div>
      </div>
    </div>
    <hr />
  </section>

  )
}

export default About
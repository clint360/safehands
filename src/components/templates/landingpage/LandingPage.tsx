import React from 'react';
import './LandingPage.scss';
import aboutImage from './../../../assets/images/families.png'
import contactImage from '../../../assets/images/safehands.jpg';
import reportImage from '../../../assets/images/safehands.jpg';
import Image from 'next/image';
import Logo from '@/components/atoms/Logo';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <nav className='nav'>
        <div className='logodiv'><Logo /></div>
        <ul className="navbar">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#report">Report</a></li>
        </ul>
      </nav>

      <section id="home">
        <div className="content">
          <h1>Welcome to Safe Hands</h1>
          <p>We believe every child deserves a safe and nurturing environment.</p>
          <p className="tagline">Together, let's create a safe world for every child.</p>
        </div>
      </section>

      <section id="about">
        <div className="content">
          <div className="image-wrapper">
            <Image src={aboutImage} alt="About Safe Hands" />
          </div>
          <div className="text">
            <h2>About Safe Hands</h2>
            <p>Safe Hands is a platform dedicated to addressing child abuse and safeguarding children's well-being. Our mission is to protect children from abuse and provide resources for intervention, prevention, and support.</p>
            <p>Child abuse has a devastating impact on children, affecting their physical, emotional, and psychological well-being. By prioritizing child protection, we can work towards creating a society where every child can thrive without the fear of abuse.</p>
            <p>Join us in making a difference and creating a world where children can grow up free from abuse.</p>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="content">
          <div className="text">
            <h2>Contact Us</h2>
            <p>If you have any questions, concerns, or would like to report an abuse case, feel free to get in touch with us. Our team is here to provide support and assistance.</p>
            <div className="contact-details">
              <p>Email: info@safehands.org</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Safe Hands Street, City, Country</p>
            </div>
          </div>
          <div className="image-wrapper">
            <Image src={contactImage} alt="Contact Us" />
          </div>
        </div>
      </section>

      <section id="report">
        <div className="content">
          <div className="image-wrapper">
            <Image src={reportImage} alt="Report Abuse" />
          </div>
          <div className="text">
            <h2>Report Abuse</h2>
            <p>If you suspect or have witnessed any form of child abuse, please report it immediately. We provide a safe and confidential reporting mechanism to ensure that every case is taken seriously and addressed appropriately.</p>
            <p>Your report can make a difference and help protect a vulnerable child. Remember, it is important to provide accurate and detailed information to the best of your knowledge. Your identity will remain confidential.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
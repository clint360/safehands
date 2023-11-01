import React from 'react'

function Contact({ webData }: any) {
  return (
    <section id="contact">
      <div className="content">
        <div className="text">
          <h2>Contact Us</h2>
          <div dangerouslySetInnerHTML={{ __html: webData?.contactStatement }} />
          <div className="contact-details">
          <div dangerouslySetInnerHTML={{ __html: webData?.contactDetails }} />
          </div>
        </div>
      </div>
    </section>
  )

}

export default Contact
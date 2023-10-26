import ReportingForm from '@/components/organisms/ReportingForm'
import React, { useState } from 'react'

function Report() {
// Define a state variable

  // Function to toggle the value of isAnonymous


  return (
    <section id="report">
      <div className="content">
        <div className="texthouse">
          <div className="text">
            <h2>Report Abuse</h2>
            <p>
              If you suspect or have witnessed any form of child abuse, please
              report it immediately. We provide a safe and confidential
              reporting mechanism to ensure that every case is taken seriously
              and addressed appropriately.
            </p>
            <p>
              Your report can make a difference and help protect a vulnerable
              child. Remember, it is important to provide accurate and
              detailed information to the best of your knowledge. Your
              identity will remain confidential.
            </p>
          </div>
        </div>
      </div>
      <div className="reporterform">
        <ReportingForm /> {/* Pass the state variable */}
      </div>
    </section>
  );
}

export default Report;

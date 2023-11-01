import ReportingForm from '@/components/organisms/ReportingForm'
import React, { useState } from 'react'

function Report({ webData }: any) {
// Define a state variable

  // Function to toggle the value of isAnonymous


  return (
    <section id="report">
      <div className="content">
        <div className="texthouse">
          <div className="text">
            <h2>Report Abuse</h2>
            <div dangerouslySetInnerHTML={{ __html: webData?.reportAbuseStatement }} />
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

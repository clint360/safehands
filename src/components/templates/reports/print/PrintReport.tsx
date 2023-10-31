
"use client"
import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactToPrint from 'react-to-print';
import { useParams } from "next/navigation";
import { getReportById, updateReportById } from "@/services/reports";
import { Report } from "@/domains/Report";
import { convertDateTime, getLocationName } from "@/utils";
import "../details/ReportDetails.scss";
import ReportTag from "@/components/atoms/Tag";
import { User } from "@supabase/auth-helpers-nextjs";

interface ComponentToPrintProps {
    user: User
}

const ComponentToPrint = forwardRef(({user}: ComponentToPrintProps, ref ) => {

  const userData = user.user_metadata;
  const params = useParams();
  const reportId = params && params.id;
  const [report, setReport] = useState<Report>();
  const [derivedLocation, setDerivedLocation] = useState<string>();

  useEffect(() => {
    async function getReport() {
      const report = reportId && (await getReportById(reportId.toString()));
      const derivedLocation = await getLocationName(
        report.derivedLocation.lat,
        report.derivedLocation.lon
      );
      setDerivedLocation(derivedLocation);
      setReport(report);
      if(userData.isAdmin) {
      reportId && (await updateReportById(reportId.toString(), { seen: true }));
    }
    }
    getReport();
  }, []);


  return (
    <div ref={ref as any}>
      {report?.isAnonymous ? (
        <div className="reporterdetails">
          <div className="header" style={{ color: "green" }}>
            ANONYMOUS REPORT
          </div>
        </div>
      ) : (
        <div className="reporterdetails">
          <div className="header">Reporter</div>
          <div className="detail">
            <div className="detailtitle">Full Names:</div>
            <div className="detaildata">
              {report?.firstName + " " + report?.lastName}
            </div>
          </div>
          <div className="detail">
            <div className="detailtitle">Email Address:</div>
            <div className="detaildata">{report?.email}</div>
          </div>
          <div className="detail">
            <div className="detailtitle">Phone Number:</div>
            <div className="detaildata">
              <a href={`tel:${report?.phoneNumber}`}>{report?.phoneNumber}</a>
            </div>
          </div>
        </div>
      )}
      <div className="reporterdetails">
        <div className="detail">
          <div className="detailtitle">Location:</div>
          <div className="detaildata">{report?.location}</div>
        </div>
        <div className="detail">
          <div className="detailtitle">P. Location:</div>
          <div className="detaildata">{derivedLocation}</div>
        </div>
        <div className="detail">
          <div className="detailtitle">Status:</div>
          <div className="detaildata">
            <ReportTag status={report?.status}>{report?.status}</ReportTag>
          </div>
        </div>
      </div>
      <div className="reporterdetails">
        <div className="header">Report</div>
        <div className="detail">
          <div className="detailtitle">Category:</div>
          <div className="detaildata">{report?.abuseCategory}</div>
        </div>
        <div className="detail">
          <div className="detailtitle">Date:</div>
          <div className="detaildata">{convertDateTime(report?.createdAt)}</div>
        </div>
      </div>

      <div className="reportbody">
        <div className="header">Message</div>
          <div className="body" dangerouslySetInnerHTML={{ __html: report?.whatHappened }} />
      </div>
    </div>
)});





export default function PrintReport ({user, close}: any) {
  const componentRef = useRef<HTMLIFrameElement>(null);
  
  return (
    <div  className='abs'>
      <ReactToPrint
        trigger={() => <div className="printreport"><button className='print'> 🖨 Print Doc(PDF)</button></div>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} user={user} />
      <div className="printstudent">
      </div>
    </div>
  );
};
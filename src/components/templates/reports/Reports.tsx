"use client";
import styles from "./Reports.module.scss";
import Report from "./Report";
import { useEffect, useState } from "react";
import { getAllReports, getReportsForUser } from "@/services/reports";
import Link from "next/link";
import { User } from "@supabase/auth-helpers-nextjs";
import { createProfile } from "@/services/users";

interface ReportProps {
  user: User
}

function extractStringFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const element = doc.querySelector('body'); // Replace 'body' with the target element to extract from
  
  if (element) {
    const extractedString = element.textContent && element.textContent.trim();
    return extractedString || '';
  } else {
    return '';
  }
}

function Reports({user}: ReportProps) {
  const userData = user.user_metadata
  const [reports, setReports] = useState<any[]>([])
  
  useEffect(()=>{
    async function fetchReports(){
     
    await createProfile({
      id: user?.id,
      isAdmin: user?.user_metadata.isAdmin,
      email: user?.email
    })

     if(userData.isAdmin) {
      const reports = await getAllReports()
      console.log(reports)
      setReports(reports)
     } else {
      const reports = await getReportsForUser(userData.fingerprint, user.id)
      console.log(reports)
      reports && setReports(reports)
     }
    }
  fetchReports()
  },[])

  return (
    <div
      className={styles.reports}
      style={{ width: `${window.innerWidth - 160}px` }}
    >
     {!userData.isAdmin && <Link href={'/app/reports/new'}><button className={styles.newReport}>New Report</button></Link>} 
      <div className={styles.reportsContainer}>
      {
        reports?.map((report, index)=>{return (
          <Report
          reportId={report.id}
          whatHappened={extractStringFromHTML(report.whatHappened)}
          date={report.createdAt}
          category={report.abuseCategory}
          isAnonymous={report.isAnonymous}
          reporterData={report.phoneNumber}
          location={report.location}
          status={report.status}
          no={index+1}
          seen={report.seen}
           />
        )})
      }
      </div>
    </div>
  );
}

export default Reports;

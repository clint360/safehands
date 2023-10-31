"use client";
import styles from "./Reports.module.scss";
import Report from "./Report";
import { useEffect, useState } from "react";
import { getAllReports } from "@/services/reports";
import Link from "next/link";

function Reports() {
  const [reports, setReports] = useState<any[]>([])
  
  useEffect(()=>{
    async function fetchReports(){
     
    }
  fetchReports()
  },[])

  return (
    <div
      className={styles.reports}
      style={{ width: `${window.innerWidth - 160}px` }}
    >
      <Link href={'/app/reports/new'}><button className={styles.newReport}>New Report</button></Link>
      <div className={styles.reportsContainer}>
      {
        reports?.map((report, index)=>{return (
          <Report
          whatHappened={report.whatHappened}
          date={report.date}
          isAnonymous={report.isAnonymous}
          reporterData={report.reporterData}
          location={report.location}
          status={report.status}
          no={report.no}
          reportId={report.id} />
        )})
      }
      </div>
    </div>
  );
}

export default Reports;

import React from "react";
import styles from "./Reports.module.scss";
import ReportTag from "@/components/atoms/Tag";

interface ReportProps {
  whatHappened: string;
  date: string;
  isAnonymous: boolean;
  reporterData: Record<string, string>;
  location: string
  status: string
  no: number
  reportId: string
}

function Report({
  whatHappened,
  date,
  isAnonymous,
  reporterData,
  location,
  status,
  no,
  reportId
}: ReportProps) {
  return (
    <div className={styles.report}>
      <div className={styles.marker} />
      <div className={styles.reportTitle}>
        {whatHappened}
      </div>
      {/* 
      <div className={styles.reportCategory}>
        <i className="material-icons-outlined">category</i>
        <span> PHYSICAL ABUSE</span>
      </div> */}
      <div className={styles.reporterDetail}>
        <i className="material-icons-outlined">contact_mail</i>
        <span>{ (!isAnonymous) ? <a href={`tel:${reporterData?.phoneNumber}`}>{reporterData?.phoneNumber} </a>: "ANONYMOUS"}</span>
      </div>
      <div className={styles.dateAndTime}>
        <i className="material-icons-outlined">calendar_month</i>
        <span>{date}</span>
      </div>
      <div className={styles.location}>
        <i className="material-icons-outlined">location_on</i>
        <span>{location}</span>
      </div>
      <div className={styles.reportTag}>
        <ReportTag status="RECIEVED">{status}</ReportTag>
      </div>
      <div className={styles.hashtag}>{`#${no}`}</div>
    </div>
  );
}

export default Report;

import React from "react";
import styles from "./Reports.module.scss";
import ReportTag from "@/components/atoms/Tag";

function Report() {
  return (
    <div className={styles.report}>
      <div className={styles.marker} />
      <div className={styles.reportTitle}>Child Beating</div>
      <div className={styles.reportCategory}>
        <i className="material-icons-outlined">category</i>
        <span> PHYSICAL ABUSE</span>
      </div>
      <div className={styles.reporterDetail}>
        <i className="material-icons-outlined">contact_mail</i>
        <span>+237680612360</span>
      </div>
      <div className={styles.dateAndTime}>
        <i className="material-icons-outlined">calendar_month</i> Monday, 28th
        <span>July 2023, 5:15pm</span>
      </div>
      <div className={styles.location}>
        <i className="material-icons-outlined">location_on</i>
        <span>Abuja, Nigeria</span>
      </div>
      <div className={styles.reportTag}>
        <ReportTag status="RECIEVED">RECIEVED</ReportTag>
      </div>
      <div className={styles.hashtag}>
        #45
      </div>
    </div>
  );
}

export default Report;

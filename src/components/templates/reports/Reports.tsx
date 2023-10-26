"use client";
import styles from "./Reports.module.scss";
import Report from "./Report";

function Reports() {
  return (
    <div
      className={styles.reports}
      style={{ width: `${window.innerWidth - 160}px` }}
    >
      <div className={styles.reportsContainer}>
      <Report />
      <Report />
      <Report />
      </div>
    </div>
  );
}

export default Reports;

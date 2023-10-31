import React from "react";
import styles from "./Reports.module.scss";
import ReportTag from "@/components/atoms/Tag";
import { convertDateTime } from "@/utils";
import Link from "next/link";
import { ReportStatus } from "@/domains/Report";

interface ReportProps {
  whatHappened: string;
  date: string;
  isAnonymous: boolean;
  reporterData: string;
  location: string;
  status: ReportStatus;
  no: number;
  category: string;
  reportId: string;
  seen: boolean
}

function Report({
  whatHappened,
  date,
  isAnonymous,
  reporterData,
  location,
  status,
  no,
  category,
  reportId,
  seen
}: ReportProps) {
  return (
    <Link href={`/app/reports/${reportId}`}>
      <div className={styles.report}>
        <div className={styles.marker} style={{background: !seen ? 'red' : 'rgb(96, 23, 255)'}}/>
        <div className={styles.reportTitle}>
          <span
            style={{ width: "auto", maxWidth: "95%", overflow: "hidden" }}
            dangerouslySetInnerHTML={{ __html: whatHappened }}
          />
        </div>
        <div className={styles.reportCategory}>
          <i className="material-icons-outlined">category</i>
          <span>{category}</span>
        </div>
        <div className={styles.reporterDetail}>
          <i className="material-icons-outlined">contact_mail</i>
          <span>
            {!isAnonymous ? (
              <a href={`tel:${reporterData}`}>{reporterData} </a>
            ) : (
              "ANONYMOUS"
            )}
          </span>
        </div>
        <div className={styles.dateAndTime}>
          <i className="material-icons-outlined">calendar_month</i>
          <span>{convertDateTime(date)}</span>
        </div>
        <div className={styles.location}>
          <i className="material-icons-outlined">location_on</i>
          <span>{location}</span>
        </div>
        <div className={styles.reportTag}>
          <ReportTag status={status} >{status}</ReportTag>
        </div>
        <div className={styles.hashtag}>{`#${no}`}</div>
      </div>
    </Link>
  );
}

export default Report;

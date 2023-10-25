import React from 'react';
import styles from './Reports.module.scss'
import ReportTag from '@/components/atoms/Tag';

function Report() {
  return (
    <div className={styles.report}>
    <div className={styles.marker} />
    <div className={styles.reportTitle}>
    Child Beating
    </div>
    <div className={styles.reportCategory}>
    Physical Abuse
    </div>
    <div className={styles.reporterDetail}>
    +237680612360
    </div>
    <div className={styles.dateAndTime}>
   Monday, 28th July 2023, 5:15pm
    </div>
    <div className={styles.reportTag}>
    <ReportTag status="RECIEVED">RECIEVED</ReportTag>
    </div>
    </div>
  )
}

export default Report
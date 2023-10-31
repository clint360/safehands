"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReportById, updateReportById } from "@/services/reports";
import { Report } from "@/domains/Report";

function ReportDetails() {
  const params = useParams();
  const reportId = params && params.id;
  const [report, setReport] = useState<Report>();

  useEffect(() => {
    async function getReport() {
      const report = reportId && (await getReportById(reportId.toString()));
      setReport(report);
      reportId && await updateReportById(reportId.toString(), {seen: true})
    }
    getReport()
  }, []);

  return <div>{
    report?.isAnonymous ? 
    <div> ANONYMOUS REPORT</div> 
    : 
    <div className="">
        <div>
        {report?.firstName}
        </div>
        </div>
    }
    
    </div>;
}

export default ReportDetails;

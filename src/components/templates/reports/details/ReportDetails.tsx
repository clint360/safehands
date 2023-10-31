"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReportById, updateReportById } from "@/services/reports";
import { Report } from "@/domains/Report";
import { convertDateTime, getLocationName } from "@/utils";
import "./ReportDetails.scss";
import ReportTag from "@/components/atoms/Tag";
import { User } from "@supabase/auth-helpers-nextjs";
import Select from "react-select";
import { reportStatuses } from "@/constants/reports";
import Loader from "@/components/atoms/Loader";
import PrintReport from "../print/PrintReport";

interface ReportDetailsProps {
  user: User;
}

function ReportDetails({ user }: ReportDetailsProps) {
  const userData = user.user_metadata;
  const params = useParams();
  const reportId = params && params.id;
  const [report, setReport] = useState<Report>();
  const [derivedLocation, setDerivedLocation] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [currentStatus, setCurrentSatus] = useState<any>()

  useEffect(() => {
    async function getReport() {
      const report = reportId && (await getReportById(reportId.toString()));
      const derivedLocation = await getLocationName(
        report.derivedLocation.lat,
        report.derivedLocation.lon
      );
      setDerivedLocation(derivedLocation);
      setReport(report);
      setCurrentSatus({label: report?.status, value: report?.status})
      if(userData.isAdmin) {
      reportId && (await updateReportById(reportId.toString(), { seen: true }));
    }
    }
    getReport();
  }, []);

  async function onUpdate() {
    setIsUpdating(true)
    reportId && await updateReportById(reportId.toString(), { status: currentStatus.value })
    setIsUpdating(false)
    window.location.reload()
  }


  return (
    <div>
      <PrintReport user={user} />
      {userData?.isAdmin && (
        <>
          <div className="updateStaus">
            <div className="title">Update Status:</div>
            <div className="reactSelect">
              <Select
                value={currentStatus}
                options={reportStatuses.map((item) => {
                  return {
                    value: item,
                    label: item,
                  };
                })}
                onChange={setCurrentSatus}
              />
            </div>
            <div className="updatebutton">
              <button className="button23" onClick={onUpdate}>{
              isUpdating ? <Loader size={20} /> :
              'Update'
              }</button>
            </div>
          </div>
          <div className="pastactions">
            <div className="actionbox">
            <div className="action"></div>
            <div className="author"></div>
            <div className="date"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReportDetails;

"use client";
import TextEditor from "@/components/molecules/TextEditor";
import { User } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import "./Website.scss";
import { getWebSite, updateWebsite } from "@/services/website";
import Loader from "@/components/atoms/Loader";

interface WebsiteProps {
  user: User;
}

function Website({ user }: WebsiteProps) {
  const userData = user.user_metadata;
  const heroTitleRef = useRef<any>();
  const heroTagLineRef = useRef<any>();
  const [aboutSafeHands, setAboutSafeHands] = useState<string>();
  const [reportAbuseStatement, setReportAbuseStatement] = useState<string>();
  const [contactStatement, setContactStatement] = useState<string>();
  const [contactDetails, setContactDetails] = useState<string>();
  const [webData, setWebData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErroMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch website data
      const websiteData = await getWebSite();
      websiteData && setWebData(websiteData);

      if (!websiteData) {
        // Handle error or redirect
        return;
      }
      setAboutSafeHands(websiteData.aboutSafeHands);
      setReportAbuseStatement(websiteData.reportAbuseStatement);
      setContactStatement(websiteData.contactStatement);
      setContactDetails(websiteData.contactDetails);
    }

    // Fetch website data on component mount
    if (!userData.isAdmin) {
      redirect("/app/reports");
    } else {
      fetchData();
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const updatedWebsiteData = {
      heroTitle: heroTitleRef.current.value,
      heroTagline: heroTagLineRef.current.value,
      aboutSafeHands,
      reportAbuseStatement,
      contactStatement,
      contactDetails,
    };

    // Update website data
    const data = await updateWebsite(updatedWebsiteData);
    if (data) {
      setErroMsg(null)
      setSuccessMsg("Website Successfully Updated")
    }
    else {
       setSuccessMsg(null)
       setErroMsg("An Error Occurred")
      };
    setIsLoading(false);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <h2>Hero</h2>
      <div className="formRow">
        <label htmlFor="firstName">Hero Title</label>
        <div className="inputDiv">
          <input
            type="text"
            name="firstName"
            id="firstName"
            ref={heroTitleRef}
            defaultValue={webData?.heroTitle}
          />
        </div>
      </div>

      <div className="formRow">
        <label htmlFor="firstName">Hero Tagline</label>
        <div className="inputDiv">
          <input
            type="text"
            name="firstName"
            id="firstName"
            ref={heroTagLineRef}
            defaultValue={webData?.heroTagline}
          />
        </div>
      </div>
      <h2>About</h2>
      <div>About Safe Hands</div>
      <TextEditor value={aboutSafeHands} setValue={setAboutSafeHands} />

      <h2>Report</h2>
      <TextEditor
        value={reportAbuseStatement}
        setValue={setReportAbuseStatement}
      />

      <h2>Footer</h2>
      <div>Contact Satement </div>
      <TextEditor value={contactStatement} setValue={setContactStatement} />
      <div>Contact Details </div>
      <TextEditor value={contactDetails} setValue={setContactDetails} />
      {errorMsg && (
        <div style={{ textAlign: "center", color: "red" }}>{errorMsg}</div>
      )}
      {successMsg && (
        <div style={{ textAlign: "center", color: "green" }}>{successMsg}</div>
      )}
      <button className="submitbtn" onClick={handleSubmit}>
        {isLoading ? <Loader size={20} /> : "Update"}
      </button>
    </div>
  );
}

export default Website;

"use client";

import React, { useState } from "react";

import styles from "./ReportingForm.module.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextEditor from "../molecules/TextEditor";
import Select from "react-select";
import { childAbuseCategories } from "@/constants/categories";
import Loader from "../atoms/Loader";
import { createNewReport } from "@/services/reports";

export const fingerprint = `${navigator.userAgent.toString()}-${navigator.platform.toString()}`;

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email"),
  location: Yup.string().required("Location is required"),
});

const anonymousValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required(
    "Input any phone number we can reach out to"
  ),
  location: Yup.string().required("Location is required"),
});

function ReportingForm({ user }: any) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [whatHappened, setWhatHappened] = useState<any>(null);
  const [abuseCategory, setAbuseCategory] = useState<any>(null);
  const [derivedLocation, setDerivedLocation] = useState<Record<
    string,
    number
  > | null>({ lat: 0, lon: 0 });
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<any>(null);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setDerivedLocation({
          lat: latitude,
          lon: longitude,
        });
      },
      (error) => {
        console.error("Error retrieving geolocation:", error);
        setDerivedLocation(null);
      }
    );
  } else {
    console.warn("Geolocation is not supported by this browser.");
    // Handle case when geolocation is not supported
  }

  const toggleIsAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };
  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    location: "",
  };

  const anonymousInitialValues = {
    location: "",
    phoneNumber: "",
  };

  // Submit handler
  const submitReportForm = async (values: any, { setSubmitting }: any) => {
    if (whatHappened && abuseCategory) {
      setSubmitting(true);
      let report = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        location: values.location,
        isAnonymous: isAnonymous,
        abuseCategory: abuseCategory.value,
        whatHappened: whatHappened,
        derivedLocation: derivedLocation,
        fingerprint: fingerprint,
        userId: user.id || null
      };
      const res = await createNewReport(report);
      res && res !== true ? setSubmissionError(true) : setHasSubmitted(true);
      setSubmitting(false);
    }
  };

  const handleAnonymousSubmit = async (values: any, { setSubmitting }: any) => {
    if (whatHappened && abuseCategory) {
      setSubmitting(true);
      let report = {
        phoneNumber: values.phoneNumber || null,
        location: values.location,
        isAnonymous: isAnonymous,
        abuseCategory: abuseCategory.value,
        whatHappened: whatHappened,
        derivedLocation: derivedLocation,
        fingerprint: fingerprint,
        userId: user.id || null
      };
      const res = await createNewReport(report);
      res && res !== true ? setSubmissionError(true) : setHasSubmitted(true);
      setSubmitting(false);
    }
  };

  return (
    <div
    style={{
      width: `${
        window.innerWidth > 736
          ? window.innerWidth - 180
          : window.innerWidth - 50
      }px`,
    }}>
      {hasSubmitted === true ? (
        <div style={{textAlign: "center", color: "green"}}>Your Report Has been Submitted</div>
      ) : (
        <>
          {!isAnonymous ? (
            <div className={styles.formContainer}>
              <div className={styles.formBox}>
                <h2>Tell Us</h2>
                <button
                  onClick={toggleIsAnonymous}
                  className="toogleisanonymous"
                >
                  Reporting Anonymously: No
                </button>
                <br />
                <div className={styles.reportingform}>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitReportForm}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className={styles.formRow}>
                          <label htmlFor="firstName">First Name</label>
                          <div className={styles.inputDiv}>
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                            />
                          </div>
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className={styles.errorMessage}
                          />
                        </div>

                        <div className={styles.formRow}>
                          <label htmlFor="lastName">Last Name</label>
                          <div className={styles.inputDiv}>
                            <Field type="text" name="lastName" id="lastName" />
                          </div>
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className={styles.errorMessage}
                          />
                        </div>

                        <div className={styles.formRow}>
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <div className={styles.inputDiv}>
                            <Field
                              type="text"
                              name="phoneNumber"
                              id="phoneNumber"
                            />
                          </div>
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className={styles.errorMessage}
                          />
                        </div>

                        <div className={styles.formRow}>
                          <label htmlFor="email">Email Address</label>
                          <div className={styles.inputDiv}>
                            <Field type="email" name="email" id="email" />
                          </div>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className={styles.errorMessage}
                          />
                        </div>

                        <div className={styles.formRow}>
                          <label htmlFor="location">Location</label>
                          <div className={styles.inputDiv}>
                            <Field type="text" name="location" id="location" />
                          </div>

                          <ErrorMessage
                            name="location"
                            component="div"
                            className={styles.errorMessage}
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label htmlFor="whatHappened">Abuse Category</label>
                          <br />
                          <Select
                            value={abuseCategory}
                            options={childAbuseCategories.map((item) => {
                              return {
                                value: item.value,
                                label: item.title,
                              };
                            })}
                            onChange={setAbuseCategory}
                          />
                        </div>

                        <div className={styles.formRow}>
                          <label htmlFor="whatHappened">What Happened</label>
                          <br />
                          <TextEditor
                            value={whatHappened}
                            setValue={setWhatHappened}
                          />
                        </div>
                        <div style={{ textAlign: "center", color: "red" }}>
                          {submissionError
                            ? "There was an error submitting the file"
                            : null}
                        </div>
                        <div className={styles.buttonRow}>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.button23}
                          >
                            {isSubmitting ? <Loader size={20} /> : "Submit"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.formContainer}>
                <div className={styles.formBox}>
                  <h2>Tell Us</h2>
                  <button
                    onClick={toggleIsAnonymous}
                    className="toogleisanonymous"
                  >
                    Reporting Anonymously: Yes
                  </button>
                  <br />
                  <div className={styles.reportingform}>
                    <Formik
                      initialValues={anonymousInitialValues}
                      validationSchema={anonymousValidationSchema}
                      onSubmit={handleAnonymousSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className={styles.formRow}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <div className={styles.inputDiv}>
                              <Field
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                              />
                            </div>
                            <ErrorMessage
                              name="phoneNumber"
                              component="div"
                              className={styles.errorMessage}
                            />
                          </div>

                          <div className={styles.formRow}>
                            <label htmlFor="location">Location</label>
                            <div className={styles.inputDiv}>
                              <Field
                                type="text"
                                name="location"
                                id="location"
                              />
                            </div>

                            <ErrorMessage
                              name="location"
                              component="div"
                              className={styles.errorMessage}
                            />
                          </div>

                          <div className={styles.formRow}>
                            <label htmlFor="whatHappened">Abuse Category</label>
                            <br />
                            <Select
                              value={abuseCategory}
                              options={childAbuseCategories.map((item) => {
                                return {
                                  value: item.value,
                                  label: item.title,
                                };
                              })}
                              onChange={setAbuseCategory}
                            />
                          </div>

                          <div className={styles.formRow}>
                            <label htmlFor="whatHappened">What Happened</label>
                            <br />
                            <div>
                              <TextEditor
                                value={whatHappened}
                                setValue={setWhatHappened}
                              />
                            </div>
                          </div>
                          <div style={{ textAlign: "center", color: "red" }}>
                            {submissionError
                              ? "There was an error submitting the file"
                              : null}
                          </div>
                          <div className={styles.buttonRow}>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={styles.button23}
                            >
                              {isSubmitting ? <Loader size={20} /> : "Submit"}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReportingForm;

"use client";

import React, { useState } from "react";
import styles from "./ReportingForm.module.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  location: Yup.string().required("Location is required"),
  whatHappened: Yup.string().required("Please describe what happened"),
});

const anonymousValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required(
    "Input any phone number we can reach out to"
  ),
  location: Yup.string().required("Location is required"),
  whatHappened: Yup.string().required("Please describe what happened"),
});

function ReportingForm() {
  const [isAnonymous, setIsAnonymous] = useState(false);

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
    whatHappened: "",
    imageOrVideo: null,
  };

  const anonymousInitialValues = {
    location: "",
    whatHappened: "",
    imageOrVideo: null,
  };

  // Submit handler
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  const handleAnonymousSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      {!isAnonymous ? (
        <div className={styles.formContainer}>
          <div className={styles.formBox}>
            <h2>Tell Us</h2>
            <button onClick={toggleIsAnonymous} className="toogleisanonymous">
              Report Anonymously: {isAnonymous.toString()}
            </button>
            <br />
            <div className={styles.reportingform}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className={styles.formRow}>
                      <label htmlFor="firstName">First Name</label>
                      <div className={styles.inputDiv}>
                        <Field type="text" name="firstName" id="firstName" />
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
                      <label htmlFor="whatHappened">What Happened</label>
                      <br />
                      <Field
                        className="whatHappened"
                        as="textarea"
                        name="whatHappened"
                        id="whatHappened"
                        rows={5}
                        cols={15}
                      />
                      <ErrorMessage
                        name="whatHappened"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <label htmlFor="imageOrVideo">
                        Upload supporting Files
                      </label>
                      <br />
                      <Field
                        type="file"
                        name="imageOrVideo"
                        id="imageOrVideo"
                        multiple
                      />
                      <ErrorMessage
                        name="imageOrVideo"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>

                    <div className={styles.buttonRow}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="button-23"
                      >
                        Submit
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
              <button onClick={toggleIsAnonymous} className="toogleisanonymous">
                Report Anonymously: {isAnonymous.toString()}
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
                          <Field type="text" name="location" id="location" />
                        </div>

                        <ErrorMessage
                          name="location"
                          component="div"
                          className={styles.errorMessage}
                        />
                      </div>

                      <div className={styles.formRow}>
                        <label htmlFor="whatHappened">What Happened</label>
                        <br />
                        <div>
                          <Field
                            className="whatHappened"
                            as="textarea"
                            name="whatHappened"
                            id="whatHappened"
                            rows={5}
                            cols={15}
                          />
                          <ErrorMessage
                            name="whatHappened"
                            component="div"
                            className={styles.errorMessage}
                          />
                        </div>
                      </div>

                      <div className={styles.formRow}>
                        <label htmlFor="imageOrVideo">
                          Upload supporting Files
                        </label>
                        <br />
                        <Field
                          type="file"
                          name="imageOrVideo"
                          id="imageOrVideo"
                          multiple
                        />
                        <ErrorMessage
                          name="imageOrVideo"
                          component="div"
                          className={styles.errorMessage}
                        />
                      </div>

                      <div className={styles.buttonRow}>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="button-23"
                        >
                          Submit
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
  );
}

export default ReportingForm;

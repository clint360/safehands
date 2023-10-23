"use client";

import React from "react";
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
  imageOrVideo: Yup.mixed().required("Please upload an image or video"),
});

function ReportingForm() {
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

  // Submit handler
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <div>Tell Us</div>
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
                <Field type="text" name="phoneNumber" id="phoneNumber" />
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
              <div className={styles.inputDiv}>
                <Field
                  as="textarea"
                  name="whatHappened"
                  id="whatHappened"
                  rows={5}
                />
              </div>
              <ErrorMessage
                  name="whatHappened"
                  component="div"
                  className={styles.errorMessage}
                />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="imageOrVideo">Upload Image or Video</label>
              <div className={styles.inputDiv}>
                <Field type="file" name="imageOrVideo" id="imageOrVideo" />
              </div>
                <ErrorMessage
                  name="imageOrVideo"
                  component="div"
                  className={styles.errorMessage}
                />
            </div>

            <div className={styles.formRow}>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ReportingForm;

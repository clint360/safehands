"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import AuthHeader from "./components/AuthHeader";
import styles from "./styles/Auth.module.scss";
import AuthButton from "./components/AuthButton";
import OtherAuth from "./components/OtherAuth";
import { useRouter } from "next/navigation";

interface AuthPageProps {
  action: "LOGIN" | "SIGNUP";
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Auth({ action }: AuthPageProps){
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName:
      action === "SIGNUP"
        ? Yup.string().required("First Name is required")
        : Yup.string(),
    lastName:
      action === "SIGNUP"
        ? Yup.string().required("Last Name is required")
        : Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword:
      action === "SIGNUP"
        ? Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required")
        : Yup.string(),
  });

  const router = useRouter()

  // Define the initial form values
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Handle form submission
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Collect the required form values based on the action
    const formValues =
      action === "SIGNUP"
        ? {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          }
        : {
            email: values.email,
            password: values.password,
          };

    // Example of how to handle different actions separately
    if (action === "SIGNUP") {
      // Handle Sign Up logic
        setSubmitting(true) 
      
      console.log("Signing up with form values:", formValues);
    } else {
      // Handle Log In logic
      console.log("Logging in with form values:", formValues);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authBox}>
        <AuthHeader action={action} />
        <div className={styles.formArea}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                {action === "SIGNUP" ? (
                  <>
                    <div className={styles.twoFields}>
                      <div className={styles.oneOfTwo}>
                        <label>First Name</label>
                        <div className={styles.inputDiv}>
                          <Field type="text" name="firstName" />
                        </div>
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className={styles.errorMessage}
                        />
                      </div>
                      <div className={styles.oneOfTwo}>
                        <label>Last Name</label>
                        <div className={styles.inputDiv}>
                          <Field type="text" name="lastName" />
                        </div>
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className={styles.errorMessage}
                        />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <label>Email Address</label>
                      <div className={styles.inputDiv}>
                        <Field type="email" name="email" />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>
                    <div className={styles.twoFields}>
                      <div className={styles.oneOfTwo}>
                        <label>Password</label>
                        <div className={styles.inputDiv}>
                          <Field type="password" name="password" />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className={styles.errorMessage}
                        />
                      </div>
                      <div className={styles.oneOfTwo}>
                        <label>Confirm Password</label>
                        <div className={styles.inputDiv}>
                          <Field type="password" name="confirmPassword" />
                        </div>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className={styles.errorMessage}
                        />
                      </div>
                    </div>
                    <AuthButton
                      name="Sign Up"
                      type="submit"
                      disabled={formikProps.isSubmitting}
                    />
                  </>
                ) : (
                  <>
                    <div className={styles.formRow}>
                      <label>Email Address</label>
                      <div className={styles.inputDiv}>
                        <Field type="email" name="email" />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label>Password</label>
                      <div className={styles.inputDiv}>
                        <Field type="password" name="password" />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>
                    <AuthButton
                      name="Log In"
                      type="submit"
                      disabled={formikProps.isSubmitting}
                    />
                  </>
                )}
              </Form>
            )}
          </Formik>
          <div className={styles.otherAuthHeader}>
            <div>——————————————</div>
            <div>Or</div>
            <div>———————————————</div>
          </div>
          <OtherAuth />
        </div>
      </div>
    </div>
  );
}

export default Auth;

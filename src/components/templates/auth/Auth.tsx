"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import AuthHeader from "./components/AuthHeader";
import styles from "./styles/Auth.module.scss";
import AuthButton from "./components/AuthButton";
import OtherAuth from "./components/OtherAuth";
import { redirect, useRouter } from "next/navigation";
import { signIn, signUp } from "./utils";
import Link from "next/link";

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

function Auth({ action }: AuthPageProps) {
  const [logInError, setLogInError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [signUpSuccessful, setSignUpSuccessful] = useState<boolean>(false);
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
    password: Yup.string()
      .min(8, "Minimum of 8 characters required")
      .required("Password is required"),
    confirmPassword:
      action === "SIGNUP"
        ? Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required")
        : Yup.string(),
  });

  const router = useRouter();

  // Define the initial form values
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Handle form submission
  const handleSubmit = async (
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
      setSubmitting(true);
      const res = await signUp(formValues);
      if (res.status === 401) setSignUpError(res.value.toString());
      else setSignUpSuccessful(true);
      setSubmitting(false);
    } else {
      // Handle Log In logic
      setSubmitting(true);
      const res = await signIn(formValues);
      if (res.status === 401) setLogInError(res.value.toString());
      else window.location.reload();
      setSubmitting(false);
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
                    {!signUpSuccessful ? (
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
                        {signUpError && (
                          <div className={styles.errorspace}>{signUpError}</div>
                        )}
                        <AuthButton
                          name="Sign Up"
                          type="submit"
                          disabled={formikProps.isSubmitting}
                        />
                      </>
                    ) : (
                      <div className={styles.signUpSuccesfulDiv}>
                        <i className="material-icons-outlined">check_circle</i>
                        <div>Check email for next Instructions</div>
                      </div>
                    )}
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
                    {logInError && (
                      <div className={styles.errorspace}>{logInError}</div>
                    )}

                    {logInError ===
                      "AuthApiError: Invalid login credentials" && (
                      <div className={styles.forgottenpas}>
                        <Link
                          href="/auth/resetpassword"
                          className={styles.forgotpassword}
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    )}
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
          {!signUpSuccessful && 
            // <>
            //   <div className={styles.otherAuthHeader}>
            //     <div>————————————</div>
            //     <div>Or</div>
            //     <div>—————————————</div>
            //   </div>
            //   <OtherAuth />
            // </>
          <div />
          }
        </div>
      </div>
    </div>
  );
}

export default Auth;

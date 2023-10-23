import React from "react";
import styles from "./AuthHeader.module.scss";

interface Props {
  action: "LOGIN" | "SIGNUP";
}

function AuthHeader({ action }: Props) {
  return (
    <div className={styles.authboxHeader}>
      {action === "LOGIN" ? (
        <>
          <h2 className={styles.authboxHeaderH}>Welcome Back!</h2>
          <p className={styles.question}>
            Don't have an Account?
            <span>
              <a href="/auth/signup"> Register</a>
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className={styles.authboxHeaderH}>Create an account</h2>
          <p className={styles.question}>
            Already a member?
            <span>
              <a href="/auth/login"> Sign In</a>
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default AuthHeader;

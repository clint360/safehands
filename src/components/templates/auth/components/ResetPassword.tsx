'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import styles from '../styles/Auth.module.scss'

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ResetPassword = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function resetPassword(formData: any) {
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}/auth/updatepassword`,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Password reset instructions sent.');
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authBox}>
      <div className={styles.resetpasswordbox}>
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={resetPassword}
      >
        {({ errors, touched }) => (
          <Form className={styles.resetpassworddiv}>
            <label htmlFor="email">Email</label>
            <div>
            <Field
              className={cn('input', errors.email && 'bg-red-50')}
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-600">{errors.email}</div>
            ) : null}
            </div>
            <button className="button-inverse w-full" type="submit">
              Send Instructions
            </button>
          </Form>
        )}
      </Formik>
      {errorMsg && <div style={{textAlign: "center", color: "red"}}>{errorMsg}</div>}
      {successMsg && <div style={{textAlign: "center", color: "green"}}>{successMsg}</div>}
      <Link href="/auth/login" className={styles.link}>
        Remember your password? Sign In.
      </Link>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;

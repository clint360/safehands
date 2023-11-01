'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import styles from '../styles/Auth.module.scss'

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
});

const UpdatePassword = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function updatePassword(formData: any) {
    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Go to Home page
      router.replace('/app/reports');
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authBox}>
      <div className={styles.resetpasswordbox}>
      <h2 >Update Password</h2>
      <Formik
        initialValues={{
          password: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={updatePassword}
      >
        {({ errors, touched }) => (
          <Form className={styles.resetpassworddiv}>
            <label htmlFor="email">New Password</label>
            <Field
              className={cn('input', errors.password && touched.password && 'bg-red-50')}
              id="password"
              name="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600">{errors.password}</div>
            ) : null}
            <button className="button-inverse w-full" type="submit">
              Update
            </button>
          </Form>
        )}
      </Formik>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
    </div>
    </div>
    </div>
  );
};

export default UpdatePassword;

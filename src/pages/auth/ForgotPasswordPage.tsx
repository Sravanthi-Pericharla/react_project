import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const ForgotPasswordPage: React.FC = () => {
  const [sent, setSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Enter a valid email').required('Email is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await new Promise(r => setTimeout(r, 1000));
      setSent(true);
      toast.success('Password reset link sent!');
      setSubmitting(false);
    },
  });

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <i className="bi bi-mortarboard-fill text-primary fs-3"></i>
            <span style={{ fontWeight: 800, fontSize: '1.4rem' }}><span className="text-primary">Trainee</span>Pro</span>
          </div>
          <h5 className="fw-700 mb-1" style={{ fontWeight: 700 }}>Reset Password</h5>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Enter your email to receive a reset link</p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="mb-3">
              <i className="bi bi-envelope-check text-success" style={{ fontSize: '3rem' }}></i>
            </div>
            <h6 className="fw-700">Check your email</h6>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>
              If an account exists for {formik.values.email}, you'll receive a password reset link shortly.
            </p>
            <Link to="/login" className="btn btn-primary w-100">Back to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="you@example.com"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Sending...</> : 'Send Reset Link'}
            </button>
            <div className="text-center mt-3">
              <Link to="/login" className="text-muted text-decoration-none" style={{ fontSize: '0.8rem' }}>← Back to Sign In</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

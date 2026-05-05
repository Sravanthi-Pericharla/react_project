import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Enter a valid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values.email, values.password);
        toast.success('Login successful!');
        navigate('/dashboard');
      } catch (err: any) {
        toast.error(err.message || 'Invalid credentials');
      } finally {
        setSubmitting(false);
      }
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
          <h5 className="fw-700 mb-1" style={{ fontWeight: 700 }}>Welcome back</h5>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Sign in to your account</p>
        </div>

        {/* Demo credentials */}
        <div className="alert alert-info p-2 mb-3" style={{ fontSize: '0.78rem' }}>
          <strong>Demo credentials:</strong><br />
          Allocator: allocator@traineepro.com / alloc123<br />
          Educator: educator@traineepro.com / edu123<br />
          Admin: admin@traineepro.com / admin123
        </div>

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
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <div className="d-flex justify-content-end mb-3">
            <Link to="/forgot-password" className="text-primary text-decoration-none" style={{ fontSize: '0.8rem' }}>
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? (
              <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</>
            ) : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/" className="text-muted text-decoration-none" style={{ fontSize: '0.8rem' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

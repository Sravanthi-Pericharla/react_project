import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { DEPARTMENTS } from '../../utils/mockData';

const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const AddNewUser: React.FC = () => {
  const [generatedPwd, setGeneratedPwd] = useState('Tp@2026bK9');

  const formik = useFormik({
    initialValues: {
      fullName: '', email: '', phone: '', role: '', department: '', tempPassword: 'Tp@2026bK9',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
      email: Yup.string().email('Enter a valid email address').required('Email is required'),
      phone: Yup.string()
        .matches(/^[+]?[0-9\s\-]{7,15}$/, 'Enter a valid phone number (numeric, 7-15 digits)')
        .required('Phone number is required'),
      role: Yup.string().required('Please select a role'),
      department: Yup.string().required('Department is required'),
      tempPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await new Promise(r => setTimeout(r, 1000));
      toast.success(`User "${values.fullName}" created! Credentials sent to ${values.email}`);
      resetForm();
      setGeneratedPwd(generatePassword());
      formik.setFieldValue('tempPassword', generatedPwd);
      setSubmitting(false);
    },
  });

  const handleGenerate = () => {
    const pwd = generatePassword();
    setGeneratedPwd(pwd);
    formik.setFieldValue('tempPassword', pwd);
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-person-plus me-2 text-primary"></i>Add New User</h1>
        <p className="page-subtitle">Create a new allocator or educator account</p>
      </div>

      <div className="content-card">
        <h6 className="fw-700 mb-1" style={{ fontWeight: 700 }}>
          <i className="bi bi-person me-2 text-primary"></i>Add New User
        </h6>
        <p className="text-muted mb-4" style={{ fontSize: '0.875rem' }}>
          Create a new allocator or educator account. A temporary password will be generated and sent to their email.
        </p>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name *</label>
              <input type="text"
                className={`form-control ${formik.touched.fullName && formik.errors.fullName ? 'is-invalid' : ''}`}
                placeholder="e.g. Ravi Shankar"
                {...formik.getFieldProps('fullName')} />
              {formik.touched.fullName && formik.errors.fullName && <div className="invalid-feedback">{formik.errors.fullName}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Email Address *</label>
              <input type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="e.g. ravi.s@company.com"
                {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number *</label>
              <input type="text"
                className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                placeholder="+91 8876543210"
                {...formik.getFieldProps('phone')} />
              {formik.touched.phone && formik.errors.phone && <div className="invalid-feedback">{formik.errors.phone}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Role *</label>
              <select
                className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('role')}>
                <option value="">— Select role —</option>
                <option value="allocator">Allocator</option>
                <option value="educator">Educator</option>
              </select>
              {formik.touched.role && formik.errors.role && <div className="invalid-feedback">{formik.errors.role}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Department *</label>
              <input type="text"
                className={`form-control ${formik.touched.department && formik.errors.department ? 'is-invalid' : ''}`}
                placeholder="e.g. Software Engineering"
                list="dept-list"
                {...formik.getFieldProps('department')} />
              <datalist id="dept-list">
                {DEPARTMENTS.map(d => <option key={d} value={d} />)}
              </datalist>
              {formik.touched.department && formik.errors.department && <div className="invalid-feedback">{formik.errors.department}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Temporary Password *</label>
              <div className="input-group">
                <input type="text"
                  className={`form-control ${formik.touched.tempPassword && formik.errors.tempPassword ? 'is-invalid' : ''}`}
                  {...formik.getFieldProps('tempPassword')} />
                <button type="button" className="btn btn-outline-secondary" onClick={handleGenerate}>
                  <i className="bi bi-arrow-repeat"></i> Generate
                </button>
                {formik.touched.tempPassword && formik.errors.tempPassword && <div className="invalid-feedback">{formik.errors.tempPassword}</div>}
              </div>
            </div>
          </div>

          <div className="alert alert-info mt-3 py-2 mb-3" style={{ fontSize: '0.8rem' }}>
            <i className="bi bi-envelope me-2"></i>
            An email with the username and temporary password will be sent to the user. They will be prompted to change their password on first login.
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting || !formik.isValid}>
              {formik.isSubmitting
                ? <><span className="spinner-border spinner-border-sm me-2"></span>Creating...</>
                : <><i className="bi bi-person-plus me-2"></i>Create User & Send Email</>
              }
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => formik.resetForm()}>Cancel</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddNewUser;

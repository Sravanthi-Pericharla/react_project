import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_LEAVE_REQUESTS } from '../../utils/mockData';

const myRequests = MOCK_LEAVE_REQUESTS.slice(3); // educator's own

const LeaveRequests: React.FC = () => {
  const formik = useFormik({
    initialValues: { startDate: '', endDate: '', reason: '' },
    validationSchema: Yup.object({
      startDate: Yup.string().required('Start date is required'),
      endDate: Yup.string()
        .required('End date is required')
        .test('after-start', 'End date must be after start date', function (val) {
          const { startDate } = this.parent;
          if (!startDate || !val) return true;
          return new Date(val) > new Date(startDate);
        }),
      reason: Yup.string().min(10, 'Please provide a detailed reason (min 10 characters)').required('Reason is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await new Promise(r => setTimeout(r, 800));
      toast.success('Extended leave request submitted successfully!');
      resetForm();
      setSubmitting(false);
    },
  });

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-clipboard me-2 text-primary"></i>Leave Requests</h1>
        <p className="page-subtitle">Submit extended leave requests (more than 3 consecutive days) for admin approval</p>
      </div>

      {/* Submit form */}
      <div className="content-card mb-4">
        <h6 className="fw-700 mb-1" style={{ fontWeight: 700 }}>
          <i className="bi bi-clipboard-plus me-2 text-primary"></i>Extended Leave Request
        </h6>
        <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
          For unavailability exceeding 3 consecutive days, submit a request for Admin approval.
        </p>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Start Date *</label>
              <input type="date"
                className={`form-control ${formik.touched.startDate && formik.errors.startDate ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('startDate')} />
              {formik.touched.startDate && formik.errors.startDate && <div className="invalid-feedback">{formik.errors.startDate}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date *</label>
              <input type="date"
                className={`form-control ${formik.touched.endDate && formik.errors.endDate ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('endDate')} />
              {formik.touched.endDate && formik.errors.endDate && <div className="invalid-feedback">{formik.errors.endDate}</div>}
            </div>
            <div className="col-12">
              <label className="form-label">Reason for Leave *</label>
              <textarea rows={3}
                className={`form-control ${formik.touched.reason && formik.errors.reason ? 'is-invalid' : ''}`}
                placeholder="Please provide the reason for extended leave..."
                {...formik.getFieldProps('reason')} />
              {formik.touched.reason && formik.errors.reason && <div className="invalid-feedback">{formik.errors.reason}</div>}
            </div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting || !formik.isValid}>
              {formik.isSubmitting
                ? <><span className="spinner-border spinner-border-sm me-2"></span>Submitting...</>
                : <><i className="bi bi-send me-2"></i>Submit Request</>
              }
            </button>
          </div>
        </form>
      </div>

      {/* Existing requests */}
      <div className="content-card">
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>My Leave Requests</h6>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr><th>Start</th><th>End</th><th>Days</th><th>Reason</th><th>Status</th><th>Admin Remarks</th></tr>
            </thead>
            <tbody>
              {myRequests.map(r => (
                <tr key={r.id}>
                  <td>{r.startDate}</td>
                  <td>{r.endDate}</td>
                  <td>{r.days}</td>
                  <td style={{ maxWidth: 200, fontSize: '0.875rem' }}>{r.reason}</td>
                  <td><span className={`status-badge badge-${r.status}`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td>
                  <td className="text-muted" style={{ fontSize: '0.875rem' }}>{r.adminRemarks || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaveRequests;

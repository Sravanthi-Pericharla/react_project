import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BATCHES } from '../../utils/mockData';

const DownloadDetails: React.FC = () => {
  const formik = useFormik({
    initialValues: { batchId: '', format: 'Excel (.xlsx)' },
    validationSchema: Yup.object({
      batchId: Yup.string().required('Please select a batch'),
    }),
    onSubmit: async (_, { setSubmitting }) => {
      await new Promise(r => setTimeout(r, 800));
      toast.success('Download started successfully!');
      setSubmitting(false);
    },
  });

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-download me-2 text-primary"></i>Download Details</h1>
        <p className="page-subtitle">Download trainee details, classroom info, and training schedule</p>
      </div>

      <div className="content-card">
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>
          <i className="bi bi-file-earmark-arrow-down me-2 text-primary"></i>Download Trainee Details
        </h6>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Select Batch *</label>
              <select className={`form-select ${formik.touched.batchId && formik.errors.batchId ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('batchId')}>
                <option value="">— Select a batch —</option>
                {MOCK_BATCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              {formik.touched.batchId && formik.errors.batchId && <div className="invalid-feedback">{formik.errors.batchId}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Download Format</label>
              <select className="form-select" {...formik.getFieldProps('format')}>
                <option>Excel (.xlsx)</option>
                <option>PDF</option>
              </select>
            </div>
          </div>

          <div className="alert alert-light mt-3 mb-3" style={{ fontSize: '0.875rem' }}>
            <i className="bi bi-info-circle me-2 text-info"></i>
            Download includes: Trainee list, Classroom No., Batch Owner Name, and Training Schedule.
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Preparing...</> : <><i className="bi bi-download me-2"></i>Download Trainee Details</>}
            </button>
            <button type="button" className="btn btn-outline-secondary"
              onClick={async () => { if (!formik.values.batchId) { toast.error('Please select a batch'); return; } toast.success('Schedule download started!'); }}>
              <i className="bi bi-calendar3 me-2"></i>Download Schedule Only
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DownloadDetails;

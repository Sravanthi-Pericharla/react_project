import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BATCHES } from '../../utils/mockData';

const UploadSchedule: React.FC = () => {
  const [fileName, setFileName] = useState('');

  const formik = useFormik({
    initialValues: { batchId: '', scheduleType: 'Full Schedule', file: null as File | null },
    validationSchema: Yup.object({
      batchId: Yup.string().required('Please select a batch'),
      scheduleType: Yup.string().required('Schedule type is required'),
      file: Yup.mixed()
        .required('Please upload a schedule file')
        .test('fileType', 'Only .xlsx, .xls, or .pdf files are allowed', (val) => {
          if (!val) return false;
          const f = val as File;
          return f.name.match(/\.(xlsx|xls|pdf)$/i) !== null;
        })
        .test('fileSize', 'File must be less than 10MB', (val) => {
          if (!val) return false;
          return (val as File).size <= 10 * 1024 * 1024;
        }),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Training schedule uploaded successfully!');
      resetForm();
      setFileName('');
      setSubmitting(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { formik.setFieldValue('file', file); setFileName(file.name); }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-calendar-plus me-2 text-primary"></i>Upload Schedule</h1>
        <p className="page-subtitle">Upload training schedules linked to specific batches</p>
      </div>

      <div className="content-card">
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>
          <i className="bi bi-calendar3 me-2 text-primary"></i>Upload Training Schedule
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
              <label className="form-label">Schedule Type *</label>
              <select className="form-select" {...formik.getFieldProps('scheduleType')}>
                <option>Full Schedule</option>
                <option>Partial Schedule</option>
                <option>Revised Schedule</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Training Schedule File *</label>
              <div
                className={`upload-zone ${formik.touched.file && formik.errors.file ? 'border-danger' : ''}`}
                onClick={() => document.getElementById('schedFileInput')?.click()}
              >
                <input type="file" id="schedFileInput" className="d-none" accept=".xlsx,.xls,.pdf" onChange={handleFileChange} />
                {fileName ? (
                  <div>
                    <i className={`bi ${fileName.endsWith('.pdf') ? 'bi-file-earmark-pdf text-danger' : 'bi-file-earmark-spreadsheet text-success'}`} style={{ fontSize: '2rem' }}></i>
                    <p className="mb-0 mt-2 fw-600">{fileName}</p>
                    <small className="text-muted">Click to change file</small>
                  </div>
                ) : (
                  <div>
                    <i className="bi bi-cloud-upload"></i>
                    <p className="mb-1 mt-2">Click to upload or drag & drop your schedule file</p>
                    <small className="text-muted">Supports .xlsx, .xls, .pdf — Max 10MB</small>
                  </div>
                )}
              </div>
              {formik.touched.file && formik.errors.file && (
                <div className="text-danger mt-1" style={{ fontSize: '0.78rem' }}>{formik.errors.file as string}</div>
              )}
            </div>
          </div>
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Uploading...</> : <><i className="bi bi-upload me-2"></i>Upload Schedule</>}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => { formik.resetForm(); setFileName(''); }}>Cancel</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UploadSchedule;

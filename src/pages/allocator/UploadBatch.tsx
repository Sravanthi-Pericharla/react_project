import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UploadBatch: React.FC = () => {
  const [preview, setPreview] = useState(false);
  const [fileName, setFileName] = useState('');

  const formik = useFormik({
    initialValues: { batchName: '', classroom: '', batchOwner: '', startDate: '', file: null as File | null },
    validationSchema: Yup.object({
      batchName: Yup.string().required('Batch name is required'),
      classroom: Yup.string().required('Classroom number is required'),
      batchOwner: Yup.string().required('Batch owner name is required'),
      startDate: Yup.string().required('Start date is required'),
      file: Yup.mixed()
        .required('Please upload a trainee list file')
        .test('fileType', 'Only .xlsx, .xls, or .csv files are allowed', (val) => {
          if (!val) return false;
          const f = val as File;
          return ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel', 'text/csv'].includes(f.type) ||
            f.name.match(/\.(xlsx|xls|csv)$/i) !== null;
        })
        .test('fileSize', 'File must be less than 5MB', (val) => {
          if (!val) return false;
          return (val as File).size <= 5 * 1024 * 1024;
        }),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!preview) { setPreview(true); setSubmitting(false); return; }
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Batch uploaded successfully!');
      resetForm();
      setFileName('');
      setPreview(false);
      setSubmitting(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { formik.setFieldValue('file', file); setFileName(file.name); }
  };

  const PREVIEW_DATA = [
    { name: 'Arun Sharma', email: 'arun.s@mail.com', phone: '9876543210' },
    { name: 'Priya Nair', email: 'priya.n@mail.com', phone: '9876543211' },
    { name: 'Vikram Joshi', email: 'vikram.j@mail.com', phone: '9876543212' },
    { name: 'Sneha Iyer', email: 'sneha.i@mail.com', phone: '9876543213' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-upload me-2 text-primary"></i>Upload Batch</h1>
        <p className="page-subtitle">Upload a new trainee batch with classroom and owner details</p>
      </div>

      <div className="content-card">
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>
          <i className="bi bi-people me-2 text-primary"></i>Upload New Trainee Batch
        </h6>

        {!preview ? (
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Batch Name *</label>
                <input type="text" className={`form-control ${formik.touched.batchName && formik.errors.batchName ? 'is-invalid' : ''}`}
                  placeholder="e.g. Batch 2026-A3" {...formik.getFieldProps('batchName')} />
                {formik.touched.batchName && formik.errors.batchName && <div className="invalid-feedback">{formik.errors.batchName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Classroom Number *</label>
                <input type="text" className={`form-control ${formik.touched.classroom && formik.errors.classroom ? 'is-invalid' : ''}`}
                  placeholder="e.g. Room 301" {...formik.getFieldProps('classroom')} />
                {formik.touched.classroom && formik.errors.classroom && <div className="invalid-feedback">{formik.errors.classroom}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Batch Owner Name *</label>
                <input type="text" className={`form-control ${formik.touched.batchOwner && formik.errors.batchOwner ? 'is-invalid' : ''}`}
                  placeholder="e.g. Dr. Rahul Kumar" {...formik.getFieldProps('batchOwner')} />
                {formik.touched.batchOwner && formik.errors.batchOwner && <div className="invalid-feedback">{formik.errors.batchOwner}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Start Date *</label>
                <input type="date" className={`form-control ${formik.touched.startDate && formik.errors.startDate ? 'is-invalid' : ''}`}
                  {...formik.getFieldProps('startDate')} />
                {formik.touched.startDate && formik.errors.startDate && <div className="invalid-feedback">{formik.errors.startDate}</div>}
              </div>
              <div className="col-12">
                <label className="form-label">Trainee Name List (Excel) *</label>
                <div
                  className={`upload-zone ${formik.touched.file && formik.errors.file ? 'border-danger' : ''}`}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <input type="file" id="fileInput" className="d-none" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
                  {fileName ? (
                    <div>
                      <i className="bi bi-file-earmark-spreadsheet text-success" style={{ fontSize: '2rem' }}></i>
                      <p className="mb-0 mt-2 fw-600">{fileName}</p>
                      <small className="text-muted">Click to change file</small>
                    </div>
                  ) : (
                    <div>
                      <i className="bi bi-cloud-upload"></i>
                      <p className="mb-1 mt-2">Click to upload or drag & drop your Excel file here</p>
                      <small className="text-muted">Supports .xlsx, .xls, .csv — Max 5MB</small>
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
                <i className="bi bi-eye me-2"></i>Preview & Confirm
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => { formik.resetForm(); setFileName(''); }}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="alert alert-info mb-3">
              <i className="bi bi-info-circle me-2"></i>
              Please review the data below before confirming the upload.
            </div>
            <div className="row mb-3">
              <div className="col-md-3"><strong>Batch:</strong> {formik.values.batchName}</div>
              <div className="col-md-3"><strong>Classroom:</strong> {formik.values.classroom}</div>
              <div className="col-md-3"><strong>Owner:</strong> {formik.values.batchOwner}</div>
              <div className="col-md-3"><strong>Start:</strong> {formik.values.startDate}</div>
            </div>
            <div className="table-responsive mb-3">
              <table className="table table-bordered mb-0">
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
                <tbody>
                  {PREVIEW_DATA.map((d, i) => (
                    <tr key={i}><td>{i + 1}</td><td>{d.name}</td><td>{d.email}</td><td>{d.phone}</td></tr>
                  ))}
                  <tr><td colSpan={4} className="text-muted text-center">... and more rows</td></tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={() => formik.handleSubmit()} disabled={formik.isSubmitting}>
                {formik.isSubmitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Uploading...</> : <><i className="bi bi-upload me-2"></i>Confirm Upload</>}
              </button>
              <button className="btn btn-outline-secondary" onClick={() => setPreview(false)}>← Edit Details</button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadBatch;

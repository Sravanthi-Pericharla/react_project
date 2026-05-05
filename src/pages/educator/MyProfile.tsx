import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

const MyProfile: React.FC = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      fullName: 'Srinivasan Ramasamy',
      email: 'srinivasan.r@traineepro.com',
      phone: '+91 9876543210',
      designation: 'Senior Educator',
      department: 'Software Engineering',
      specialization: 'Java, Spring Boot, Microservices',
      photo: null as File | null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Enter a valid email').required('Email is required'),
      phone: Yup.string()
        .matches(/^[+]?[0-9\s\-]{7,15}$/, 'Enter a valid phone number')
        .required('Phone number is required'),
      designation: Yup.string().required('Designation is required'),
      department: Yup.string().required('Department is required'),
      specialization: Yup.string().required('Specialization is required'),
      photo: Yup.mixed()
        .nullable()
        .test('fileType', 'Only image files are allowed (jpg, png, gif)', (val) => {
          if (!val) return true;
          return (val as File).type.startsWith('image/');
        })
        .test('fileSize', 'Photo must be less than 2MB', (val) => {
          if (!val) return true;
          return (val as File).size <= 2 * 1024 * 1024;
        }),
    }),
    onSubmit: async (_, { setSubmitting }) => {
      await new Promise(r => setTimeout(r, 800));
      toast.success('Profile updated successfully!');
      setSubmitting(false);
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-person me-2 text-primary"></i>My Profile</h1>
        <p className="page-subtitle">Manage your professional profile information</p>
      </div>

      <div className="content-card">
        <h6 className="fw-700 mb-4" style={{ fontWeight: 700 }}>
          <i className="bi bi-person me-2 text-primary"></i>My Profile
        </h6>

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Photo section */}
          <div className="d-flex align-items-center gap-4 mb-4">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold overflow-hidden"
              style={{ width: 80, height: 80, fontSize: '1.8rem', cursor: 'pointer', flexShrink: 0 }}
              onClick={() => document.getElementById('photoInput')?.click()}
            >
              {photoPreview
                ? <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : formik.values.fullName?.[0]?.toUpperCase()
              }
            </div>
            <div>
              <button type="button" className="btn btn-outline-primary btn-sm"
                onClick={() => document.getElementById('photoInput')?.click()}>
                <i className="bi bi-camera me-1"></i>Change Photo
              </button>
              <input type="file" id="photoInput" className="d-none" accept="image/*" onChange={handlePhotoChange} />
              <p className="text-muted mb-0 mt-1" style={{ fontSize: '0.75rem' }}>JPG, PNG, GIF · Max 2MB · Optional</p>
              {formik.touched.photo && formik.errors.photo && (
                <div className="text-danger" style={{ fontSize: '0.78rem' }}>{formik.errors.photo as string}</div>
              )}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name *</label>
              <input type="text"
                className={`form-control ${formik.touched.fullName && formik.errors.fullName ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('fullName')} />
              {formik.touched.fullName && formik.errors.fullName && <div className="invalid-feedback">{formik.errors.fullName}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number *</label>
              <input type="text"
                className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('phone')} />
              {formik.touched.phone && formik.errors.phone && <div className="invalid-feedback">{formik.errors.phone}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Designation *</label>
              <input type="text"
                className={`form-control ${formik.touched.designation && formik.errors.designation ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('designation')} />
              {formik.touched.designation && formik.errors.designation && <div className="invalid-feedback">{formik.errors.designation}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Department *</label>
              <input type="text"
                className={`form-control ${formik.touched.department && formik.errors.department ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('department')} />
              {formik.touched.department && formik.errors.department && <div className="invalid-feedback">{formik.errors.department}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Specialization *</label>
              <input type="text"
                className={`form-control ${formik.touched.specialization && formik.errors.specialization ? 'is-invalid' : ''}`}
                {...formik.getFieldProps('specialization')} />
              {formik.touched.specialization && formik.errors.specialization && <div className="invalid-feedback">{formik.errors.specialization}</div>}
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting || !formik.isValid}>
              {formik.isSubmitting
                ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                : <><i className="bi bi-floppy me-2"></i>Save Changes</>
              }
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default MyProfile;

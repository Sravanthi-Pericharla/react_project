import React, { useState } from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { COURSES } from '../../utils/mockData';

type Level = 'High' | 'Medium' | 'Low' | '';

const initialSkills: Record<string, Level> = {
  'Java Fundamentals': 'High',
  'Spring Boot': 'High',
  'React.js': 'Medium',
  'Database Design': 'High',
  'Microservices Architecture': 'Medium',
  'DevOps & CI/CD': 'Low',
  'Angular': '',
  'Python for Data Science': '',
};

const SkillLevels: React.FC = () => {
  const [skills, setSkills] = useState<Record<string, Level>>(initialSkills);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSet = (course: string, level: Level) => {
    setSkills(prev => ({ ...prev, [course]: level }));
    setError('');
  };

  const handleSave = async () => {
    const hasAtLeastOne = Object.values(skills).some(v => v !== '');
    if (!hasAtLeastOne) {
      setError('At least one course must have a skill level selected.');
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Skill levels updated successfully!');
    setSaving(false);
  };

  const levelColors: Record<string, string> = {
    High: 'active-high', Medium: 'active-medium', Low: 'active-low',
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-star me-2 text-primary"></i>Skill Levels</h1>
        <p className="page-subtitle">Set your proficiency for each course so allocators can make informed decisions</p>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-star me-2 text-warning"></i>Course-Wise Skill Levels
          </h6>
          <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
            {saving ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : 'Save All'}
          </button>
        </div>

        <p className="text-muted mb-4" style={{ fontSize: '0.875rem' }}>
          Set your proficiency for each course. Allocators use this to determine session assignments.
        </p>

        {error && (
          <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '0.875rem' }}>
            <i className="bi bi-exclamation-circle me-2"></i>{error}
          </div>
        )}

        <div className="row g-3">
          {COURSES.map(course => (
            <div key={course} className="col-md-6 col-lg-4">
              <div className="border rounded p-3">
                <div className="fw-600 mb-2" style={{ fontWeight: 600, fontSize: '0.9rem' }}>{course}</div>
                <div className="d-flex gap-2">
                  {(['High', 'Medium', 'Low'] as Level[]).map(level => (
                    <button
                      key={level}
                      className={`skill-btn ${skills[course] === level ? levelColors[level] : ''}`}
                      onClick={() => handleSet(course, skills[course] === level ? '' : level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 d-flex gap-3">
          <div className="d-flex align-items-center gap-1">
            <span className="skill-btn active-high" style={{ pointerEvents: 'none' }}>High</span>
            <span className="text-muted ms-1" style={{ fontSize: '0.78rem' }}>Can be primary or co-educator</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <span className="skill-btn active-medium" style={{ pointerEvents: 'none' }}>Medium</span>
            <span className="text-muted ms-1" style={{ fontSize: '0.78rem' }}>Can be primary or co-educator</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <span className="skill-btn active-low" style={{ pointerEvents: 'none' }}>Low</span>
            <span className="text-muted ms-1" style={{ fontSize: '0.78rem' }}>Co-educator only</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillLevels;

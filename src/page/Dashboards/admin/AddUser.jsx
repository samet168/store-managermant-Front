import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import "./style/User.css"

const ROLES = ['user', 'admin', 'cashier', 'manager', 'owner', 'customer'];

export default function AddUser() {
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user',
  });
  const [image,    setImage]    = useState(null);
  const [preview,  setPreview]  = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const token = localStorage.getItem('token');

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    if (image) data.append('image', image);

    try {
      await api.post('admin/users', data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      navigate('/dashboard/admin/users');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   

      <div className="au-page">
        <div className="au-card">

          {/* Header */}
          <div className="au-head">
            <div className="au-head-left">
              <div className="au-head-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" y1="8" x2="19" y2="14"/>
                  <line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
              </div>
              <div>
                <div className="au-head-title">Add New User</div>
                <div className="au-head-sub">Create a new account and assign a role</div>
              </div>
            </div>
            <button className="au-close" type="button" onClick={() => navigate('/dashboard/admin/users')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Form */}
          <form className="au-body" onSubmit={handleSubmit}>

            {/* Avatar */}
            <div className="au-avatar-section">
              <div className="au-avatar-wrap" onClick={() => fileRef.current?.click()}>
                {preview ? (
                  <img src={preview} alt="avatar" className="au-avatar-img" />
                ) : (
                  <div className="au-avatar-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                )}
                <div className="au-avatar-overlay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <span>Upload</span>
                </div>
              </div>
              <span className="au-avatar-hint">Click to upload profile photo</span>
              <input ref={fileRef} type="file" accept="image/*"
                onChange={(e) => handleImage(e.target.files[0])}
                style={{ display: 'none' }} />
            </div>

            {/* Error */}
            {error && <div className="au-error">{error}</div>}

            {/* Name + Email */}
            <div className="au-row">
              <div className="au-field">
                <label className="au-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  Full Name
                </label>
                <input className="au-inp" name="name" type="text"
                  placeholder="e.g. Sophea Chan"
                  value={formData.name} onChange={handleChange} required />
              </div>
              <div className="au-field">
                <label className="au-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
                  </svg>
                  Email
                </label>
                <input className="au-inp" name="email" type="email"
                  placeholder="you@example.com"
                  value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            {/* Password */}
            <div className="au-field">
              <label className="au-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Password
              </label>
              <div className="au-inp-wrap">
                <input className="au-inp" name="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Min 8 characters"
                  value={formData.password} onChange={handleChange} required />
                <button type="button" className="au-eye" onClick={() => setShowPwd((v) => !v)}>
                  {showPwd ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="au-field">
              <label className="au-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Role
              </label>
              <div className="au-roles">
                {ROLES.map((r) => (
                  <button
                    key={r} type="button"
                    className={`au-role-pill ${formData.role === r ? 'au-role-pill--active' : ''}`}
                    onClick={() => setFormData((prev) => ({ ...prev, role: r }))}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="au-actions">
              <button type="button" className="au-btn au-btn--cancel"
                onClick={() => navigate('/dashboard/admin/users')}>
                Cancel
              </button>
              <button type="submit" className="au-btn au-btn--save" disabled={loading}>
                {loading ? <span className="au-spinner" /> : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Add User
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}


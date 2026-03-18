import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import "./style/addUser.css"
const ROLES = ['user', 'admin', 'cashier', 'manager', 'owner', 'customer'];

export default function AddUser() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
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
                <span>Upload</span>
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={e => handleImage(e.target.files[0])} style={{ display: 'none' }} />
            <span className="au-avatar-hint">Click to upload profile photo</span>
          </div>

          {/* Error */}
          {error && <div className="au-error">{error}</div>}

          {/* Name & Email */}
          <div className="au-row">
            <div className="au-field">
              <label className="au-label">Full Name</label>
              <input className="au-inp" name="name" type="text" placeholder="e.g. Sophea Chan"
                value={formData.name} onChange={handleChange} required />
            </div>
            <div className="au-field">
              <label className="au-label">Email</label>
              <input className="au-inp" name="email" type="email" placeholder="you@example.com"
                value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          {/* Password */}
          <div className="au-field">
            <label className="au-label">Password</label>
            <div className="au-inp-wrap">
              <input className="au-inp" name="password" type={showPwd ? 'text' : 'password'}
                placeholder="Min 8 characters" value={formData.password} onChange={handleChange} required />
              <button type="button" className="au-eye" onClick={() => setShowPwd(v => !v)}>
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="au-field">
            <label className="au-label">Role</label>
            <div className="au-roles">
              {ROLES.map(r => (
                <button
                  key={r}
                  type="button"
                  className={`au-role-pill ${formData.role === r ? 'au-role-pill--active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: r }))}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="au-actions">
            <button type="button" className="au-btn au-btn--cancel" onClick={() => navigate('/dashboard/admin/users')}>Cancel</button>
            <button type="submit" className="au-btn au-btn--save" disabled={loading}>
              {loading ? 'Loading...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
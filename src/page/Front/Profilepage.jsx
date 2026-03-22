import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

/* ── CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.pf-page {
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'DM Sans', sans-serif;
  color: #0f172a;
}

/* ── Banner ── */
.pf-banner {
  height: 180px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  position: relative;
  overflow: hidden;
}
.pf-banner::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* ── Profile header ── */
.pf-header {
  max-width: 900px; margin: 0 auto;
  padding: 0 24px;
  position: relative;
}
.pf-avatar-wrap {
  position: absolute;
  top: -52px; left: 24px;
}
.pf-avatar {
  width: 100px; height: 100px; border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,.12);
  background: linear-gradient(135deg, #a5b4fc, #6366f1);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif;
  font-size: 36px; font-weight: 800; color: #fff;
  overflow: hidden; cursor: pointer; position: relative;
}
.pf-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pf-avatar-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; opacity: 0; transition: opacity .15s;
}
.pf-avatar:hover .pf-avatar-overlay { opacity: 1; }

.pf-header-info {
  padding-top: 64px; padding-bottom: 20px;
  display: flex; align-items: flex-end;
  justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
.pf-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #0f172a; }
.pf-email { font-size: 13.5px; color: #64748b; margin-top: 3px; }
.pf-btn-edit {
  height: 40px; padding: 0 20px;
  background: #6366f1; color: #fff;
  border: none; border-radius: 10px;
  font-family: inherit; font-size: 13.5px; font-weight: 700;
  cursor: pointer; display: inline-flex; align-items: center; gap: 7px;
  transition: background .15s, transform .1s;
}
.pf-btn-edit:hover { background: #4f46e5; transform: translateY(-1px); }

/* ── Body layout ── */
.pf-body {
  max-width: 900px; margin: 0 auto;
  padding: 0 24px 60px;
  display: grid; grid-template-columns: 1fr 320px;
  gap: 20px; align-items: start;
}

/* ── Card ── */
.pf-card {
  background: #fff; border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  overflow: hidden; margin-bottom: 18px;
}
.pf-card:last-child { margin-bottom: 0; }
.pf-card-head {
  padding: 16px 22px; border-bottom: 1px solid #f1f5f9;
  background: #fafafa;
  display: flex; align-items: center; gap: 8px;
}
.pf-card-icon  { font-size: 16px; }
.pf-card-title { font-size: 14px; font-weight: 700; color: #0f172a; }
.pf-card-body  { padding: 20px 22px; }

/* ── Info rows (view mode) ── */
.pf-info-row {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid #f8fafc;
}
.pf-info-row:last-child { border-bottom: none; padding-bottom: 0; }
.pf-info-label {
  font-size: 11.5px; font-weight: 700; color: #94a3b8;
  text-transform: uppercase; letter-spacing: .7px;
  min-width: 90px; flex-shrink: 0; padding-top: 2px;
}
.pf-info-val { font-size: 14px; color: #0f172a; font-weight: 500; flex: 1; }
.pf-info-val.muted { color: #64748b; font-weight: 400; }

/* ── Edit form ── */
.pf-field { margin-bottom: 16px; }
.pf-field:last-child { margin-bottom: 0; }
.pf-label {
  display: block; font-size: 12px; font-weight: 700;
  color: #64748b; text-transform: uppercase;
  letter-spacing: .7px; margin-bottom: 6px;
}
.pf-input, .pf-textarea {
  width: 100%; padding: 10px 14px;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-family: inherit; font-size: 14px; color: #0f172a;
  background: #fff; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.pf-input { height: 44px; }
.pf-textarea { height: 90px; padding: 10px 14px; resize: vertical; }
.pf-input:focus, .pf-textarea:focus {
  border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1);
}
.pf-input::placeholder, .pf-textarea::placeholder { color: #cbd5e1; }
.pf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* ── Error / Success ── */
.pf-error {
  background: #fef2f2; color: #dc2626;
  border: 1px solid #fecaca; border-radius: 9px;
  padding: 10px 14px; font-size: 13.5px; font-weight: 500;
  margin-bottom: 14px;
}
.pf-success {
  background: #f0fdf4; color: #16a34a;
  border: 1px solid #bbf7d0; border-radius: 9px;
  padding: 10px 14px; font-size: 13.5px; font-weight: 500;
  margin-bottom: 14px; display: flex; align-items: center; gap: 7px;
}

/* ── Form actions ── */
.pf-form-actions { display: flex; gap: 10px; margin-top: 18px; }
.pf-btn-save {
  flex: 2; height: 44px; background: #6366f1; color: #fff;
  border: none; border-radius: 10px; font-family: inherit;
  font-size: 14px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  transition: background .15s, transform .1s;
}
.pf-btn-save:hover:not(:disabled) { background: #4f46e5; transform: translateY(-1px); }
.pf-btn-save:disabled { opacity: .6; cursor: not-allowed; transform: none; }
.pf-btn-cancel-edit {
  flex: 1; height: 44px; background: #fff; color: #374151;
  border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: inherit;
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: border-color .12s;
}
.pf-btn-cancel-edit:hover { border-color: #94a3b8; }

/* ── Stats ── */
.pf-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.pf-stat {
  background: #f8fafc; border-radius: 12px;
  padding: 16px; text-align: center;
  border: 1px solid #f1f5f9;
}
.pf-stat-val   { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: #6366f1; }
.pf-stat-label { font-size: 12px; color: #64748b; font-weight: 500; margin-top: 3px; }

/* ── Recent orders ── */
.pf-order-row {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 0; border-bottom: 1px solid #f8fafc; cursor: pointer;
  transition: background .1s; border-radius: 8px;
}
.pf-order-row:last-child { border-bottom: none; }
.pf-order-row:hover { background: #f8fafc; padding-left: 6px; }
.pf-order-id {
  font-size: 12.5px; font-weight: 700; color: #475569;
  background: #f1f5f9; border: 1px solid #e2e8f0;
  border-radius: 6px; padding: 2px 8px; font-family: monospace;
  flex-shrink: 0;
}
.pf-order-info { flex: 1; min-width: 0; }
.pf-order-date  { font-size: 12.5px; color: #94a3b8; }
.pf-order-total { font-size: 14px; font-weight: 700; color: #0f172a; flex-shrink: 0; }
.pf-order-status {
  font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;
  flex-shrink: 0;
}
.pf-order-status.pending    { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.pf-order-status.paid       { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.pf-order-status.completed  { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.pf-order-status.cancelled  { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.pf-order-status.processing { background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; }

/* Danger zone */
.pf-danger {
  background: #fff1f2; border: 1px solid #fecdd3;
  border-radius: 10px; padding: 14px 16px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
}
.pf-danger-text { font-size: 13px; color: #be123c; font-weight: 500; }
.pf-btn-logout {
  height: 36px; padding: 0 16px;
  background: #e11d48; color: #fff;
  border: none; border-radius: 9px; font-family: inherit;
  font-size: 13px; font-weight: 700; cursor: pointer;
  white-space: nowrap; transition: background .15s;
}
.pf-btn-logout:hover { background: #be123c; }

/* Skeleton */
@keyframes pf-sk { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.pf-sk {
  background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size: 200% 100%; animation: pf-sk 1.5s infinite;
  border-radius: 8px; display: block;
}

@media (max-width: 768px) {
  .pf-body { grid-template-columns: 1fr; padding: 0 16px 40px; }
  .pf-row  { grid-template-columns: 1fr; }
  .pf-banner { height: 130px; }
}
`;

function injectCSS() {
  if (document.getElementById('pf-css')) return;
  const el = document.createElement('style');
  el.id = 'pf-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ════════════════════════════════════════
   Main Component
════════════════════════════════════════ */
export default function ProfilePage() {
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  const [profile,  setProfile]  = useState(null);
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [editing,  setEditing]  = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
  });
  const [image,   setImage]   = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => { injectCSS(); }, []);

  /* ── Load profile + recent orders ── */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        const headers = { Authorization: `Bearer ${token}` };

        // Load profile + orders in parallel
        const [profRes, ordRes] = await Promise.all([
          api.get('/customer/profile', { headers }).catch(() => null),
          api.get('/customer/orders/list', { params: { page: 1 }, headers }).catch(() => ({ data: { data: [] } })),
        ]);

        // Profile — fallback to localStorage name
        const p = profRes?.data?.data ?? profRes?.data ?? {};
        const profileData = {
          id:      p.id      ?? null,
          name:    p.name    ?? localStorage.getItem('user_name') ?? 'User',
          email:   p.email   ?? '',
          phone:   p.phone   ?? '',
          address: p.address ?? '',
          image:   p.image   ?? null,
        };
        setProfile(profileData);
        setForm({
          name:    profileData.name,
          email:   profileData.email,
          phone:   profileData.phone,
          address: profileData.address,
        });
        if (profileData.image) setPreview(profileData.image);

        // Orders
        const orderList = ordRes?.data?.data ?? [];
        setOrders(orderList.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ── Image upload ── */
  const handleImage = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ── Save profile ── */
  const handleSave = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const data = new FormData();
      data.append('name',    form.name);
      data.append('email',   form.email);
      data.append('phone',   form.phone);
      data.append('address', form.address);
      if (image) data.append('image', image);

      // Try PUT/POST to profile update endpoint
      const res = await api.post('/customer/profile/update', data, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      });

      const updated = res.data?.data ?? res.data;
      setProfile(prev => ({ ...prev, ...form, image: updated?.image ?? prev.image }));
      localStorage.setItem('user_name', form.name);

      setSuccess('Profile updated successfully!');
      setEditing(false);
      setImage(null);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      setError(typeof msg === 'object' ? Object.values(msg).flat()[0] : msg || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  /* ── Logout ── */
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('customer_id');
    localStorage.removeItem('cart');
    navigate('/');
  };

  const initials = (profile?.name || 'U').charAt(0).toUpperCase();
  const totalSpent = orders.reduce((s, o) => s + Number(o.total_amount || 0), 0);

  /* ── Skeleton ── */
  if (loading) {
    return (
      <div className="pf-page">
        <style>{CSS}</style>
        <div className="pf-banner" />
        <div className="pf-header">
          <div className="pf-avatar-wrap">
            <div className="pf-sk" style={{ width: 100, height: 100, borderRadius: '50%' }} />
          </div>
          <div className="pf-header-info">
            <div>
              <div className="pf-sk" style={{ width: 180, height: 22, marginBottom: 8 }} />
              <div className="pf-sk" style={{ width: 220, height: 14 }} />
            </div>
          </div>
        </div>
        <div className="pf-body">
          <div>
            {[1,2].map(k => (
              <div className="pf-card" key={k} style={{ marginBottom: 18 }}>
                <div className="pf-card-head" style={{ background: '#fafafa' }}>
                  <div className="pf-sk" style={{ width: 120, height: 14 }} />
                </div>
                <div className="pf-card-body">
                  {[1,2,3].map(j => (
                    <div key={j} style={{ display:'flex', gap:12, padding:'10px 0', borderBottom:'1px solid #f8fafc' }}>
                      <div className="pf-sk" style={{ width:80, height:13 }} />
                      <div className="pf-sk" style={{ flex:1, height:13 }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="pf-card">
              <div className="pf-card-body">
                <div className="pf-stats">
                  {[1,2].map(k => (
                    <div key={k} className="pf-stat">
                      <div className="pf-sk" style={{ width:60, height:28, margin:'0 auto 6px' }} />
                      <div className="pf-sk" style={{ width:80, height:12, margin:'0 auto' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Render ── */
  return (
    <div className="pf-page">
      <style>{CSS}</style>

      {/* Banner */}
      <div className="pf-banner" />

      {/* Header */}
      <div className="pf-header">
        <div className="pf-avatar-wrap">
          <div className="pf-avatar" onClick={() => editing && fileRef.current?.click()}>
            {preview
              ? <img src={preview} alt="avatar" onError={e=>{e.target.style.display='none'}} />
              : initials}
            {editing && <div className="pf-avatar-overlay">📷</div>}
          </div>
          {editing && (
            <input ref={fileRef} type="file" accept="image/*"
              style={{ display: 'none' }}
              onChange={e => handleImage(e.target.files[0])} />
          )}
        </div>
        <div className="pf-header-info">
          <div>
            <div className="pf-name">{profile?.name}</div>
            <div className="pf-email">{profile?.email}</div>
          </div>
          {!editing && (
            <button className="pf-btn-edit" onClick={() => { setEditing(true); setError(''); setSuccess(''); }}>
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="pf-body">

        {/* ── Left column ── */}
        <div>

          {/* Success message */}
          {success && !editing && (
            <div className="pf-success" style={{ marginBottom: 16 }}>✅ {success}</div>
          )}

          {/* Profile info / edit form */}
          <div className="pf-card">
            <div className="pf-card-head">
              <span className="pf-card-icon">👤</span>
              <span className="pf-card-title">
                {editing ? 'Edit Profile' : 'Personal Information'}
              </span>
            </div>
            <div className="pf-card-body">
              {editing ? (
                /* ── Edit form ── */
                <form onSubmit={handleSave}>
                  {error   && <div className="pf-error">{error}</div>}
                  {success && <div className="pf-success">✅ {success}</div>}

                  <div className="pf-row">
                    <div className="pf-field">
                      <label className="pf-label">Full Name</label>
                      <input className="pf-input" type="text" placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                    </div>
                    <div className="pf-field">
                      <label className="pf-label">Email</label>
                      <input className="pf-input" type="email" placeholder="you@example.com"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="pf-field">
                    <label className="pf-label">Phone</label>
                    <input className="pf-input" type="tel" placeholder="+855 12 345 678"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="pf-field">
                    <label className="pf-label">Address</label>
                    <textarea className="pf-textarea" placeholder="Your address…"
                      value={form.address}
                      onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
                  </div>
                  <div className="pf-form-actions">
                    <button type="button" className="pf-btn-cancel-edit"
                      onClick={() => { setEditing(false); setError(''); setForm({ name: profile.name, email: profile.email, phone: profile.phone, address: profile.address }); setPreview(profile.image || ''); setImage(null); }}>
                      Cancel
                    </button>
                    <button type="submit" className="pf-btn-save" disabled={saving}>
                      {saving ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            style={{ animation: 'spin 1s linear infinite' }}>
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                          </svg>
                          Saving…
                        </>
                      ) : '💾 Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                /* ── View mode ── */
                <>
                  <div className="pf-info-row">
                    <span className="pf-info-label">Name</span>
                    <span className="pf-info-val">{profile?.name || '—'}</span>
                  </div>
                  <div className="pf-info-row">
                    <span className="pf-info-label">Email</span>
                    <span className="pf-info-val muted">{profile?.email || '—'}</span>
                  </div>
                  <div className="pf-info-row">
                    <span className="pf-info-label">Phone</span>
                    <span className="pf-info-val muted">{profile?.phone || '—'}</span>
                  </div>
                  <div className="pf-info-row">
                    <span className="pf-info-label">Address</span>
                    <span className="pf-info-val muted" style={{ whiteSpace: 'pre-line' }}>
                      {profile?.address || '—'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="pf-card">
            <div className="pf-card-head">
              <span className="pf-card-icon">🛍</span>
              <span className="pf-card-title">Recent Orders</span>
            </div>
            <div className="pf-card-body">
              {orders.length === 0 ? (
                <div style={{ textAlign:'center', padding:'28px 0', color:'#94a3b8' }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>📦</div>
                  <div style={{ fontSize:14, fontWeight:600, color:'#374151' }}>No orders yet</div>
                  <div style={{ fontSize:13 }}>
                    <button
                      onClick={() => navigate('/')}
                      style={{ background:'none', border:'none', color:'#6366f1', fontWeight:700, cursor:'pointer', fontSize:13 }}>
                      Start shopping →
                    </button>
                  </div>
                </div>
              ) : (
                orders.map(o => (
                  <div className="pf-order-row" key={o.id}
                    onClick={() => navigate(`/dashboard/customer/orders/${o.id}`)}>
                    <span className="pf-order-id">#{o.id}</span>
                    <div className="pf-order-info">
                      <div className="pf-order-date">
                        {o.order_date ? new Date(o.order_date).toLocaleDateString() : '—'}
                      </div>
                    </div>
                    <span className={`pf-order-status ${(o.status||'pending').toLowerCase()}`}>
                      {(o.status||'pending')}
                    </span>
                    <span className="pf-order-total">
                      ${Number(o.total_amount).toLocaleString(undefined,{minimumFractionDigits:2})}
                    </span>
                  </div>
                ))
              )}
              {orders.length > 0 && (
                <button
                  onClick={() => navigate('/dashboard/customer/orders')}
                  style={{ width:'100%', marginTop:14, height:38, background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:9, fontFamily:'inherit', fontSize:13, fontWeight:600, color:'#6366f1', cursor:'pointer' }}>
                  View All Orders →
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ── Right column ── */}
        <div>

          {/* Stats */}
          <div className="pf-card">
            <div className="pf-card-head">
              <span className="pf-card-icon">📊</span>
              <span className="pf-card-title">Overview</span>
            </div>
            <div className="pf-card-body">
              <div className="pf-stats">
                <div className="pf-stat">
                  <div className="pf-stat-val">{orders.length}</div>
                  <div className="pf-stat-label">Orders</div>
                </div>
                <div className="pf-stat">
                  <div className="pf-stat-val" style={{ fontSize: 18 }}>
                    ${totalSpent.toLocaleString(undefined,{minimumFractionDigits:0})}
                  </div>
                  <div className="pf-stat-label">Total Spent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="pf-card">
            <div className="pf-card-head">
              <span className="pf-card-icon">🔗</span>
              <span className="pf-card-title">Quick Links</span>
            </div>
            <div className="pf-card-body" style={{ padding: '12px 22px' }}>
              {[
                { label: '🛒 My Orders',   path: '/dashboard/customer/orders' },
                { label: '📦 Browse Products', path: '/' },
                { label: '🛍 Cart',        path: '/cart' },
              ].map(link => (
                <button key={link.path}
                  onClick={() => navigate(link.path)}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    width:'100%', padding:'11px 0', background:'none', border:'none',
                    borderBottom:'1px solid #f8fafc', fontFamily:'inherit',
                    fontSize:13.5, fontWeight:600, color:'#374151', cursor:'pointer',
                    transition:'color .12s',
                  }}
                  onMouseOver={e => e.currentTarget.style.color='#6366f1'}
                  onMouseOut={e => e.currentTarget.style.color='#374151'}
                >
                  {link.label}
                  <span style={{ color:'#94a3b8' }}>›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="pf-card">
            <div className="pf-card-body">
              <div className="pf-danger">
                <div className="pf-danger-text">Sign out of your account</div>
                <button className="pf-btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
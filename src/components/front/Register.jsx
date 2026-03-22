import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {
  const navigate = useNavigate();

  const [form,    setForm]    = React.useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = React.useState(false);
  const [error,   setError]   = React.useState('');
  const [errors,  setErrors]  = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name     = 'Name is required.';
    if (!form.email.trim())       e.email    = 'Email is required.';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return; }

    setLoading(true);
    try {
      // ✅ Send as customer (backend creates Customer record)
      const { data } = await api.post('/register', {
        name:     form.name,
        email:    form.email,
        password: form.password,
        phone:    form.phone,
        type:     'customer', // ← register as customer
      });

      // ── Auto login after register ──
      localStorage.setItem('token',     data.token);
      localStorage.setItem('user_name', data.user.name);
      localStorage.setItem('user_role', data.user.role);
      localStorage.setItem('user_id',   data.user.id);

      navigate('/'); // customer → homepage

    } catch (err) {
      const msg          = err.response?.data?.message;
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        // Laravel validation errors: { email: ['...'] }
        const flat = {};
        Object.entries(serverErrors).forEach(([k, v]) => {
          flat[k] = Array.isArray(v) ? v[0] : v;
        });
        setErrors(flat);
      } else {
        setError(msg || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const filled = [form.name, form.email, form.password].filter(Boolean).length;

  return (
    <>
      <style>{css}</style>

      <div className="rp">
        <span className="rp__orb rp__orb--1" />
        <span className="rp__orb rp__orb--2" />

        <div className="rp__card">

          <div className="rp__brand">
            <span className="rp__brand-dot" />
            <span className="rp__brand-name">StoreFront</span>
          </div>

          <h1 className="rp__title">Create account</h1>
          <p className="rp__sub">Join us today — it only takes a minute</p>

          {/* Progress steps */}
          <div className="rp__steps">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`rp__step ${i < filled ? 'rp__step--done' : ''}`} />
            ))}
          </div>

          {error && <div className="rp__error">{error}</div>}

          <form onSubmit={handleSubmit} className="rp__form" noValidate>

            {/* Name */}
            <div className="rp__field">
              <label className="rp__label" htmlFor="name">Full Name</label>
              <div className="rp__inp-wrap">
                <UserIcon />
                <input
                  id="name" name="name" type="text"
                  className={`rp__input ${errors.name ? 'rp__input--err' : ''}`}
                  placeholder="e.g. Sophea Chan"
                  value={form.name} onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              {errors.name && <span className="rp__field-err">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="rp__field">
              <label className="rp__label" htmlFor="email">Email</label>
              <div className="rp__inp-wrap">
                <MailIcon />
                <input
                  id="email" name="email" type="email"
                  className={`rp__input ${errors.email ? 'rp__input--err' : ''}`}
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="rp__field-err">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="rp__field">
              <label className="rp__label" htmlFor="phone">Phone <span style={{color:'rgba(255,255,255,0.25)',fontWeight:400}}>(optional)</span></label>
              <div className="rp__inp-wrap">
                <PhoneIcon />
                <input
                  id="phone" name="phone" type="tel"
                  className="rp__input"
                  placeholder="+855 12 345 678"
                  value={form.phone} onChange={handleChange}
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password */}
            <div className="rp__field">
              <label className="rp__label" htmlFor="password">Password</label>
              <div className="rp__inp-wrap">
                <LockIcon />
                <input
                  id="password" name="password" type="password"
                  className={`rp__input ${errors.password ? 'rp__input--err' : ''}`}
                  placeholder="Min 6 characters"
                  value={form.password} onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
              {errors.password
                ? <span className="rp__field-err">{errors.password}</span>
                : <span className="rp__hint">Use letters, numbers & symbols</span>
              }
            </div>

            <button type="submit" className="rp__submit" disabled={loading}>
              {loading ? <span className="rp__spinner" /> : 'Create Account'}
            </button>

          </form>

          <div className="rp__divider">
            <span className="rp__divider-line" />
            <span className="rp__divider-text">or</span>
            <span className="rp__divider-line" />
          </div>

          <p className="rp__footer">
            Already have an account?{' '}
            <Link to="/login" className="rp__footer-link">Login here</Link>
          </p>

        </div>
      </div>
    </>
  );
}

/* ── Icons ── */
const UserIcon = () => (
  <svg className="rp__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const MailIcon = () => (
  <svg className="rp__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);
const LockIcon = () => (
  <svg className="rp__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const PhoneIcon = () => (
  <svg className="rp__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.22 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

/* ── CSS ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

  .rp {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a14 0%, #0d1117 50%, #0a1628 100%);
    display: flex; align-items: center; justify-content: center;
    padding: 32px 16px;
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }
  .rp__orb { position: absolute; border-radius: 50%; pointer-events: none; }
  .rp__orb--1 { top:-100px; left:-80px; width:400px; height:400px; background:radial-gradient(circle,rgba(0,216,255,0.1) 0%,transparent 70%); }
  .rp__orb--2 { bottom:-80px; right:-60px; width:320px; height:320px; background:radial-gradient(circle,rgba(120,0,255,0.09) 0%,transparent 70%); }

  .rp__card {
    width: 100%; max-width: 400px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px; padding: 44px 40px;
    position: relative; z-index: 1;
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  }

  .rp__brand { display:flex; align-items:center; gap:8px; margin-bottom:22px; }
  .rp__brand-dot { width:8px; height:8px; border-radius:50%; background:#00d8ff; box-shadow:0 0 8px rgba(0,216,255,0.8); flex-shrink:0; }
  .rp__brand-name { font-family:'Syne',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; }

  .rp__title { font-family:'Syne',sans-serif; font-size:1.85rem; font-weight:700; color:#fff; letter-spacing:-0.4px; line-height:1.2; margin-bottom:6px; }
  .rp__sub { font-size:0.875rem; color:rgba(255,255,255,0.4); margin-bottom:22px; }

  .rp__steps { display:flex; gap:6px; margin-bottom:26px; }
  .rp__step { flex:1; height:3px; border-radius:3px; background:rgba(255,255,255,0.1); transition:background 0.3s,box-shadow 0.3s; }
  .rp__step--done { background:#00d8ff; box-shadow:0 0 6px rgba(0,216,255,0.5); }

  .rp__error { background:rgba(255,80,80,0.12); border:1px solid rgba(255,80,80,0.3); border-radius:10px; padding:10px 14px; font-size:0.85rem; color:#ff8080; margin-bottom:18px; }

  .rp__form { display:flex; flex-direction:column; gap:14px; }
  .rp__field { display:flex; flex-direction:column; gap:6px; }
  .rp__label { font-size:0.73rem; font-weight:600; color:rgba(255,255,255,0.45); letter-spacing:0.6px; text-transform:uppercase; }

  .rp__inp-wrap { position:relative; }
  .rp__ico { position:absolute; left:13px; top:50%; transform:translateY(-50%); width:15px; height:15px; color:rgba(255,255,255,0.25); pointer-events:none; }

  .rp__input {
    background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
    border-radius:10px; padding:12px 14px 12px 38px;
    font-family:'DM Sans',sans-serif; font-size:0.9rem; color:#fff;
    outline:none; transition:border-color 0.2s,background 0.2s,box-shadow 0.2s;
    width:100%; box-sizing:border-box;
  }
  .rp__input::placeholder { color:rgba(255,255,255,0.2); }
  .rp__input:focus { border-color:rgba(0,216,255,0.5); background:rgba(0,216,255,0.05); box-shadow:0 0 0 3px rgba(0,216,255,0.1); }
  .rp__input--err { border-color:rgba(255,80,80,0.5) !important; }
  .rp__input--err:focus { box-shadow:0 0 0 3px rgba(255,80,80,0.12) !important; }

  .rp__field-err { font-size:0.75rem; color:#ff8080; }
  .rp__hint { font-size:0.73rem; color:rgba(255,255,255,0.25); }

  .rp__submit {
    width:100%; padding:13px; margin-top:4px;
    background:linear-gradient(135deg,#00d8ff,#0090cc);
    color:#0a0a14; font-family:'DM Sans',sans-serif; font-size:0.95rem; font-weight:700;
    border:none; border-radius:10px; cursor:pointer;
    transition:all 0.25s; box-shadow:0 4px 20px rgba(0,216,255,0.25);
    display:flex; align-items:center; justify-content:center;
  }
  .rp__submit:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,216,255,0.4); }
  .rp__submit:active:not(:disabled) { transform:translateY(0); }
  .rp__submit:disabled { opacity:0.65; cursor:not-allowed; }

  .rp__spinner { width:18px; height:18px; border:2px solid rgba(10,10,20,0.3); border-top-color:#0a0a14; border-radius:50%; animation:rp-spin 0.7s linear infinite; display:inline-block; }
  @keyframes rp-spin { to { transform:rotate(360deg); } }

  .rp__divider { display:flex; align-items:center; gap:12px; margin:22px 0; }
  .rp__divider-line { flex:1; height:1px; background:rgba(255,255,255,0.08); }
  .rp__divider-text { font-size:0.75rem; color:rgba(255,255,255,0.25); }

  .rp__footer { text-align:center; font-size:0.85rem; color:rgba(255,255,255,0.35); }
  .rp__footer-link { color:#00d8ff; text-decoration:none; font-weight:500; }
  .rp__footer-link:hover { text-decoration:underline; }

  @media (max-width:480px) {
    .rp__card { padding:32px 22px; }
    .rp__title { font-size:1.55rem; }
  }
`;
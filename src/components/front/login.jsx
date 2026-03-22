import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {
  const navigate = useNavigate();

  const [form,    setForm]    = React.useState({ email: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const [error,   setError]   = React.useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/login', form);

      // ── Save to localStorage ──
      localStorage.setItem('token',     data.token);
      localStorage.setItem('user_name', data.user.name);
      localStorage.setItem('user_role', data.user.role);
      localStorage.setItem('user_id',   data.user.id);

      // ── Redirect based on role ──
      const role = data.user.role;
      if (role === 'admin')    navigate('/dashboard/admin');
      else if (role === 'cashier')  navigate('/dashboard/cashier');
      else if (role === 'supplier') navigate('/dashboard/supplier');
      else navigate('/'); // customer → homepage

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>

      <div className="lp">
        <span className="lp__orb lp__orb--1" />
        <span className="lp__orb lp__orb--2" />

        <div className="lp__card">

          <div className="lp__brand">
            <span className="lp__brand-dot" />
            <span className="lp__brand-name">StoreFront</span>
          </div>

          <h1 className="lp__title">Welcome back</h1>
          <p className="lp__sub">Sign in to your account to continue</p>

          {error && <div className="lp__error">{error}</div>}

          <form onSubmit={handleSubmit} className="lp__form">

            <div className="lp__field">
              <label className="lp__label" htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email"
                className="lp__input" placeholder="you@example.com"
                value={form.email} onChange={handleChange}
                required autoComplete="email"
              />
            </div>

            <div className="lp__field">
              <div className="lp__label-row">
                <label className="lp__label" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="lp__forgot">Forgot password?</Link>
              </div>
              <input
                id="password" name="password" type="password"
                className="lp__input" placeholder="••••••••"
                value={form.password} onChange={handleChange}
                required autoComplete="current-password"
              />
            </div>

            <button type="submit" className="lp__submit" disabled={loading}>
              {loading ? <span className="lp__spinner" /> : 'Sign In'}
            </button>

            <p className="lp__signup">
              Don't have an account? <Link to="/register" className="lp__link">Sign Up</Link>
            </p>

          </form>

          <div className="lp__divider">
            <span className="lp__divider-line" />
            <span className="lp__divider-text">or</span>
            <span className="lp__divider-line" />
          </div>

        </div>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

  .lp {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a14 0%, #0d1117 50%, #0a1628 100%);
    display: flex; align-items: center; justify-content: center;
    padding: 32px 16px;
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }
  .lp__orb { position:absolute; border-radius:50%; pointer-events:none; }
  .lp__orb--1 { top:-100px; left:-80px; width:400px; height:400px; background:radial-gradient(circle,rgba(0,216,255,0.1) 0%,transparent 70%); }
  .lp__orb--2 { bottom:-80px; right:-60px; width:320px; height:320px; background:radial-gradient(circle,rgba(80,0,255,0.08) 0%,transparent 70%); }

  .lp__card {
    width:100%; max-width:400px;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:20px; padding:44px 40px;
    position:relative; z-index:1;
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
  }
  .lp__brand { display:flex; align-items:center; gap:8px; margin-bottom:24px; }
  .lp__brand-dot { width:8px; height:8px; border-radius:50%; background:#00d8ff; box-shadow:0 0 8px rgba(0,216,255,0.8); flex-shrink:0; }
  .lp__brand-name { font-family:'Syne',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; }

  .lp__title { font-family:'Syne',sans-serif; font-size:1.9rem; font-weight:700; color:#fff; letter-spacing:-0.5px; line-height:1.2; margin-bottom:8px; }
  .lp__sub { font-size:0.875rem; color:rgba(255,255,255,0.4); margin-bottom:28px; }

  .lp__error { background:rgba(255,80,80,0.12); border:1px solid rgba(255,80,80,0.3); border-radius:10px; padding:10px 14px; font-size:0.85rem; color:#ff8080; margin-bottom:20px; }

  .lp__form { display:flex; flex-direction:column; gap:16px; }
  .lp__field { display:flex; flex-direction:column; gap:7px; }
  .lp__label-row { display:flex; align-items:center; justify-content:space-between; }
  .lp__label { font-size:0.75rem; font-weight:600; color:rgba(255,255,255,0.45); letter-spacing:0.6px; text-transform:uppercase; }
  .lp__forgot { font-size:0.78rem; color:rgba(0,216,255,0.65); text-decoration:none; transition:color 0.2s; }
  .lp__forgot:hover { color:#00d8ff; }

  .lp__input {
    background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
    border-radius:10px; padding:12px 14px;
    font-family:'DM Sans',sans-serif; font-size:0.9rem; color:#fff;
    outline:none; transition:border-color 0.2s,background 0.2s,box-shadow 0.2s;
    width:100%; box-sizing:border-box;
  }
  .lp__input::placeholder { color:rgba(255,255,255,0.2); }
  .lp__input:focus { border-color:rgba(0,216,255,0.5); background:rgba(0,216,255,0.05); box-shadow:0 0 0 3px rgba(0,216,255,0.1); }

  .lp__submit {
    width:100%; padding:13px;
    background:linear-gradient(135deg,#00d8ff,#0090cc);
    color:#0a0a14; font-family:'DM Sans',sans-serif; font-size:0.95rem; font-weight:700;
    border:none; border-radius:10px; cursor:pointer;
    transition:all 0.25s; box-shadow:0 4px 20px rgba(0,216,255,0.25);
    display:flex; align-items:center; justify-content:center; margin-top:4px;
  }
  .lp__submit:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,216,255,0.4); }
  .lp__submit:active:not(:disabled) { transform:translateY(0); }
  .lp__submit:disabled { opacity:0.65; cursor:not-allowed; }

  .lp__spinner { width:18px; height:18px; border:2px solid rgba(10,10,20,0.3); border-top-color:#0a0a14; border-radius:50%; animation:lp-spin 0.7s linear infinite; display:inline-block; }
  @keyframes lp-spin { to { transform:rotate(360deg); } }

  .lp__divider { display:flex; align-items:center; gap:12px; margin:24px 0; }
  .lp__divider-line { flex:1; height:1px; background:rgba(255,255,255,0.08); }
  .lp__divider-text { font-size:0.75rem; color:rgba(255,255,255,0.25); }

  .lp__signup { text-align:center; font-size:0.85rem; color:rgba(255,255,255,0.35); }
  .lp__link { color:#00d8ff; text-decoration:none; font-weight:500; }
  .lp__link:hover { text-decoration:underline; }

  @media (max-width:480px) {
    .lp__card { padding:32px 24px; }
    .lp__title { font-size:1.6rem; }
  }
`;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import "../../assets/style/GlobalDashboard.css";
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
      localStorage.setItem('token',     data.token);
      localStorage.setItem('user_name', data.user.name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>


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

          </form>

          <div className="lp__divider">
            <span className="lp__divider-line" />
            <span className="lp__divider-text">or</span>
            <span className="lp__divider-line" />
          </div>

          <p className="lp__footer">
            Don't have an account?{' '}
            <Link to="/register" className="lp__footer-link">Register here</Link>
          </p>

        </div>
      </div>
    </>
  );
}


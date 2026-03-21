import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.login-page {
  min-height: 100vh;
  background: #f9fafb;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Inter', sans-serif; padding: 20px;
}
.login-card {
  background: #fff; border: 1px solid #e5e7eb;
  border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,.08);
  overflow: hidden; width: 100%; max-width: 420px;
}
.login-header {
  padding: 28px 32px 22px; text-align: center;
  border-bottom: 1px solid #f3f4f6; background: #f8faff;
}
.login-logo {
  width: 48px; height: 48px; border-radius: 13px;
  background: #3b82f6; color: #fff; font-size: 22px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px; box-shadow: 0 4px 14px rgba(59,130,246,.3);
}
.login-title { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.login-sub   { font-size: 13px; color: #9ca3af; }
.login-body  { padding: 26px 32px 30px; }
.login-fg    { margin-bottom: 16px; }
.login-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; display: block; }
.login-input {
  width: 100%; background: #fff; border: 1.5px solid #e5e7eb;
  border-radius: 9px; padding: 10px 14px;
  font-family: 'Inter', sans-serif; font-size: 14px; color: #0f172a;
  outline: none; transition: border-color .15s, box-shadow .15s;
}
.login-input::placeholder { color: #9ca3af; }
.login-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.12); }
.login-alert {
  background: #fef2f2; border: 1.5px solid #fca5a5; border-radius: 8px;
  color: #dc2626; font-size: 13px; padding: 10px 14px; margin-bottom: 18px;
  display: flex; align-items: center; gap: 8px;
}
.login-btn {
  width: 100%; background: #3b82f6; color: #fff; border: none;
  border-radius: 9px; padding: 13px;
  font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700;
  cursor: pointer; box-shadow: 0 3px 12px rgba(59,130,246,.3);
  transition: all .18s; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.login-btn:hover { background: #2563eb; transform: translateY(-1px); }
.login-btn:disabled { background: #93c5fd; cursor: not-allowed; transform: none; }
.login-foot {
  text-align: center; margin-top: 18px;
  font-size: 13.5px; color: #6b7280;
}
.login-foot a { color: #3b82f6; text-decoration: none; font-weight: 600; }
.login-foot a:hover { text-decoration: underline; }
@keyframes login-spin { to { transform: rotate(360deg); } }
`;

function injectStyles() {
  if (document.getElementById("login-styles")) return;
  const tag = document.createElement("style");
  tag.id = "login-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Role → redirect path ───────────────────────────────────
function getRedirectPath(role) {
  switch (role) {
    case "admin":    return "/dashboard";
    case "manager":  return "/dashboard/manager";
    case "cashier":  return "/dashboard/cashier";
    case "supplier": return "/dashboard/supplier";
    case "customer": return "/dashboard/customer";
    default:         return "/dashboard";
  }
}

// ── Component ──────────────────────────────────────────────
const Login = () => {
  const navigate  = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  useEffect(() => { injectStyles(); }, []);

  // redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    if (token && role) {
      navigate(getRedirectPath(role), { replace: true });
    }
  }, []);

  const handleChange = (e) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);

    try {
      const res = await api.post("/login", {
        email:    form.email,
        password: form.password,
      });

      // ── Laravel returns: { token, user: { id, name, role } } ──
      const token = res.data.token;
      const user  = res.data.user;

      if (!token || !user) {
        setError("Unexpected response from server.");
        return;
      }

      // ── Save to localStorage ──────────────────────────
      localStorage.setItem("token",     token);
      localStorage.setItem("role",      user.role  || "customer");
      localStorage.setItem("user_name", user.name  || user.email || "User");
      localStorage.setItem("user_id",   String(user.id));

      // ── Redirect based on role (full reload so Sidebar reads localStorage fresh) ──
      window.location.href = getRedirectPath(user.role);

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error   ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-logo">M</div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-sub">Sign in to your account to continue</p>
        </div>

        <div className="login-body">

          {error && (
            <div className="login-alert"><span>⚠</span>{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="login-fg">
              <label className="login-label">Email</label>
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="login-fg">
              <label className="login-label">Password</label>
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <span style={{
                  width: 16, height: 16,
                  border: "2px solid rgba(255,255,255,.4)",
                  borderTopColor: "#fff", borderRadius: "50%",
                  display: "inline-block",
                  animation: "login-spin .7s linear infinite",
                }} />
              ) : "Sign In →"}
            </button>

          </form>

          <p className="login-foot">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
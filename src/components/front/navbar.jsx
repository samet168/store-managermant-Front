import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';
import "../../assets/style/GlobalFront.css";
const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/products', label: 'Shop' },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
];

// ── CSS ────────────────────────────────────────────────────


function injectStyles() {
  if (document.getElementById('nb-styles')) return;
  const tag = document.createElement('style');
  tag.id = 'nb-styles';
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Get cart count from localStorage ──────────────────────
function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((s, i) => s + (i.qty || 0), 0);
  } catch { return 0; }
}

// ── Component ──────────────────────────────────────────────
export default function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [user,      setUser]      = useState(null);
  const [cartCount, setCartCount] = useState(0);   // ← cart count

  const location = useLocation();
  // const navigate = useNavigate();
  const menuRef  = useRef(null);

  useEffect(() => { injectStyles(); }, []);

  // Load user
  useEffect(() => {
    const token    = localStorage.getItem('token');
    const userName = localStorage.getItem('user_name');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (token && userName) setUser({ name: userName });
  }, []);

 
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartCount(getCartCount());

    // listen for storage changes (other tabs or same page)
    const onStorage = () => setCartCount(getCartCount());
    window.addEventListener('storage', onStorage);

    // poll every 500ms to catch same-tab updates
    const interval = setInterval(() => setCartCount(getCartCount()), 500);

    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsOpen(false); }, [location]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      setUser(null);
      setIsOpen(false);
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
    }
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className={`nb ${scrolled ? 'nb--scrolled' : ''}`} ref={menuRef}>

      {/* Top accent line */}
      <div className="nb__topline" />

      <div className="nb__inner">

        {/* Logo */}
        <Link to="/" className="nb__logo">
          <div className="nb__logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          StoreFront
        </Link>

        {/* Desktop nav links */}
        <ul className="nb__links">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={`nb__link ${isActive(to) ? 'nb__link--active' : ''}`}>
                {label}
                {isActive(to) && <span className="nb__link-bar" />}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nb__sep" />

        {/* ── Cart icon (desktop) ──────────────────────── */}
        <Link to="/cart" className="nb__cart" title="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="9"  cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19.4a2 2 0 001.98-1.71L23 6H6"/>
          </svg>
          {cartCount > 0 && (
            <span className="nb__cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
          )}
        </Link>

        {/* Desktop auth */}
        <div className="nb__auth">
          {user ? (
            <>
              <div className="nb__user">
                <div className="nb__avatar">{user.name.charAt(0).toUpperCase()}</div>
                <span className="nb__uname">Hi, {user.name}</span>
              </div>
              <button className="nb__btn nb__btn--danger" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="nb__btn nb__btn--ghost">Login</Link>
              <Link to="/register" className="nb__btn nb__btn--fill">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`nb__ham ${isOpen ? 'nb__ham--open' : ''}`}
          onClick={() => setIsOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`nb__drawer ${isOpen ? 'nb__drawer--open' : ''}`}>
        <ul className="nb__drawer-links">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nb__drawer-link ${isActive(to) ? 'nb__drawer-link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Cart in mobile drawer */}
          <li>
            <Link to="/cart" className="nb__drawer-cart">
              🛒 Cart
              {cartCount > 0 && (
                <span className="nb__drawer-cart-count">{cartCount}</span>
              )}
            </Link>
          </li>
        </ul>

        <div className="nb__drawer-foot">
          {user ? (
            <>
              <div className="nb__drawer-user">
                <div className="nb__avatar">{user.name.charAt(0).toUpperCase()}</div>
                <span className="nb__uname">{user.name}</span>
              </div>
              <button
                className="nb__btn nb__btn--danger"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleLogout}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="nb__btn nb__btn--ghost" style={{ width: '100%', justifyContent: 'center' }}>Login</Link>
              <Link to="/register" className="nb__btn nb__btn--fill"  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
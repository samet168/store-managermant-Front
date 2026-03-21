

import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import api from '../../services/api';
import '../../assets/style/GlobalDashboard.css';

/* ─── Nav links ──────────────────────────── */
const NAV_LINKS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/reports',
    label: 'Reports',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
      </svg>
    ),
  },
];

/* ─── DashboardNavbar ────────────────────── */
export default function DashboardNavbar({ onSidebarToggle }) {
  const [user,       setUser]       = useState(null);
  const [dropOpen,   setDropOpen]   = useState(false);
  const [notifOpen,  setNotifOpen]  = useState(false);
  const location  = useLocation();
  const dropRef   = useRef(null);
  const notifRef  = useRef(null);

  /* load user */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name  = localStorage.getItem('user_name');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (token && name) setUser({ name });
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    if (!dropOpen && !notifOpen) return;
    const handler = (e) => {
      if (dropRef.current  && !dropRef.current.contains(e.target))  setDropOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropOpen, notifOpen]);

  /* logout */
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      setUser(null);
      setDropOpen(false);
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
    }
  };

  const isActive = (href) =>
    href === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(href);

  return (
    <nav className="dnb">
      {/* Top accent line */}
      <div className="dnb__topline" />

      <div className="dnb__inner">

        {/* ── Sidebar toggle (mobile only) ── */}
        <button
          className="dnb__sidebar-toggle"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
        >
          <span /><span /><span />
        </button>

        {/* ── Logo ── */}
        <a className="dnb__logo" href="/dashboard">
          <div className="dnb__logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <span className="dnb__logo-text">Apex</span>
        </a>

        {/* ── Desktop nav ── */}
        <ul className="dnb__nav">
          {NAV_LINKS.map(({ href, label, icon }) => (
            <li key={href}>
              <a
                className={`dnb__link${isActive(href) ? ' dnb__link--active' : ''}`}
                href={href}
              >
                <span className="dnb__link-icon">{icon}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="dnb__spacer" />

        {/* ── Actions ── */}
        <div className="dnb__actions">
          {user ? (
            <>
              {/* Notification bell */}
              <div className="dnb__notif-wrap" ref={notifRef}>
                <button
                  className={`dnb__bell${notifOpen ? ' dnb__bell--active' : ''}`}
                  onClick={() => setNotifOpen(v => !v)}
                  aria-label="Notifications"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 01-3.46 0"/>
                  </svg>
                  <span className="dnb__badge" />
                </button>

                {notifOpen && (
                  <div className="dnb__notif-drop">
                    <div className="dnb__notif-head">
                      <span>Notifications</span>
                      <button className="dnb__notif-clear">Mark all read</button>
                    </div>
                    {[
                      { title: 'New order received',   time: '2 min ago',  dot: true  },
                      { title: 'Stock low on item #42', time: '18 min ago', dot: true  },
                      { title: 'Report generated',     time: '1 hr ago',   dot: false },
                    ].map((n, i) => (
                      <div key={i} className="dnb__notif-item">
                        <span className={`dnb__notif-dot${n.dot ? ' dnb__notif-dot--on' : ''}`} />
                        <div>
                          <p className="dnb__notif-title">{n.title}</p>
                          <p className="dnb__notif-time">{n.time}</p>
                        </div>
                      </div>
                    ))}
                    <a className="dnb__notif-all" href="/dashboard/notifications">View all</a>
                  </div>
                )}
              </div>

              {/* User dropdown */}
              <div className="dnb__user-wrap" ref={dropRef}>
                <button className="dnb__user" onClick={() => setDropOpen(v => !v)}>
                  <div className="dnb__avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <span className="dnb__uname">{user.name}</span>
                  <svg
                    className={`dnb__chevron${dropOpen ? ' dnb__chevron--open' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {dropOpen && (
                  <div className="dnb__drop">
                    <div className="dnb__drop-head">
                      <div className="dnb__drop-avatar">{user.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="dnb__drop-name">{user.name}</p>
                        <p className="dnb__drop-role">Administrator</p>
                      </div>
                    </div>
                    <div className="dnb__drop-divider" />
                    <a className="dnb__drop-item" href="/dashboard/profile">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      Profile
                    </a>
                    <a className="dnb__drop-item" href="/dashboard/settings">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
                      </svg>
                      Settings
                    </a>
                    <div className="dnb__drop-divider" />
                    <button className="dnb__drop-item dnb__drop-item--danger" onClick={handleLogout}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <a className="dnb__btn-login" href="/dashboard/login">Login</a>
          )}
        </div>

      </div>
    </nav>
  );
}
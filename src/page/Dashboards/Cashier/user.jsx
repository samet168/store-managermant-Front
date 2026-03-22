import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

/* ── Inject CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.cm-page {
  padding: 32px 36px;
  min-height: 100vh;
  background: #f1f5f9;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* ── Header ── */
.cm-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
}
.cm-title { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -.5px; margin: 0; }
.cm-sub   { font-size: 13px; color: #94a3b8; margin-top: 4px; font-weight: 500; }

.cm-controls { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

/* Search */
.cm-sbox { position: relative; }
.cm-sbox svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
.cm-sinp {
  height: 44px; width: 260px; padding: 0 16px 0 42px;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-family: inherit; font-size: 13.5px; color: #0f172a;
  background: #fff; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.cm-sinp:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
.cm-sinp::placeholder { color: #cbd5e1; }

/* Add btn */
.cm-btn-add {
  height: 44px; padding: 0 22px;
  background: #6366f1; color: #fff;
  border: none; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 700;
  cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
  transition: background .15s, transform .1s, box-shadow .15s;
  white-space: nowrap;
}
.cm-btn-add:hover { background: #4f46e5; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(99,102,241,.3); }
.cm-btn-add:active { transform: none; }

/* ── Card Grid ── */
.cm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  margin-bottom: 28px;
}

/* ── Customer Card ── */
.cm-card {
  background: #fff;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
  border: 1.5px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  transition: transform .15s, box-shadow .15s;
}
.cm-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,.1); }

/* Avatar */
.cm-av {
  width: 72px; height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e0e7ff;
}
.cm-av-fall {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a5b4fc, #6366f1);
  color: #fff;
  font-size: 26px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  border: 3px solid #e0e7ff;
  flex-shrink: 0;
}

.cm-cname  { font-size: 15px; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.3; }
.cm-cemail { font-size: 12.5px; color: #94a3b8; word-break: break-all; }
.cm-cphone {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12.5px; color: #64748b; font-weight: 500;
  background: #f8fafc; border: 1px solid #e2e8f0;
  border-radius: 20px; padding: 4px 12px;
}
.cm-cdate  { font-size: 11.5px; color: #cbd5e1; }

.cm-card-btns { display: flex; gap: 8px; width: 100%; }
.cm-btn-edit {
  flex: 1; height: 36px;
  background: #eef2ff; color: #4f46e5;
  border: 1px solid #c7d2fe; border-radius: 9px;
  font-family: inherit; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: background .12s;
}
.cm-btn-edit:hover { background: #e0e7ff; }
.cm-btn-del {
  flex: 1; height: 36px;
  background: #fff1f2; color: #e11d48;
  border: 1px solid #fecdd3; border-radius: 9px;
  font-family: inherit; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: background .12s;
}
.cm-btn-del:hover { background: #ffe4e6; }

/* ── Empty ── */
.cm-empty {
  grid-column: 1 / -1;
  text-align: center; padding: 80px 20px;
  background: #fff; border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
}
.cm-empty-icon { font-size: 56px; margin-bottom: 14px; }
.cm-empty-t { font-size: 17px; font-weight: 700; color: #374151; margin-bottom: 6px; }
.cm-empty-d { font-size: 13.5px; color: #94a3b8; }

/* ── Skeleton card ── */
@keyframes cm-sk { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.cm-sk {
  background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size: 200% 100%;
  animation: cm-sk 1.5s infinite;
  border-radius: 8px;
  display: block;
}
.cm-skel-card {
  background: #fff; border-radius: 18px; padding: 22px;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
  border: 1.5px solid #f1f5f9;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}

/* ── Pagination ── */
.cm-pagination {
  display: flex; align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
  background: #fff;
  border-radius: 14px;
  padding: 14px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
}
.cm-pinfo { font-size: 13px; color: #64748b; font-weight: 500; }
.cm-pinfo b { color: #0f172a; }
.cm-pbtns { display: flex; align-items: center; gap: 5px; }
.cm-pb {
  min-width: 36px; height: 36px; padding: 0 6px;
  border-radius: 9px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #374151;
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .12s;
}
.cm-pb:hover:not(:disabled):not(.active) { border-color: #6366f1; color: #6366f1; background: #eef2ff; }
.cm-pb.active { background: #6366f1; border-color: #6366f1; color: #fff; cursor: default; }
.cm-pb:disabled { opacity: .3; cursor: not-allowed; }
.cm-pdot { font-size: 14px; color: #94a3b8; padding: 0 2px; user-select: none; }

@media (max-width: 640px) {
  .cm-page { padding: 16px 14px; }
  .cm-sinp { width: 100%; }
  .cm-controls { width: 100%; }
  .cm-btn-add { flex: 1; justify-content: center; }
  .cm-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 420px) {
  .cm-grid { grid-template-columns: 1fr; }
}
`;

function injectCSS() {
  if (document.getElementById('cm-css-v3')) return;
  const el = document.createElement('style');
  el.id = 'cm-css-v3';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="cm-skel-card">
      <div className="cm-sk" style={{ width: 72, height: 72, borderRadius: '50%' }} />
      <div className="cm-sk" style={{ width: 130, height: 14 }} />
      <div className="cm-sk" style={{ width: 170, height: 11 }} />
      <div className="cm-sk" style={{ width: 110, height: 28, borderRadius: 20 }} />
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <div className="cm-sk" style={{ flex: 1, height: 36, borderRadius: 9 }} />
        <div className="cm-sk" style={{ flex: 1, height: 36, borderRadius: 9 }} />
      </div>
    </div>
  );
}

/* ── Build page numbers ── */
function buildPages(cur, last) {
  const result = [];
  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || Math.abs(i - cur) <= 1) {
      result.push(i);
    } else if (result[result.length - 1] !== '…') {
      result.push('…');
    }
  }
  return result;
}

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
export default function User() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [search,    setSearch]    = useState('');
  const [page,      setPage]      = useState(1);
  const [lastPage,  setLastPage]  = useState(1);
  const [total,     setTotal]     = useState(0);
  const [loading,   setLoading]   = useState(true);

  const searchRef = useRef('');
  const timerRef  = useRef(null);

  useEffect(() => { injectCSS(); }, []);

  /* ── Fetch ── */
  const fetchCustomers = async (pg, q) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/cashier/customers/list', {
        params: { page: pg, search: q },
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = res.data;
      setCustomers(d.data         ?? []);
      setPage(     d.current_page ?? 1);
      setLastPage( d.last_page    ?? 1);
      setTotal(    d.total        ?? 0);
    } catch (err) {
      console.error('fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  /* Initial load */
  useEffect(() => { fetchCustomers(1, ''); }, []);

  /* ── Search (debounce 400ms) ── */
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    searchRef.current = val;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchCustomers(1, searchRef.current);
    }, 400);
  };

  /* ── Pagination ── */
  const goPage = (pg) => {
    if (typeof pg !== 'number' || pg < 1 || pg > lastPage || pg === page) return;
    fetchCustomers(pg, search);
  };

  /* ── Delete ── */
  // const handleDelete = async (id) => {
  //   if (!window.confirm('Delete this customer?')) return;
  //   try {
  //     const token = localStorage.getItem('token');
  //     await api.delete(`/cashier/customers/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const newPage = customers.length === 1 && page > 1 ? page - 1 : page;
  //     fetchCustomers(newPage, search);
  //   } catch (err) {
  //     console.error('delete error:', err);
  //   }
  // };

  const pages = buildPages(page, lastPage);

  /* ══ Render ══ */
  return (
    <div className="cm-page">

      {/* ── Header ── */}
      <div className="cm-header">
        <div>
          <h1 className="cm-title">Customers</h1>
          <div className="cm-sub">
            {loading ? 'Loading…' : `${total} customer${total !== 1 ? 's' : ''} registered`}
          </div>
        </div>
        <div className="cm-controls">
          {/* Search */}
          <div className="cm-sbox">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="cm-sinp"
              type="text"
              placeholder="Search by name…"
              value={search}
              onChange={handleSearch}
            />
          </div>
          {/* Add */}
          <button
            className="cm-btn-add"
            onClick={() => navigate('/dashboard/cashier/customers/add')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5"  y1="12" x2="19" y2="12"/>
            </svg>
            Add Customer
          </button>
        </div>
      </div>

      {/* ── Card Grid ── */}
      <div className="cm-grid">
        {loading ? (
          [1,2,3,4,5].map(k => <SkeletonCard key={k} />)

        ) : customers.length === 0 ? (
          <div className="cm-empty">
            <div className="cm-empty-icon">{search ? '🔍' : '👥'}</div>
            <div className="cm-empty-t">
              {search ? `No results for "${search}"` : 'No customers yet'}
            </div>
            <div className="cm-empty-d">
              {search ? 'Try a different name' : 'Click "Add Customer" to get started'}
            </div>
          </div>

        ) : customers.map(c => (
          <div className="cm-card" key={c.id}>
            {/* Avatar */}
            {c.image ? (
              <img src={c.image} alt={c.name} className="cm-av"
                onError={e => { e.target.style.display = 'none'; }} />
            ) : (
              <div className="cm-av-fall">
                {(c.name || '?').charAt(0).toUpperCase()}
              </div>
            )}

            {/* Info */}
            <div>
              <div className="cm-cname">{c.name}</div>
              <div className="cm-cemail">{c.email}</div>
            </div>

            {c.phone && (
              <div className="cm-cphone">
                📞 {c.phone}
              </div>
            )}

            <div className="cm-cdate">
              Joined {c.created_at ? new Date(c.created_at).toLocaleDateString() : '—'}
            </div>

            {/* Buttons */}
            <div className="cm-card-btns">
              {/* <button className="cm-btn-edit"
                onClick={() => navigate(`/dashboard/cashier/customers/edit/${c.id}`)}>
                ✏️ Edit
              </button> */}
              {/* <button className="cm-btn-del"
                onClick={() => handleDelete(c.id)}>
                🗑 Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination ── */}
      {!loading && lastPage > 1 && (
        <div className="cm-pagination">
          <div className="cm-pinfo">
            Page <b>{page}</b> of <b>{lastPage}</b> · <b>{total}</b> total
          </div>
          <div className="cm-pbtns">
            <button className="cm-pb"
              onClick={() => goPage(page - 1)}
              disabled={page === 1}
            >‹</button>

            {pages.map((p, i) =>
              p === '…'
                ? <span key={`d${i}`} className="cm-pdot">…</span>
                : <button
                    key={p}
                    className={`cm-pb${p === page ? ' active' : ''}`}
                    onClick={() => goPage(p)}
                  >{p}</button>
            )}

            <button className="cm-pb"
              onClick={() => goPage(page + 1)}
              disabled={page === lastPage}
            >›</button>
          </div>
        </div>
      )}

    </div>
  );
}
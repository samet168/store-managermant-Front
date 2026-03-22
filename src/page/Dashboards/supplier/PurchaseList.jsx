import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

/* ── Inject CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.pl-page {
  padding: 32px 36px;
  min-height: 100vh;
  background: #f1f5f9;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Header */
.pl-header {
  display: flex; align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap; gap: 16px;
  margin-bottom: 28px;
}
.pl-title { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -.5px; margin: 0; }
.pl-sub   { font-size: 13px; color: #94a3b8; margin-top: 4px; font-weight: 500; }

.pl-controls { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

/* Search */
.pl-sbox { position: relative; }
.pl-sbox svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
.pl-sinp {
  height: 44px; width: 260px; padding: 0 16px 0 42px;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-family: inherit; font-size: 13.5px; color: #0f172a;
  background: #fff; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.pl-sinp:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
.pl-sinp::placeholder { color: #cbd5e1; }

/* Add btn */
.pl-btn-add {
  height: 44px; padding: 0 22px;
  background: #6366f1; color: #fff;
  border: none; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 700;
  cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
  transition: background .15s, transform .1s, box-shadow .15s;
  white-space: nowrap;
}
.pl-btn-add:hover { background: #4f46e5; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(99,102,241,.3); }
.pl-btn-add:active { transform: none; }

/* Table Card */
.pl-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 16px rgba(0,0,0,.07);
  overflow: hidden;
}

.pl-table { width: 100%; border-collapse: collapse; }
.pl-table thead {
  background: #fafafa;
  border-bottom: 1.5px solid #f3f4f6;
}
.pl-table th {
  padding: 14px 22px;
  font-size: 10.5px; font-weight: 700;
  letter-spacing: 1.1px; text-transform: uppercase;
  color: #6b7280; text-align: left; white-space: nowrap;
}
.pl-table th:last-child { text-align: right; }
.pl-table tbody tr {
  border-bottom: 1px solid #f9fafb;
  transition: background .1s;
}
.pl-table tbody tr:last-child { border-bottom: none; }
.pl-table tbody tr:hover { background: #fafaff; }
.pl-table td {
  padding: 16px 22px;
  vertical-align: middle;
  font-size: 14px; color: #374151;
}
.pl-table td:last-child { text-align: right; }

/* Supplier cell */
.pl-sup { display: flex; align-items: center; gap: 10px; }
.pl-sup-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #a5b4fc, #6366f1);
  color: #fff; font-size: 15px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.pl-sup-name  { font-size: 14px; font-weight: 700; color: #0f172a; }
.pl-sup-date  { font-size: 12px; color: #94a3b8; margin-top: 2px; }

/* Amount */
.pl-amount { font-size: 15px; font-weight: 700; color: #0f172a; }

/* Items badge */
.pl-items {
  display: inline-flex; align-items: center; gap: 5px;
  background: #f0f9ff; color: #0369a1;
  border: 1px solid #bae6fd; border-radius: 20px;
  padding: 4px 12px; font-size: 12.5px; font-weight: 600;
}

/* Status badge */
.pl-status {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 12px; border-radius: 20px;
  font-size: 12px; font-weight: 600;
}
.pl-status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.pl-status.pending   { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.pl-status.completed { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.pl-status.cancelled { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

/* Action buttons */
.pl-btn-view {
  display: inline-flex; align-items: center; gap: 5px;
  height: 34px; padding: 0 13px;
  background: #f0fdf4; color: #16a34a;
  border: 1px solid #bbf7d0; border-radius: 9px;
  font-family: inherit; font-size: 12.5px; font-weight: 600;
  cursor: pointer; margin-right: 5px;
  transition: background .12s;
}
.pl-btn-view:hover { background: #dcfce7; }

.pl-btn-edit {
  display: inline-flex; align-items: center; gap: 5px;
  height: 34px; padding: 0 13px;
  background: #eef2ff; color: #4f46e5;
  border: 1px solid #c7d2fe; border-radius: 9px;
  font-family: inherit; font-size: 12.5px; font-weight: 600;
  cursor: pointer; margin-right: 5px;
  transition: background .12s;
}
.pl-btn-edit:hover { background: #e0e7ff; }

.pl-btn-del {
  display: inline-flex; align-items: center; gap: 5px;
  height: 34px; padding: 0 13px;
  background: #fff1f2; color: #e11d48;
  border: 1px solid #fecdd3; border-radius: 9px;
  font-family: inherit; font-size: 12.5px; font-weight: 600;
  cursor: pointer;
  transition: background .12s;
}
.pl-btn-del:hover { background: #ffe4e6; }

/* Empty */
.pl-empty { padding: 80px 20px; text-align: center; }
.pl-empty-icon { font-size: 56px; margin-bottom: 14px; }
.pl-empty-t { font-size: 17px; font-weight: 700; color: #374151; margin-bottom: 6px; }
.pl-empty-d { font-size: 13.5px; color: #94a3b8; }

/* Skeleton */
@keyframes pl-sk { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.pl-sk {
  background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size: 200% 100%;
  animation: pl-sk 1.5s infinite;
  border-radius: 6px; display: inline-block;
}

/* Pagination */
.pl-footer {
  display: flex; align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
  padding: 16px 22px;
  border-top: 1.5px solid #f3f4f6;
}
.pl-pinfo { font-size: 13px; color: #64748b; font-weight: 500; }
.pl-pinfo b { color: #0f172a; }
.pl-pbtns { display: flex; align-items: center; gap: 5px; }
.pl-pb {
  min-width: 36px; height: 36px; padding: 0 6px;
  border-radius: 9px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #374151;
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .12s;
}
.pl-pb:hover:not(:disabled):not(.active) { border-color: #6366f1; color: #6366f1; background: #eef2ff; }
.pl-pb.active { background: #6366f1; border-color: #6366f1; color: #fff; cursor: default; }
.pl-pb:disabled { opacity: .3; cursor: not-allowed; }
.pl-pdot { font-size: 14px; color: #94a3b8; padding: 0 2px; user-select: none; }

@media (max-width: 768px) {
  .pl-page { padding: 16px 14px; }
  .pl-sinp { width: 100%; }
  .pl-controls { width: 100%; }
  .pl-btn-add { flex: 1; justify-content: center; }
  .pl-table thead { display: none; }
  .pl-table tbody tr { display: block; padding: 14px 16px; border-bottom: 1px solid #f1f5f9; }
  .pl-table td { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border: none; text-align: left !important; }
  .pl-table td::before { content: attr(data-label); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .8px; color: #94a3b8; min-width: 90px; }
}
`;

function injectCSS() {
  if (document.getElementById("pl-css")) return;
  const el = document.createElement("style");
  el.id = "pl-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ── Skeleton Row ── */
function SkeletonRow() {
  return (
    <tr>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            className="pl-sk"
            style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0 }}
          />
          <div>
            <div
              className="pl-sk"
              style={{ width: 120, height: 13, marginBottom: 6 }}
            />
            <div className="pl-sk" style={{ width: 80, height: 11 }} />
          </div>
        </div>
      </td>
      <td>
        <div className="pl-sk" style={{ width: 90, height: 13 }} />
      </td>
      <td>
        <div
          className="pl-sk"
          style={{ width: 70, height: 26, borderRadius: 20 }}
        />
      </td>
      <td>
        <div
          className="pl-sk"
          style={{ width: 70, height: 26, borderRadius: 20 }}
        />
      </td>
      <td style={{ textAlign: "right" }}>
        <div
          className="pl-sk"
          style={{
            width: 150,
            height: 34,
            borderRadius: 9,
            display: "inline-block",
          }}
        />
      </td>
    </tr>
  );
}

/* ── Build page numbers ── */
function buildPages(cur, last) {
  const result = [];
  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || Math.abs(i - cur) <= 1) result.push(i);
    else if (result[result.length - 1] !== "…") result.push("…");
  }
  return result;
}

/* ── Status Badge ── */
function StatusBadge({ status }) {
  const s = (status || "pending").toLowerCase();
  return (
    <span className={`pl-status ${s}`}>
      <span className="pl-status-dot" />
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
}

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
export default function PurchaseList() {
  const navigate = useNavigate();

  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const searchRef = useRef("");
  const timerRef = useRef(null);

  useEffect(() => {
    injectCSS();
  }, []);

  /* ── Fetch ── */
  const fetchPurchases = async (pg, q) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/supplier/purchases/list", {
        params: { page: pg, search: q },
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = res.data;
      setPurchases(d.data ?? []);
      setPage(d.current_page ?? 1);
      setLastPage(d.last_page ?? 1);
      setTotal(d.total ?? 0);
    } catch (err) {
      console.error("fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases(1, "");
  }, []);

  /* ── Search debounce ── */
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    searchRef.current = val;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchPurchases(1, searchRef.current);
    }, 400);
  };

  /* ── Pagination ── */
  const goPage = (pg) => {
    if (typeof pg !== "number" || pg < 1 || pg > lastPage || pg === page)
      return;
    fetchPurchases(pg, search);
  };

  /* ── Delete ── */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this purchase?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/supplier/purchases/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newPage = purchases.length === 1 && page > 1 ? page - 1 : page;
      fetchPurchases(newPage, search);
    } catch (err) {
      console.error("delete error:", err);
    }
  };

  const pages = buildPages(page, lastPage);

  /* ══ Render ══ */
  return (
    <div className="pl-page">
      {/* Header */}
      <div className="pl-header">
        <div>
          <h1 className="pl-title">Purchases</h1>
          <div className="pl-sub">
            {loading
              ? "Loading…"
              : `${total} purchase${total !== 1 ? "s" : ""} total`}
          </div>
        </div>
        <div className="pl-controls">
          {/* Search */}
          <div className="pl-sbox">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="pl-sinp"
              type="text"
              placeholder="Search supplier or status…"
              value={search}
              onChange={handleSearch}
            />
          </div>
          {/* Add */}
          <button
            className="pl-btn-add"
            onClick={() => navigate("/dashboard/supplier/purchases/add")}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Purchase
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="pl-card">
        <table className="pl-table">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Total Amount</th>
              <th>Items</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1, 2, 3, 4, 5].map((k) => <SkeletonRow key={k} />)
            ) : purchases.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 0 }}>
                  <div className="pl-empty">
                    <div className="pl-empty-icon">{search ? "🔍" : "📦"}</div>
                    <div className="pl-empty-t">
                      {search
                        ? `No results for "${search}"`
                        : "No purchases yet"}
                    </div>
                    <div className="pl-empty-d">
                      {search
                        ? "Try searching by supplier name or status"
                        : 'Click "New Purchase" to get started'}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              purchases.map((p) => (
                <tr key={p.id}>
                  {/* Supplier */}
                  <td data-label="Supplier">
                    <div className="pl-sup">
                      <div className="pl-sup-icon">
                        {(p.supplier?.name || "S").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="pl-sup-name">
                          {p.supplier?.name || "—"}
                        </div>
                        <div className="pl-sup-date">
                          {p.purchase_date
                            ? new Date(p.purchase_date).toLocaleDateString()
                            : "—"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Total */}
                  <td data-label="Total Amount">
                    <span className="pl-amount">
                      $
                      {Number(p.total_amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </td>

                  {/* Items */}
                  <td data-label="Items">
                    <span className="pl-items">
                      📦 {p.details?.length ?? 0} items
                    </span>
                  </td>

                  {/* Status */}
                  <td data-label="Status">
                    <StatusBadge status={p.status} />
                  </td>

                  {/* Actions */}
                  <td data-label="Actions">
                    <button
                      className="pl-btn-view"
                      onClick={() =>
                        navigate(`/dashboard/supplier/purchases/${p.id}`)
                      }
                    >
                      👁 View
                    </button>
                    <button
                      className="pl-btn-edit"
                      onClick={() =>
                        navigate(`/dashboard/supplier/purchases/edit/${p.id}`)
                      }
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="pl-btn-del"
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑 Del
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && lastPage > 1 && (
          <div className="pl-footer">
            <div className="pl-pinfo">
              Page <b>{page}</b> of <b>{lastPage}</b> · <b>{total}</b> total
            </div>
            <div className="pl-pbtns">
              <button
                className="pl-pb"
                onClick={() => goPage(page - 1)}
                disabled={page === 1}
              >
                ‹
              </button>

              {pages.map((p, i) =>
                p === "…" ? (
                  <span key={`d${i}`} className="pl-pdot">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    className={`pl-pb${p === page ? " active" : ""}`}
                    onClick={() => goPage(p)}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                className="pl-pb"
                onClick={() => goPage(page + 1)}
                disabled={page === lastPage}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

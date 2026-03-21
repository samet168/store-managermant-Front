import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.sl-page {
  padding: 28px 32px;
  background: #f4f6f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Header */
.sl-header {
  display: flex; align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; gap: 14px;
  margin-bottom: 22px;
}
.sl-title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0; }

/* Controls */
.sl-controls { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.sl-search-wrap {
  display: flex; align-items: center;
  background: #fff; border: 1.5px solid #e2e8f0;
  border-radius: 8px; overflow: hidden;
  transition: border-color .15s, box-shadow .15s;
}
.sl-search-wrap:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.12);
}
.sl-search-input {
  border: none; outline: none; padding: 9px 14px;
  font-family: 'Inter', sans-serif; font-size: 13.5px;
  color: #0f172a; background: transparent; width: 220px;
}
.sl-search-input::placeholder { color: #94a3b8; }

/* Per page select */
.sl-per-page {
  background: #fff; border: 1.5px solid #e2e8f0;
  border-radius: 8px; padding: 9px 12px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  color: #374151; outline: none; cursor: pointer;
  transition: border-color .15s;
}
.sl-per-page:focus { border-color: #3b82f6; }

.sl-btn-add {
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 9px 20px;
  font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600;
  cursor: pointer; box-shadow: 0 2px 8px rgba(59,130,246,.28);
  transition: background .15s, transform .12s; white-space: nowrap;
}
.sl-btn-add:hover { background: #2563eb; transform: translateY(-1px); }

/* Error alert */
.sl-alert-err {
  background: #fef2f2; border: 1.5px solid #fca5a5;
  border-radius: 10px; color: #dc2626; font-size: 13.5px;
  padding: 12px 16px; margin-bottom: 18px;
  display: flex; align-items: center; gap: 8px;
}

/* Card */
.sl-card {
  background: #fff; border: 1px solid #e2e8f0;
  border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
}

/* Table */
.sl-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.sl-table thead tr { background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; }
.sl-table th {
  padding: 13px 16px; text-align: left;
  font-size: 11px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase; color: #64748b;
}
.sl-table tbody tr {
  border-bottom: 1px solid #f1f5f9; transition: background .12s;
}
.sl-table tbody tr:last-child { border-bottom: none; }
.sl-table tbody tr:hover { background: #f8fafc; }
.sl-table td { padding: 13px 16px; color: #374151; vertical-align: middle; }

/* ID */
.sl-id {
  font-family: 'Courier New', monospace; font-size: 12.5px;
  font-weight: 600; color: #64748b; background: #f1f5f9;
  border-radius: 6px; padding: 2px 8px;
}

/* Product name */
.sl-product { font-weight: 600; color: #0f172a; }

/* Quantity badge */
.sl-qty {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 700; padding: 3px 10px;
  border-radius: 20px;
}
.sl-qty.pos { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.sl-qty.neg { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.sl-qty.neu { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }

/* Date */
.sl-date { font-size: 12.5px; color: #64748b; white-space: nowrap; }

/* Actions */
.sl-actions { display: flex; gap: 7px; }
.sl-btn-edit {
  background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe;
  border-radius: 7px; padding: 5px 12px;
  font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all .15s;
}
.sl-btn-edit:hover { background: #3b82f6; color: #fff; }
.sl-btn-delete {
  background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;
  border-radius: 7px; padding: 5px 12px;
  font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all .15s;
}
.sl-btn-delete:hover { background: #dc2626; color: #fff; }

/* Empty */
.sl-empty { text-align: center; padding: 52px 20px; color: #94a3b8; font-size: 14px; }
.sl-empty-icon { font-size: 36px; margin-bottom: 10px; }

/* Skeleton */
.sl-skeleton {
  background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size: 200% 100%;
  animation: sl-shimmer 1.4s infinite; border-radius: 6px;
}
@keyframes sl-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

/* Pagination */
.sl-pagination {
  display: flex; align-items: center; justify-content: flex-end;
  gap: 10px; padding: 15px 18px;
  border-top: 1px solid #f1f5f9; background: #fafafa;
}
.sl-page-info { font-size: 13px; color: #64748b; }
.sl-btn-page {
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 7px;
  padding: 7px 16px; font-family: 'Inter', sans-serif;
  font-size: 13px; font-weight: 600; color: #374151; cursor: pointer;
  transition: all .15s;
}
.sl-btn-page:not(:disabled):hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
.sl-btn-page:disabled { opacity: .35; cursor: not-allowed; }

/* Responsive */
@media (max-width: 768px) {
  .sl-page { padding: 18px 14px; }
  .sl-header { flex-direction: column; align-items: flex-start; }
  .sl-search-input { width: 100%; }
  .sl-search-wrap { flex: 1; }
  .sl-btn-add { width: 100%; text-align: center; }
  .sl-table thead { display: none; }
  .sl-table tbody tr {
    display: block; border: 1px solid #e2e8f0;
    border-radius: 10px; margin: 10px 0; padding: 12px;
  }
  .sl-table td {
    display: flex; justify-content: space-between;
    align-items: center; padding: 6px 4px;
    border-bottom: 1px solid #f1f5f9;
  }
  .sl-table td:last-child { border-bottom: none; }
  .sl-table td::before {
    content: attr(data-label);
    font-size: 11px; font-weight: 700; letter-spacing: .8px;
    text-transform: uppercase; color: #94a3b8; min-width: 80px;
  }
  .sl-pagination { justify-content: center; }
}
`;

function injectStyles() {
  if (document.getElementById('sl2-styles')) return;
  const tag = document.createElement('style');
  tag.id = 'sl2-styles';
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// Qty badge
function QtyBadge({ qty }) {
  const n   = Number(qty);
  const cls = n > 0 ? 'pos' : n < 0 ? 'neg' : 'neu';
  return (
    <span className={`sl-qty ${cls}`}>
      {n > 0 ? `+${n}` : n}
    </span>
  );
}

// ── Component ──────────────────────────────────────────────
const StockLogs = () => {
  const navigate = useNavigate();
  const [logs, setLogs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [search, setSearch]           = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage]       = useState(1);
  const [perPage, setPerPage]         = useState(10);

  const token = localStorage.getItem('token');

  useEffect(() => { injectStyles(); }, []);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('admin/stock-logs/list', {
        params: { search, per_page: perPage, page: currentPage },
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data.data || []);
      setLastPage(res.data.last_page || 1);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch stock logs.');
      setLogs([]);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchLogs(); }, [currentPage, perPage, search]);

  const handleAdd    = ()    => navigate('add');
  const handleEdit   = (log) => navigate(`edit/${log.id}`);
  const handleDelete = async (log) => {
    if (!window.confirm(`Are you sure to delete stock log #${log.id}?`)) return;
    try {
      await api.delete(`admin/stock-logs/${log.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLogs();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="sl-page">

      {/* Header */}
      <div className="sl-header">
        <h2 className="sl-title">Stock Logs</h2>
        <div className="sl-controls">
          <div className="sl-search-wrap">
            <input
              type="text"
              className="sl-search-input"
              placeholder="Search by product name…"
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <select
            className="sl-per-page"
            value={perPage}
            onChange={e => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>
          <button className="sl-btn-add" onClick={handleAdd}>+ Add Log</button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="sl-alert-err"><span>⚠</span>{error}</div>
      )}

      {/* Table card */}
      <div className="sl-card">
        <table className="sl-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1,2,3,4,5].map(k => (
                <tr key={k}>
                  {[60,120,70,100,80].map((w,j) => (
                    <td key={j}>
                      <div className="sl-skeleton" style={{ height: 14, width: w }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="sl-empty">
                    <div className="sl-empty-icon">📦</div>
                    No stock logs found.
                  </div>
                </td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id}>
                  <td data-label="ID">
                    <span className="sl-id">#{log.id}</span>
                  </td>
                  <td data-label="Product">
                    <span className="sl-product">{log.product?.name || '—'}</span>
                  </td>
                  <td data-label="Quantity">
                    <QtyBadge qty={log.product.quantity} />
                  </td>
                  <td data-label="Date">
                    <span className="sl-date">
                      {new Date(log.created_at).toLocaleDateString()}
                      <br />
                      <span style={{ color: '#94a3b8', fontSize: 11.5 }}>
                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="sl-actions">
                      <button className="sl-btn-edit"   onClick={() => handleEdit(log)}>Edit</button>
                      <button className="sl-btn-delete" onClick={() => handleDelete(log)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="sl-pagination">
          <button
            className="sl-btn-page"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage(p => p - 1)}
          >← Prev</button>
          <span className="sl-page-info">{currentPage} / {lastPage}</span>
          <button
            className="sl-btn-page"
            disabled={currentPage === lastPage || loading}
            onClick={() => setCurrentPage(p => p + 1)}
          >Next →</button>
        </div>
      </div>

    </div>
  );
};

export default StockLogs;
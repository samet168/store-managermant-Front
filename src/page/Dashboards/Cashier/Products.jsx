import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

// ── Inject styles once ─────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.prod-page {
  padding: 28px 32px;
  background: #f4f6f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* ── Header row ───────────────────────────────────────── */
.prod-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 22px;
}
.prod-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

/* ── Controls row ─────────────────────────────────────── */
.prod-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.prod-search-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color .15s, box-shadow .15s;
}
.prod-search-wrap:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.13);
}
.prod-search-input {
  border: none;
  outline: none;
  padding: 9px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  color: #0f172a;
  background: transparent;
  width: 240px;
}
.prod-search-input::placeholder { color: #94a3b8; }
.prod-search-btn {
  background: transparent;
  border: none;
  border-left: 1.5px solid #e2e8f0;
  padding: 9px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #94a3b8;
  transition: color .15s;
}
.prod-search-btn:hover { color: #3b82f6; }

.prod-btn-add {
  background: #22c55e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s, transform .12s, box-shadow .15s;
  box-shadow: 0 2px 8px rgba(34,197,94,.28);
  white-space: nowrap;
}
.prod-btn-add:hover {
  background: #16a34a;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(34,197,94,.35);
}

/* ── Card ─────────────────────────────────────────────── */
.prod-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
}

/* ── Table ────────────────────────────────────────────── */
.prod-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
.prod-table thead tr {
  background: #f8fafc;
  border-bottom: 1.5px solid #e2e8f0;
}
.prod-table th {
  padding: 13px 18px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #64748b;
}
.prod-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: background .12s;
}
.prod-table tbody tr:last-child { border-bottom: none; }
.prod-table tbody tr:hover { background: #f8fafc; }
.prod-table td {
  padding: 13px 18px;
  color: #374151;
  vertical-align: middle;
}

/* ── Product image ────────────────────────────────────── */
.prod-img {
  width: 44px;
  height: 44px;
  border-radius: 9px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
}
.prod-img-ph {
  width: 44px;
  height: 44px;
  border-radius: 9px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 18px;
}

/* ── Name cell ────────────────────────────────────────── */
.prod-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}
.prod-name-text {
  font-weight: 600;
  font-size: 13.5px;
  color: #0f172a;
}

/* ── Price ────────────────────────────────────────────── */
.prod-price {
  font-weight: 600;
  color: #0f172a;
}

/* ── Status badge ─────────────────────────────────────── */
.prod-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}
.prod-status.active {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.prod-status.inactive {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.prod-status.pending {
  background: #fffbeb;
  color: #b45309;
  border: 1px solid #fde68a;
}
.prod-status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: currentColor;
}

/* ── Category chip ────────────────────────────────────── */
.prod-cat {
  display: inline-block;
  background: #eff6ff;
  color: #3b82f6;
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
}

/* ── Qty ──────────────────────────────────────────────── */
.prod-qty {
  font-weight: 600;
  color: #374151;
}
.prod-qty.low { color: #dc2626; }

/* ── Action buttons ───────────────────────────────────── */
.prod-actions { display: flex; gap: 8px; }
.prod-btn-edit {
  background: #eff6ff;
  color: #3b82f6;
  border: 1px solid #bfdbfe;
  border-radius: 7px;
  padding: 6px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
}
.prod-btn-edit:hover {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}
.prod-btn-delete {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 7px;
  padding: 6px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
}
.prod-btn-delete:hover {
  background: #dc2626;
  color: #fff;
  border-color: #dc2626;
}

/* ── Empty state ──────────────────────────────────────── */
.prod-empty {
  text-align: center;
  padding: 52px 20px;
  color: #94a3b8;
  font-size: 14px;
}
.prod-empty-icon { font-size: 36px; margin-bottom: 10px; }

/* ── Pagination ───────────────────────────────────────── */
.prod-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
}
.prod-page-info {
  font-size: 13px;
  color: #64748b;
}
.prod-btn-page {
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 7px;
  padding: 7px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all .15s;
}
.prod-btn-page:not(:disabled):hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #eff6ff;
}
.prod-btn-page:disabled { opacity: .35; cursor: not-allowed; }

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 768px) {
  .prod-page { padding: 18px 14px; }
  .prod-header { flex-direction: column; align-items: flex-start; }
  .prod-controls { width: 100%; }
  .prod-search-input { width: 100%; }
  .prod-search-wrap { flex: 1; }
  .prod-btn-add { width: 100%; text-align: center; }

  .prod-table thead { display: none; }
  .prod-table tbody tr {
    display: block;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    margin: 10px 14px;
    padding: 12px;
  }
  .prod-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 4px;
    border-bottom: 1px solid #f1f5f9;
  }
  .prod-table td:last-child { border-bottom: none; }
  .prod-table td::before {
    content: attr(data-label);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .8px;
    text-transform: uppercase;
    color: #94a3b8;
    min-width: 90px;
  }
  .prod-pagination { justify-content: center; }
}
`;

function injectStyles() {
  if (document.getElementById('prod-styles')) return;
  const tag = document.createElement('style');
  tag.id = 'prod-styles';
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Status helper ──────────────────────────────────────────
function StatusBadge({ status }) {
  const s = (status || '').toLowerCase();
  const cls = s === 'active' ? 'active' : s === 'inactive' ? 'inactive' : 'pending';
  return (
    <span className={`prod-status ${cls}`}>
      <span className="prod-status-dot" />
      {status || '—'}
    </span>
  );
}

// ── Component ──────────────────────────────────────────────
const Products = () => {
  
  const [products, setProducts]     = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage]     = useState(1);
  const [search, setSearch]         = useState('');
  const [loading, setLoading]       = useState(false);
  // const token = localStorage.getItem('token');
  

  useEffect(() => { injectStyles(); }, []);

  const fetchProducts = async (page = 1, searchTerm = '') => {
    setLoading(true);
    try {
      const res = await api.get(`cashier/products/list?page=${page}&search=${searchTerm}`);
      setProducts(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchProducts(1, value);
  };

  const handleNext = () => currentPage < lastPage && fetchProducts(currentPage + 1, search);
  const handlePrev = () => currentPage > 1     && fetchProducts(currentPage - 1, search);


  return (
    <div className="prod-page">

      {/* Header */}
      <div className="prod-header">
        <h1 className="prod-title">Products</h1>
        <div className="prod-controls">
          <div className="prod-search-wrap">
            <input
              type="text"
              className="prod-search-input"
              placeholder="Search by name or description…"
              value={search}
              onChange={handleSearch}
            />
            <button className="prod-search-btn" onClick={() => fetchProducts(1, search)}>🔍</button>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="prod-card">
        <table className="prod-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="prod-empty">Loading…</td></tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="prod-empty">
                    <div className="prod-empty-icon">📦</div>
                    No products found.
                  </div>
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td data-label="Product">
                    <div className="prod-name-cell">
                      {p.image
                        ? <img src={p.image} alt={p.name} className="prod-img" />
                        : <div className="prod-img-ph">📦</div>
                      }
                      <span className="prod-name-text">{p.name}</span>
                    </div>
                  </td>
                  <td data-label="Category">
                    <span className="prod-cat">{p.category?.name || '—'}</span>
                  </td>
                  <td data-label="Price">
                    <span className="prod-price">${Number(p.price).toLocaleString()}</span>
                  </td>
                  <td data-label="Qty">
                    <span className={`prod-qty${p.quantity < 10 ? ' low' : ''}`}>
                      {p.quantity}
                    </span>
                  </td>
                  <td data-label="Status">
                    <StatusBadge status={p.status} />
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="prod-pagination">
          <button className="prod-btn-page" onClick={handlePrev} disabled={currentPage === 1}>
            ← Prev
          </button>
          <span className="prod-page-info">Page {currentPage} of {lastPage}</span>
          <button className="prod-btn-page" onClick={handleNext} disabled={currentPage === lastPage}>
            Next →
          </button>
        </div>
      </div>

    </div>
  );
};

export default Products;
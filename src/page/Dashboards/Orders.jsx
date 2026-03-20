import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

// ── Inject styles once ─────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.ord-page {
  padding: 28px 32px;
  background: #f4f6f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Header */
.ord-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 22px;
}
.ord-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

/* Controls */
.ord-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.ord-search-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color .15s, box-shadow .15s;
}
.ord-search-wrap:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.12);
}
.ord-search-input {
  border: none;
  outline: none;
  padding: 9px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  color: #0f172a;
  background: transparent;
  width: 230px;
}
.ord-search-input::placeholder { color: #94a3b8; }

.ord-btn-add {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s, transform .12s;
  box-shadow: 0 2px 8px rgba(59,130,246,.28);
  white-space: nowrap;
}
.ord-btn-add:hover { background: #2563eb; transform: translateY(-1px); }

/* Card */
.ord-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
}

/* Table */
.ord-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
.ord-table thead tr {
  background: #f8fafc;
  border-bottom: 1.5px solid #e2e8f0;
}
.ord-table th {
  padding: 13px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #64748b;
}
.ord-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: background .12s;
}
.ord-table tbody tr:last-child { border-bottom: none; }
.ord-table tbody tr:hover { background: #f8fafc; }
.ord-table td {
  padding: 13px 16px;
  color: #374151;
  vertical-align: top;
}

/* Order ID */
.ord-id {
  font-family: 'Courier New', monospace;
  font-size: 12.5px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  border-radius: 6px;
  padding: 3px 8px;
  display: inline-block;
}

/* Customer */
.ord-customer {
  font-weight: 600;
  color: #0f172a;
  font-size: 13.5px;
}

/* Products list */
.ord-products { display: flex; flex-direction: column; gap: 4px; }
.ord-product-item {
  font-size: 12.5px;
  color: #475569;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 3px 9px;
  display: inline-block;
  white-space: nowrap;
}

/* Total */
.ord-total {
  font-weight: 700;
  color: #0f172a;
  font-size: 14px;
}

/* Status badge */
.ord-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
}
.ord-status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.ord-status.pending   { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.ord-status.completed { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.ord-status.cancelled { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.ord-status.processing{ background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; }

/* Date */
.ord-date { font-size: 12.5px; color: #64748b; white-space: nowrap; }

/* Actions */
.ord-actions { display: flex; gap: 6px; flex-wrap: wrap; }
.ord-btn-view {
  background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0;
  border-radius: 7px; padding: 5px 12px;
  font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all .15s;
}
.ord-btn-view:hover { background: #16a34a; color: #fff; border-color: #16a34a; }

.ord-btn-edit {
  background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe;
  border-radius: 7px; padding: 5px 12px;
  font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all .15s;
}
.ord-btn-edit:hover { background: #3b82f6; color: #fff; border-color: #3b82f6; }

.ord-btn-delete {
  background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;
  border-radius: 7px; padding: 5px 12px;
  font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all .15s;
}
.ord-btn-delete:hover { background: #dc2626; color: #fff; border-color: #dc2626; }

/* Empty */
.ord-empty {
  text-align: center;
  padding: 52px 20px;
  color: #94a3b8;
  font-size: 14px;
}
.ord-empty-icon { font-size: 36px; margin-bottom: 10px; }

/* Pagination */
.ord-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px 18px;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
}
.ord-page-info { font-size: 13px; color: #64748b; }
.ord-btn-page {
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
.ord-btn-page:not(:disabled):hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
.ord-btn-page:disabled { opacity: .35; cursor: not-allowed; }

/* Responsive */
@media (max-width: 768px) {
  .ord-page { padding: 18px 14px; }
  .ord-header { flex-direction: column; align-items: flex-start; }
  .ord-search-input { width: 100%; }
  .ord-search-wrap { flex: 1; }
  .ord-btn-add { width: 100%; text-align: center; }

  .ord-table thead { display: none; }
  .ord-table tbody tr {
    display: block;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    margin: 10px 14px;
    padding: 12px;
  }
  .ord-table td {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 6px 4px;
    border-bottom: 1px solid #f1f5f9;
  }
  .ord-table td:last-child { border-bottom: none; }
  .ord-table td::before {
    content: attr(data-label);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .8px;
    text-transform: uppercase;
    color: #94a3b8;
    min-width: 90px;
    flex-shrink: 0;
  }
  .ord-pagination { justify-content: center; }
}
`;

function injectStyles() {
  if (document.getElementById('ord-styles')) return;
  const tag = document.createElement('style');
  tag.id = 'ord-styles';
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// Status badge helper
function StatusBadge({ status }) {
  const s = (status || '').toLowerCase();
  const cls =
    s === 'completed'  ? 'completed'  :
    s === 'cancelled'  ? 'cancelled'  :
    s === 'processing' ? 'processing' : 'pending';
  return (
    <span className={`ord-status ${cls}`}>
      <span className="ord-status-dot" />
      {status || '—'}
    </span>
  );
}

// ── Component ──────────────────────────────────────────────
const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders]           = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage]       = useState(1);
  const [search, setSearch]           = useState('');
  const [loading, setLoading]         = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => { injectStyles(); }, []);

  const fetchOrders = async (page = 1, searchTerm = '') => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/orders/list?page=${page}&search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchOrders(1, value);
  };

  const handleNext   = () => currentPage < lastPage && fetchOrders(currentPage + 1, search);
  const handlePrev   = () => currentPage > 1         && fetchOrders(currentPage - 1, search);
  const handleAdd    = ()      => navigate('/dashboard/admin/orders/add-order');
  const handleEdit   = (id)    => navigate(`/dashboard/admin/orders/edit/${id}`);
  const handleShow   = (id)    => navigate(`/dashboard/admin/orders/show/${id}`);
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await api.delete(`/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders(currentPage, search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ord-page">

      {/* Header */}
      <div className="ord-header">
        <h1 className="ord-title">Orders</h1>
        <div className="ord-controls">
          <div className="ord-search-wrap">
            <input
              type="text"
              className="ord-search-input"
              placeholder="Search by customer or status…"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <button className="ord-btn-add" onClick={handleAdd}>+ Add Order</button>
        </div>
      </div>

      {/* Table card */}
      <div className="ord-card">
        <table className="ord-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="ord-empty">Loading…</td></tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="ord-empty">
                    <div className="ord-empty-icon">🧾</div>
                    No orders found.
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <td data-label="Order ID">
                    <span className="ord-id">#{o.id}</span>
                  </td>
                  <td data-label="Customer">
                    <span className="ord-customer">{o.customer?.name || '—'}</span>
                  </td>
                  <td data-label="Products">
                    <div className="ord-products">
                      {o.details?.map((d) => (
                        <span key={d.id} className="ord-product-item">
                          {d.product?.name} × {d.quantity} (${d.price})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td data-label="Total">
                    <span className="ord-total">${Number(o.total_amount).toLocaleString()}</span>
                  </td>
                  <td data-label="Status">
                    <StatusBadge status={o.status} />
                  </td>
                  <td data-label="Date">
                    <span className="ord-date">
                      {new Date(o.order_date).toLocaleDateString()}<br />
                      <span style={{ color: '#94a3b8', fontSize: 11.5 }}>
                        {new Date(o.order_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="ord-actions">
                      <button className="ord-btn-view"   onClick={() => handleShow(o.id)}>View</button>
                      <button className="ord-btn-edit"   onClick={() => handleEdit(o.id)}>Edit</button>
                      <button className="ord-btn-delete" onClick={() => handleDelete(o.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="ord-pagination">
          <button className="ord-btn-page" onClick={handlePrev} disabled={currentPage === 1}>← Prev</button>
          <span className="ord-page-info">Page {currentPage} of {lastPage}</span>
          <button className="ord-btn-page" onClick={handleNext} disabled={currentPage === lastPage}>Next →</button>
        </div>
      </div>

    </div>
  );
};

export default Orders;
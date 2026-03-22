import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../../services/api';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.so-page {
  padding: 28px 32px;
  background: #f4f6f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Breadcrumb */
.so-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 18px; }
.so-bc-link { font-size: 12.5px; color: #3b82f6; cursor: pointer; font-weight: 500; }
.so-bc-link:hover { text-decoration: underline; }
.so-bc-sep { font-size: 12px; color: #cbd5e1; }
.so-bc-cur { font-size: 12.5px; color: #94a3b8; }

/* Layout */
.so-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 18px;
}

/* Card */
.so-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
}
.so-card-full { grid-column: 1 / -1; }

/* Card header */
.so-card-header {
  padding: 16px 22px 14px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  gap: 8px;
}
.so-card-header-icon { font-size: 16px; }
.so-card-title { font-size: 14px; font-weight: 700; color: #0f172a; }

/* Card body */
.so-card-body { padding: 18px 22px; }

/* Info rows */
.so-info-row {
  display: flex;
  align-items: flex-start;
  padding: 9px 0;
  border-bottom: 1px solid #f1f5f9;
  gap: 12px;
}
.so-info-row:last-child { border-bottom: none; padding-bottom: 0; }
.so-info-label {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: .7px;
  min-width: 100px;
  flex-shrink: 0;
  padding-top: 1px;
}
.so-info-value {
  font-size: 13.5px;
  color: #0f172a;
  font-weight: 500;
  flex: 1;
}
.so-info-value.muted { color: #64748b; font-weight: 400; }

/* Order header bar */
.so-order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
}
.so-order-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.so-order-id {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 3px 12px;
  font-family: 'Courier New', monospace;
}

/* Status badge */
.so-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}
.so-status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.so-status.pending    { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.so-status.completed  { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.so-status.cancelled  { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.so-status.processing { background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; }
.so-status.paid       { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }

/* Table */
.so-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
.so-table thead tr {
  background: #f8fafc;
  border-bottom: 1.5px solid #e2e8f0;
}
.so-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #64748b;
}
.so-table th:last-child { text-align: right; }
.so-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: background .12s;
}
.so-table tbody tr:last-child { border-bottom: none; }
.so-table tbody tr:hover { background: #f8fafc; }
.so-table td {
  padding: 13px 16px;
  color: #374151;
  vertical-align: middle;
}
.so-table td:last-child { text-align: right; }

/* Product name cell */
.so-prod-cell { display: flex; align-items: center; gap: 10px; }
.so-prod-icon {
  width: 34px; height: 34px;
  border-radius: 8px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.so-prod-name { font-weight: 600; color: #0f172a; }

.so-num { font-family: 'Courier New', monospace; font-size: 13px; }
.so-subtotal { font-weight: 700; color: #0f172a; }
.so-idx { color: #94a3b8; font-size: 12.5px; }

/* Total row */
.so-total-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 16px 22px;
  border-top: 1.5px solid #e2e8f0;
  background: #f8fafc;
}
.so-total-label { font-size: 13px; font-weight: 600; color: #64748b; }
.so-total-value { font-size: 20px; font-weight: 700; color: #0f172a; }

/* Skeleton */
.so-skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: so-shimmer 1.4s infinite;
  border-radius: 8px;
}
@keyframes so-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

/* Back button */
.so-btn-back {
  background: #fff;
  color: #374151;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.so-btn-back:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }

/* Responsive */
@media (max-width: 640px) {
  .so-page { padding: 18px 14px; }
  .so-grid { grid-template-columns: 1fr; }
  .so-card-full { grid-column: 1; }
  .so-order-header { flex-direction: column; align-items: flex-start; }
  .so-table thead { display: none; }
  .so-table tbody tr {
    display: block; border: 1px solid #e2e8f0;
    border-radius: 10px; margin: 8px 0; padding: 12px;
  }
  .so-table td {
    display: flex; justify-content: space-between;
    align-items: center; padding: 6px 4px;
    border-bottom: 1px solid #f1f5f9; text-align: left !important;
  }
  .so-table td:last-child { border-bottom: none; }
  .so-table td::before {
    content: attr(data-label);
    font-size: 11px; font-weight: 700; letter-spacing: .8px;
    text-transform: uppercase; color: #94a3b8; min-width: 80px;
  }
}
`;

function injectStyles() {
  if (document.getElementById('so-styles')) return;
  const tag = document.createElement('style');
  tag.id = 'so-styles';
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

function StatusBadge({ status }) {
  const s = (status || '').toLowerCase();
  const cls =
    s === 'completed'  ? 'completed'  :
    s === 'cancelled'  ? 'cancelled'  :
    s === 'processing' ? 'processing' :
    s === 'paid'       ? 'paid'       : 'pending';
  return (
    <span className={`so-status ${cls}`}>
      <span className="so-status-dot" />
      {status || '—'}
    </span>
  );
}

// ── Component ──────────────────────────────────────────────
const ShowOrder = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const token    = localStorage.getItem('token');

  const [order, setOrder]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/customer/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, token]);

  // ── Skeleton ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="so-page">
        <div className="so-bc">
          <div className="so-skeleton" style={{ width: 60, height: 14 }} />
          <span className="so-bc-sep">/</span>
          <div className="so-skeleton" style={{ width: 80, height: 14 }} />
        </div>
        <div className="so-grid">
          {[1, 2].map(k => (
            <div className="so-card" key={k}>
              <div className="so-card-header" style={{ background: '#f8fafc' }}>
                <div className="so-skeleton" style={{ width: 120, height: 14 }} />
              </div>
              <div className="so-card-body">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div className="so-skeleton" style={{ width: 90, height: 13 }} />
                    <div className="so-skeleton" style={{ flex: 1, height: 13 }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!order) return null;

  const total = order.details?.reduce((s, d) => s + d.quantity * d.price, 0) || 0;

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="so-page">

      {/* Breadcrumb */}
      <div className="so-bc">
        <span className="so-bc-link" onClick={() => navigate('/dashboard/customer/orders')}>Orders</span>
        <span className="so-bc-sep">/</span>
        <span className="so-bc-cur">Order #{id}</span>
      </div>

      {/* Title row */}
      <div className="so-order-header">
        <h1 className="so-order-title">
          Order Detail
          <span className="so-order-id">#{id}</span>
        </h1>
        <StatusBadge status={order.status} />
      </div>

      {/* Info grid */}
      <div className="so-grid">

        {/* Customer info */}
        <div className="so-card">
          <div className="so-card-header">
            <span className="so-card-header-icon">👤</span>
            <span className="so-card-title">Customer Information</span>
          </div>
          <div className="so-card-body">
            <div className="so-info-row">
              <span className="so-info-label">Name</span>
              <span className="so-info-value">{order.customer?.name || '—'}</span>
            </div>
            <div className="so-info-row">
              <span className="so-info-label">Email</span>
              <span className="so-info-value muted">{order.customer?.email || '—'}</span>
            </div>
            <div className="so-info-row">
              <span className="so-info-label">Phone</span>
              <span className="so-info-value muted">{order.customer?.phone || '—'}</span>
            </div>
            <div className="so-info-row">
              <span className="so-info-label">Address</span>
              <span className="so-info-value muted">{order.customer?.address || '—'}</span>
            </div>
          </div>
        </div>

        {/* Order info */}
        <div className="so-card">
          <div className="so-card-header">
            <span className="so-card-header-icon">🧾</span>
            <span className="so-card-title">Order Information</span>
          </div>
          <div className="so-card-body">
            <div className="so-info-row">
              <span className="so-info-label">Order ID</span>
              <span className="so-info-value">
                <span style={{ fontFamily: 'Courier New', fontSize: 13, background: '#f1f5f9', padding: '2px 8px', borderRadius: 6 }}>
                  #{order.id}
                </span>
              </span>
            </div>
            <div className="so-info-row">
              <span className="so-info-label">Status</span>
              <span className="so-info-value"><StatusBadge status={order.status} /></span>
            </div>
            <div className="so-info-row">
              <span className="so-info-label">Total</span>
              <span className="so-info-value" style={{ fontSize: 16, fontWeight: 700, color: '#1d4ed8' }}>
                ${Number(order.total_amount).toLocaleString()}
              </span>
            </div>
            <div className="so-info-row">
              <span className="so-info-label">Date</span>
              <span className="so-info-value muted">
                {new Date(order.order_date).toLocaleDateString()}{' '}
                <span style={{ color: '#94a3b8', fontSize: 12 }}>
                  {new Date(order.order_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Products table */}
        <div className="so-card so-card-full">
          <div className="so-card-header">
            <span className="so-card-header-icon">🛒</span>
            <span className="so-card-title">Products ({order.details?.length || 0} items)</span>
          </div>
          <table className="so-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.details?.map((d, i) => (
                <tr key={d.id}>
                  <td data-label="#"><span className="so-idx">{i + 1}</span></td>
                  <td data-label="Product">
                    <div className="so-prod-cell">
                      <div className="so-prod-icon">📦</div>
                      <span className="so-prod-name">{d.product?.name || '—'}</span>
                    </div>
                  </td>
                  <td data-label="Price">
                    <span className="so-num">${Number(d.price).toLocaleString()}</span>
                  </td>
                  <td data-label="Qty">
                    <span className="so-num">× {d.quantity}</span>
                  </td>
                  <td data-label="Subtotal">
                    <span className="so-subtotal">
                      ${(d.quantity * d.price).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="so-total-row">
            <span className="so-total-label">Order Total</span>
            <span className="so-total-value">
              ${Number(order.total_amount || total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

      </div>

      {/* Back button */}
      <button className="so-btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

    </div>
  );
};

export default ShowOrder;
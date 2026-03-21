import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../services/api';

// ── All styles ─────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.ao-page {
  padding: 28px 32px;
  background: #f4f6f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Breadcrumb */
.ao-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 18px; }
.ao-bc-link { font-size: 12.5px; color: #3b82f6; cursor: pointer; font-weight: 500; }
.ao-bc-link:hover { text-decoration: underline; }
.ao-bc-sep { font-size: 12px; color: #cbd5e1; }
.ao-bc-cur { font-size: 12.5px; color: #94a3b8; }

/* Card */
.ao-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
  max-width: 700px;
}

/* Card header */
.ao-card-header {
  padding: 20px 26px 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
.ao-card-title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0; }
.ao-card-sub   { font-size: 12.5px; color: #94a3b8; margin-top: 3px; }
.ao-id-badge {
  font-size: 12px; font-weight: 600; color: #64748b;
  background: #f1f5f9; border: 1px solid #e2e8f0;
  border-radius: 20px; padding: 3px 12px;
  font-family: 'Courier New', monospace; flex-shrink: 0;
}

/* Card body */
.ao-card-body { padding: 24px 26px 28px; }

/* Form group */
.ao-form-group { margin-bottom: 18px; }
.ao-label {
  font-size: 13px; font-weight: 600; color: #374151;
  margin-bottom: 6px; display: block;
}
.ao-req { color: #ef4444; margin-left: 2px; }

/* Inputs & Selects */
.ao-input, .ao-select {
  width: 100%; background: #fff;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 10px 14px; font-family: 'Inter', sans-serif;
  font-size: 13.5px; color: #0f172a; outline: none;
  transition: border-color .15s, box-shadow .15s;
  appearance: none;
}
.ao-input::placeholder { color: #94a3b8; }
.ao-input:focus, .ao-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.12);
}

/* Section title */
.ao-section-title {
  font-size: 13px; font-weight: 700; color: #0f172a;
  display: flex; align-items: center; gap: 8px;
  margin: 24px 0 12px;
}
.ao-section-title::after {
  content: ''; flex: 1; height: 1px; background: #e2e8f0;
}

/* Product row */
.ao-product-row {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 10px;
}
.ao-product-index {
  font-size: 10.5px; font-weight: 700; color: #94a3b8;
  text-transform: uppercase; letter-spacing: .7px;
  margin-bottom: 10px; display: block;
}
.ao-product-grid {
  display: grid;
  grid-template-columns: 2fr 80px 100px;
  gap: 10px;
  align-items: center;
}
.ao-product-grid-2 {
  display: grid;
  grid-template-columns: 1fr 36px;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
}

/* Small inputs inside product row */
.ao-input-sm {
  width: 100%; background: #fff;
  border: 1.5px solid #e2e8f0; border-radius: 7px;
  padding: 8px 10px; font-family: 'Inter', sans-serif;
  font-size: 13px; color: #0f172a; outline: none;
  transition: border-color .15s, box-shadow .15s;
  appearance: none;
}
.ao-input-sm::placeholder { color: #94a3b8; }
.ao-input-sm:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.12);
}

/* Remove button */
.ao-btn-remove {
  background: #fef2f2; color: #dc2626;
  border: 1px solid #fecaca; border-radius: 7px;
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; cursor: pointer; flex-shrink: 0;
  transition: all .15s;
}
.ao-btn-remove:hover { background: #dc2626; color: #fff; }
.ao-btn-remove:disabled { opacity: .35; cursor: not-allowed; }

/* Add product button */
.ao-btn-add-product {
  background: #f0fdf4; color: #16a34a;
  border: 1.5px dashed #86efac; border-radius: 9px;
  padding: 10px 18px; font-family: 'Inter', sans-serif;
  font-size: 13px; font-weight: 600; cursor: pointer;
  width: 100%; margin-top: 4px;
  transition: all .15s;
}
.ao-btn-add-product:hover { background: #dcfce7; border-color: #4ade80; }

/* Total preview */
.ao-total-box {
  margin-top: 14px; padding: 12px 16px;
  background: #eff6ff; border: 1px solid #bfdbfe;
  border-radius: 8px; display: flex;
  justify-content: space-between; align-items: center;
}
.ao-total-label { font-size: 13px; font-weight: 600; color: #3b82f6; }
.ao-total-value { font-size: 16px; font-weight: 700; color: #1d4ed8; }

/* Alert */
.ao-alert-err {
  background: #fef2f2; border: 1.5px solid #fca5a5;
  border-radius: 8px; color: #dc2626; font-size: 13px;
  padding: 10px 14px; margin-bottom: 18px;
  display: flex; align-items: center; gap: 8px;
}

/* Divider */
.ao-divider { border: none; border-top: 1px solid #e2e8f0; margin: 22px 0; }

/* Button row */
.ao-btn-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.ao-btn-save {
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 10px 26px;
  font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600;
  cursor: pointer; box-shadow: 0 2px 8px rgba(59,130,246,.28);
  transition: background .15s, transform .12s;
}
.ao-btn-save:not(:disabled):hover { background: #2563eb; transform: translateY(-1px); }
.ao-btn-save:disabled { background: #93c5fd; cursor: not-allowed; }

.ao-btn-cancel {
  background: #fff; color: #64748b;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 10px 20px; font-family: 'Inter', sans-serif;
  font-size: 13.5px; font-weight: 500; cursor: pointer;
  transition: all .15s;
}
.ao-btn-cancel:hover { border-color: #cbd5e1; color: #374151; background: #f8fafc; }

/* Skeleton */
.ao-skeleton {
  background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size: 200% 100%;
  animation: ao-shimmer 1.4s infinite;
  border-radius: 8px;
}
@keyframes ao-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes ao-spin    { to{transform:rotate(360deg)} }

/* Responsive */
@media (max-width: 600px) {
  .ao-page { padding: 18px 14px; }
  .ao-card-header, .ao-card-body { padding: 16px 18px; }
  .ao-product-grid { grid-template-columns: 1fr 70px 90px; gap: 8px; }
  .ao-btn-row { flex-direction: column; }
  .ao-btn-save, .ao-btn-cancel { width: 100%; text-align: center; }
}
`;

function injectStyles() {
  if (document.getElementById('ao-edit-styles')) return;
  const tag = document.createElement('style');
  tag.id = 'ao-edit-styles';
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Component ──────────────────────────────────────────────
const EditOrders = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const token    = localStorage.getItem('token');

  const [form, setForm] = useState({
    customer_id: '',
    status: 'pending',
    products: [{ product_id: '', quantity: 1, price: 0, reason: '' }],
  });
  const [customers, setCustomers]       = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState('');

  useEffect(() => { injectStyles(); }, []);

  // Fetch customers, products list, existing order in parallel
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    const fetchAll = async () => {
      setLoading(true);
      try {
        const [custRes, prodRes, orderRes] = await Promise.all([
          api.get('/admin/customers', { headers }),
          api.get('/admin/products',  { headers }),
          api.get(`/admin/orders/${id}`, { headers }),
        ]);

        setCustomers(custRes.data.data || []);
        setProductsList(prodRes.data.data || []);

        const order = orderRes.data;
        setForm({
          customer_id: order.customer_id || order.customer?.id || '',
          status:      order.status || 'pending',
          products: (order.details || []).map(d => ({
            product_id: d.product_id || '',
            quantity:   d.quantity   || 1,
            price:      d.price      || 0,
            reason:     d.reason     || '',
          })),
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load order data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id, token]);

  const handleChange = (e) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleProductChange = (index, e) => {
    const updated = [...form.products];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setForm(p => ({ ...p, products: updated }));
  };

  const addProduct = () =>
    setForm(p => ({
      ...p,
      products: [...p.products, { product_id: '', quantity: 1, price: 0, reason: '' }],
    }));

  const removeProduct = (index) => {
    if (form.products.length === 1) return;
    setForm(p => ({ ...p, products: p.products.filter((_, i) => i !== index) }));
  };

  // Estimated total
  const total = form.products.reduce(
    (sum, p) => sum + (Number(p.price) || 0) * (Number(p.quantity) || 0), 0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.post(`/admin/orders/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard/admin/orders');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update order.');
    } finally {
      setSaving(false);
    }
  };

  // ── Skeleton ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="ao-page">
        <div className="ao-card">
          <div className="ao-card-header" style={{ background: '#f8fafc' }}>
            <div className="ao-skeleton" style={{ width: 130, height: 18 }} />
          </div>
          <div className="ao-card-body">
            {[1, 2, 3].map(k => (
              <div key={k} className="ao-form-group">
                <div className="ao-skeleton" style={{ width: 90, height: 13, marginBottom: 7 }} />
                <div className="ao-skeleton" style={{ height: 42 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="ao-page">

      {/* Breadcrumb */}
      <div className="ao-bc">
        <span className="ao-bc-link" onClick={() => navigate('/dashboard/admin/orders')}>Orders</span>
        <span className="ao-bc-sep">/</span>
        <span className="ao-bc-cur">Edit Order #{id}</span>
      </div>

      <div className="ao-card">

        {/* Header */}
        <div className="ao-card-header">
          <div>
            <h2 className="ao-card-title">Edit Order</h2>
            <p className="ao-card-sub">Update order details below</p>
          </div>
          <span className="ao-id-badge">#{id}</span>
        </div>

        {/* Body */}
        <div className="ao-card-body">

          {error && <div className="ao-alert-err"><span>⚠</span>{error}</div>}

          <form onSubmit={handleSubmit}>

            {/* Customer */}
            <div className="ao-form-group">
              <label className="ao-label">
                Customer <span className="ao-req">*</span>
              </label>
              <select
                name="customer_id"
                className="ao-select"
                value={form.customer_id}
                onChange={handleChange}
                required
              >
                <option value="">— Select customer —</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="ao-form-group">
              <label className="ao-label">Status</label>
              <select
                name="status"
                className="ao-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Products section */}
            <div className="ao-section-title">
              Products ({form.products.length})
            </div>

            {form.products.map((p, i) => (
              <div key={i} className="ao-product-row">
                <span className="ao-product-index">Item {i + 1}</span>

                {/* Row 1: product select, qty, price */}
                <div className="ao-product-grid">
                  <select
                    name="product_id"
                    className="ao-input-sm"
                    value={p.product_id}
                    onChange={e => handleProductChange(i, e)}
                    required
                  >
                    <option value="">— Select product —</option>
                    {productsList.map(prod => (
                      <option key={prod.id} value={prod.id}>{prod.name}</option>
                    ))}
                  </select>

                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    className="ao-input-sm"
                    placeholder="Qty"
                    value={p.quantity}
                    onChange={e => handleProductChange(i, e)}
                    required
                  />

                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    className="ao-input-sm"
                    placeholder="Price"
                    value={p.price}
                    onChange={e => handleProductChange(i, e)}
                    required
                  />
                </div>

                {/* Row 2: reason + remove */}
                <div className="ao-product-grid-2">
                  <input
                    name="reason"
                    type="text"
                    className="ao-input-sm"
                    placeholder="Reason (optional)"
                    value={p.reason}
                    onChange={e => handleProductChange(i, e)}
                  />
                  <button
                    type="button"
                    className="ao-btn-remove"
                    onClick={() => removeProduct(i)}
                    disabled={form.products.length === 1}
                    title="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            <button type="button" className="ao-btn-add-product" onClick={addProduct}>
              + Add Product
            </button>

            {/* Estimated total */}
            {total > 0 && (
              <div className="ao-total-box">
                <span className="ao-total-label">Estimated Total</span>
                <span className="ao-total-value">
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}

            <hr className="ao-divider" />

            {/* Buttons */}
            <div className="ao-btn-row">
              <button type="submit" className="ao-btn-save" disabled={saving}>
                {saving ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 14, height: 14,
                      border: '2px solid rgba(255,255,255,.4)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'ao-spin .7s linear infinite',
                    }} />
                    Saving…
                  </span>
                ) : 'Update Order'}
              </button>

              <button
                type="button"
                className="ao-btn-cancel"
                onClick={() => navigate('/dashboard/admin/orders')}
                disabled={saving}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrders;
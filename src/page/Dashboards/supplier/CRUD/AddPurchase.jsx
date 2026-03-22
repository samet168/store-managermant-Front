import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../services/api';

/* ── CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.ap-page {
  padding: 32px 36px;
  min-height: 100vh;
  background: #f1f5f9;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Breadcrumb */
.ap-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 20px; }
.ap-bc-link { font-size: 13px; color: #6366f1; cursor: pointer; font-weight: 600; }
.ap-bc-link:hover { text-decoration: underline; }
.ap-bc-sep { color: #cbd5e1; font-size: 13px; }
.ap-bc-cur { font-size: 13px; color: #94a3b8; }

/* Header */
.ap-header { margin-bottom: 28px; }
.ap-title { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -.5px; margin: 0; }
.ap-sub   { font-size: 13px; color: #94a3b8; margin-top: 4px; font-weight: 500; }

/* Layout */
.ap-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 20px;
  align-items: start;
}

/* Card */
.ap-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 16px rgba(0,0,0,.07);
  overflow: hidden;
}
.ap-card-head {
  padding: 18px 24px;
  border-bottom: 1.5px solid #f3f4f6;
  display: flex; align-items: center; gap: 10px;
  background: #fafafa;
}
.ap-card-head-icon {
  width: 34px; height: 34px; border-radius: 9px;
  background: #eef2ff; color: #6366f1;
  display: flex; align-items: center; justify-content: center;
}
.ap-card-head-title { font-size: 14px; font-weight: 700; color: #0f172a; }
.ap-card-body { padding: 24px; }

/* Form fields */
.ap-field { margin-bottom: 18px; }
.ap-field:last-child { margin-bottom: 0; }
.ap-label {
  display: block;
  font-size: 12px; font-weight: 700;
  color: #64748b; text-transform: uppercase;
  letter-spacing: .7px; margin-bottom: 7px;
}
.ap-req { color: #ef4444; margin-left: 2px; }
.ap-input, .ap-select {
  width: 100%; height: 44px;
  padding: 0 14px;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-family: inherit; font-size: 14px; color: #0f172a;
  background: #fff; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.ap-input:focus, .ap-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,.1);
}
.ap-input::placeholder { color: #cbd5e1; }
.ap-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer; }

/* Row */
.ap-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* ── Products Section ── */
.ap-prod-header {
  display: flex; align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.ap-prod-title { font-size: 13px; font-weight: 700; color: #374151; }
.ap-btn-add-prod {
  display: inline-flex; align-items: center; gap: 6px;
  height: 34px; padding: 0 14px;
  background: #eef2ff; color: #6366f1;
  border: 1px solid #c7d2fe; border-radius: 9px;
  font-family: inherit; font-size: 12.5px; font-weight: 700;
  cursor: pointer; transition: background .12s;
}
.ap-btn-add-prod:hover { background: #e0e7ff; }

/* Product row */
.ap-prod-row {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
  position: relative;
}
.ap-prod-row:last-child { margin-bottom: 0; }
.ap-prod-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 10px;
  align-items: end;
}
.ap-prod-sub {
  font-size: 11px; font-weight: 600; color: #94a3b8;
  text-transform: uppercase; letter-spacing: .6px;
  margin-bottom: 5px;
}
.ap-prod-input {
  width: 100%; height: 38px; padding: 0 12px;
  border: 1.5px solid #e2e8f0; border-radius: 9px;
  font-family: inherit; font-size: 13.5px; color: #0f172a;
  background: #fff; outline: none;
  transition: border-color .15s;
}
.ap-prod-input:focus { border-color: #6366f1; }
.ap-prod-select {
  width: 100%; height: 38px; padding: 0 30px 0 12px;
  border: 1.5px solid #e2e8f0; border-radius: 9px;
  font-family: inherit; font-size: 13.5px; color: #0f172a;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 10px center;
  appearance: none; outline: none;
  transition: border-color .15s; cursor: pointer;
}
.ap-prod-select:focus { border-color: #6366f1; }
.ap-btn-remove {
  width: 34px; height: 34px;
  background: #fff1f2; color: #e11d48;
  border: 1px solid #fecdd3; border-radius: 8px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background .12s; flex-shrink: 0;
  font-size: 16px;
}
.ap-btn-remove:hover { background: #ffe4e6; }

/* Subtotal */
.ap-prod-subtotal {
  font-size: 12px; color: #64748b; font-weight: 500;
  margin-top: 8px; text-align: right;
}
.ap-prod-subtotal b { color: #0f172a; font-size: 13px; }

/* Empty products */
.ap-prod-empty {
  text-align: center; padding: 32px;
  border: 2px dashed #e2e8f0; border-radius: 12px;
  color: #94a3b8; font-size: 13.5px;
}
.ap-prod-empty-icon { font-size: 32px; margin-bottom: 8px; }

/* ── Summary Card ── */
.ap-summary-row {
  display: flex; justify-content: space-between;
  align-items: center; padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13.5px;
}
.ap-summary-row:last-of-type { border-bottom: none; }
.ap-summary-label { color: #64748b; font-weight: 500; }
.ap-summary-val   { color: #0f172a; font-weight: 600; }
.ap-total-row {
  display: flex; justify-content: space-between;
  align-items: center; padding: 14px 0 0;
  border-top: 2px solid #e2e8f0; margin-top: 4px;
}
.ap-total-label { font-size: 14px; font-weight: 700; color: #0f172a; }
.ap-total-val   { font-size: 22px; font-weight: 800; color: #6366f1; }

/* Error */
.ap-error {
  background: #fef2f2; color: #dc2626;
  border: 1px solid #fecaca; border-radius: 10px;
  padding: 12px 16px; font-size: 13.5px; font-weight: 500;
  margin-bottom: 16px;
}

/* Actions */
.ap-actions { display: flex; gap: 10px; margin-top: 20px; }
.ap-btn-cancel {
  flex: 1; height: 46px;
  background: #fff; color: #374151;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all .12s;
}
.ap-btn-cancel:hover { border-color: #94a3b8; }
.ap-btn-submit {
  flex: 2; height: 46px;
  background: #6366f1; color: #fff;
  border: none; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 700;
  cursor: pointer; transition: background .15s, transform .1s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.ap-btn-submit:hover:not(:disabled) { background: #4f46e5; transform: translateY(-1px); }
.ap-btn-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }

@media (max-width: 900px) {
  .ap-layout { grid-template-columns: 1fr; }
  .ap-page { padding: 16px 14px; }
  .ap-prod-grid { grid-template-columns: 1fr 1fr; }
  .ap-prod-grid > :first-child { grid-column: 1 / -1; }
}
`;

function injectCSS() {
  if (document.getElementById('ap-css')) return;
  const el = document.createElement('style');
  el.id = 'ap-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
export default function AddPurchase() {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const [form, setForm] = useState({
    supplier_id:   '',
    purchase_date: new Date().toISOString().slice(0, 10),
  });

  const [items, setItems] = useState([
    { id: Date.now(), product_id: '', quantity: 1, price: '' },
  ]);

  useEffect(() => { injectCSS(); }, []);

  /* ── Load suppliers & products ── */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // fetch suppliers
    api.get('/supplier/suppliers', { headers })
      .then(r => setSuppliers(r.data?.data ?? r.data ?? []))
      .catch(console.error);

    // fetch products
    api.get('/supplier/products', { headers })
      .then(r => setProducts(r.data?.data ?? r.data ?? []))
      .catch(console.error);
  }, []);

  /* ── Form handlers ── */
  const handleForm = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleItem = (id, field, value) =>
    setItems(prev => prev.map(it =>
      it.id === id ? { ...it, [field]: value } : it
    ));

  const addItem = () =>
    setItems(prev => [...prev, { id: Date.now(), product_id: '', quantity: 1, price: '' }]);

  const removeItem = (id) =>
    setItems(prev => prev.filter(it => it.id !== id));

  /* Auto-fill price when product selected */
  const handleProductSelect = (id, productId) => {
    const product = products.find(p => String(p.id) === String(productId));
    setItems(prev => prev.map(it =>
      it.id === id
        ? { ...it, product_id: productId, price: product?.price ?? it.price }
        : it
    ));
  };

  /* ── Total ── */
  const total = items.reduce((sum, it) => {
    const qty = Number(it.quantity) || 0;
    const prc = Number(it.price)    || 0;
    return sum + qty * prc;
  }, 0);

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.supplier_id) return setError('Please select a supplier.');
    if (items.some(it => !it.product_id)) return setError('Please select a product for each row.');
    if (items.some(it => !it.price || Number(it.price) <= 0)) return setError('Please enter a valid price for each product.');

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await api.post('/supplier/purchases', {
        supplier_id:   form.supplier_id,
        purchase_date: form.purchase_date,
        products: items.map(it => ({
          product_id: it.product_id,
          quantity:   Number(it.quantity),
          price:      Number(it.price),
        })),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard/supplier/purchases');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      if (typeof msg === 'object') {
        setError(Object.values(msg).flat()[0]);
      } else {
        setError(msg || 'Failed to create purchase.');
      }
    } finally {
      setLoading(false);
    }
  };

  /* ══ Render ══ */
  return (
    <div className="ap-page">

      {/* Breadcrumb */}
      <div className="ap-bc">
        <span className="ap-bc-link" onClick={() => navigate('/dashboard/supplier/purchases')}>
          Purchases
        </span>
        <span className="ap-bc-sep">/</span>
        <span className="ap-bc-cur">New Purchase</span>
      </div>

      {/* Header */}
      <div className="ap-header">
        <h1 className="ap-title">New Purchase</h1>
        <div className="ap-sub">Fill in the details to create a new purchase order</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="ap-layout">

          {/* ── Left column ── */}
          <div>

            {/* Purchase Info */}
            <div className="ap-card" style={{ marginBottom: 20 }}>
              <div className="ap-card-head">
                <div className="ap-card-head-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="ap-card-head-title">Purchase Information</div>
              </div>
              <div className="ap-card-body">
                {error && <div className="ap-error">{error}</div>}
                <div className="ap-row">
                  <div className="ap-field">
                    <label className="ap-label">Supplier <span className="ap-req">*</span></label>
                    <select
                      className="ap-select"
                      name="supplier_id"
                      value={form.supplier_id}
                      onChange={handleForm}
                      required
                    >
                      <option value="">— Select supplier —</option>
                      {suppliers.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="ap-field">
                    <label className="ap-label">Purchase Date <span className="ap-req">*</span></label>
                    <input
                      className="ap-input"
                      type="date"
                      name="purchase_date"
                      value={form.purchase_date}
                      onChange={handleForm}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="ap-card">
              <div className="ap-card-head">
                <div className="ap-card-head-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </div>
                <div className="ap-card-head-title">Products</div>
              </div>
              <div className="ap-card-body">
                <div className="ap-prod-header">
                  <div className="ap-prod-title">{items.length} product{items.length !== 1 ? 's' : ''} added</div>
                  <button type="button" className="ap-btn-add-prod" onClick={addItem}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5"  y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Product
                  </button>
                </div>

                {items.length === 0 ? (
                  <div className="ap-prod-empty">
                    <div className="ap-prod-empty-icon">📦</div>
                    No products added yet. Click "Add Product" to start.
                  </div>
                ) : (
                  items.map((it) => {
                    const subtotal = (Number(it.quantity) || 0) * (Number(it.price) || 0);
                    return (
                      <div className="ap-prod-row" key={it.id}>
                        <div className="ap-prod-grid">
                          {/* Product */}
                          <div>
                            <div className="ap-prod-sub">Product</div>
                            <select
                              className="ap-prod-select"
                              value={it.product_id}
                              onChange={e => handleProductSelect(it.id, e.target.value)}
                              required
                            >
                              <option value="">— Select —</option>
                              {products.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                              ))}
                            </select>
                          </div>
                          {/* Quantity */}
                          <div>
                            <div className="ap-prod-sub">Qty</div>
                            <input
                              className="ap-prod-input"
                              type="number" min="1"
                              value={it.quantity}
                              onChange={e => handleItem(it.id, 'quantity', e.target.value)}
                              required
                            />
                          </div>
                          {/* Price */}
                          <div>
                            <div className="ap-prod-sub">Price ($)</div>
                            <input
                              className="ap-prod-input"
                              type="number" min="0" step="0.01"
                              placeholder="0.00"
                              value={it.price}
                              onChange={e => handleItem(it.id, 'price', e.target.value)}
                              required
                            />
                          </div>
                          {/* Remove */}
                          <div>
                            <div className="ap-prod-sub" style={{ visibility: 'hidden' }}>.</div>
                            <button
                              type="button"
                              className="ap-btn-remove"
                              onClick={() => removeItem(it.id)}
                              disabled={items.length === 1}
                              title="Remove"
                            >×</button>
                          </div>
                        </div>
                        {/* Subtotal */}
                        <div className="ap-prod-subtotal">
                          Subtotal: <b>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* ── Right column — Summary ── */}
          <div>
            <div className="ap-card">
              <div className="ap-card-head">
                <div className="ap-card-head-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6"  x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </div>
                <div className="ap-card-head-title">Order Summary</div>
              </div>
              <div className="ap-card-body">

                <div className="ap-summary-row">
                  <span className="ap-summary-label">Supplier</span>
                  <span className="ap-summary-val">
                    {suppliers.find(s => String(s.id) === String(form.supplier_id))?.name || '—'}
                  </span>
                </div>
                <div className="ap-summary-row">
                  <span className="ap-summary-label">Date</span>
                  <span className="ap-summary-val">
                    {form.purchase_date
                      ? new Date(form.purchase_date).toLocaleDateString()
                      : '—'}
                  </span>
                </div>
                <div className="ap-summary-row">
                  <span className="ap-summary-label">Products</span>
                  <span className="ap-summary-val">{items.length} item{items.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Per-item breakdown */}
                {items.filter(it => it.product_id).map(it => {
                  const prod = products.find(p => String(p.id) === String(it.product_id));
                  const subtotal = (Number(it.quantity) || 0) * (Number(it.price) || 0);
                  return (
                    <div key={it.id} style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: 12.5, color: '#64748b', padding: '4px 0',
                    }}>
                      <span>{prod?.name || '—'} × {it.quantity}</span>
                      <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  );
                })}

                <div className="ap-total-row">
                  <span className="ap-total-label">Total</span>
                  <span className="ap-total-val">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Actions */}
                <div className="ap-actions">
                  <button
                    type="button"
                    className="ap-btn-cancel"
                    onClick={() => navigate('/dashboard/supplier/purchases')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ap-btn-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5"
                          style={{ animation: 'spin 1s linear infinite' }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                        Saving…
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Create Purchase
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </form>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
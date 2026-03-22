import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

// ── CSS ────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.ao-page {
  padding: 28px 32px;
  background: #f4f6f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Breadcrumb */
.ao-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
}
.ao-breadcrumb-link {
  font-size: 12.5px;
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;
}
.ao-breadcrumb-link:hover { text-decoration: underline; }
.ao-breadcrumb-sep { font-size: 12px; color: #cbd5e1; }
.ao-breadcrumb-cur { font-size: 12.5px; color: #94a3b8; }

/* Card */
.ao-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
  max-width: 680px;
}

/* Card header */
.ao-card-header {
  padding: 22px 28px 18px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}
.ao-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.ao-card-sub {
  font-size: 12.5px;
  color: #94a3b8;
  margin-top: 4px;
}

/* Card body */
.ao-card-body { padding: 24px 28px 28px; }

/* Form group */
.ao-form-group { margin-bottom: 18px; }
.ao-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}
.ao-req { color: #ef4444; margin-left: 2px; }

/* Inputs */
.ao-input, .ao-select {
  width: 100%;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  color: #0f172a;
  outline: none;
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
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 0 14px;
}
.ao-section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

/* Product row */
.ao-product-row {
  display: grid;
  grid-template-columns: 1fr 80px 100px 36px;
  gap: 10px;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 10px;
}
.ao-product-index {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: .6px;
  grid-column: 1 / -1;
  margin-bottom: 2px;
}
.ao-input-sm {
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 7px;
  padding: 8px 10px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #0f172a;
  outline: none;
  width: 100%;
  transition: border-color .15s, box-shadow .15s;
}
.ao-input-sm::placeholder { color: #94a3b8; }
.ao-input-sm:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.12);
}

/* Remove button */
.ao-btn-remove {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 7px;
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: all .15s;
  flex-shrink: 0;
}
.ao-btn-remove:hover { background: #dc2626; color: #fff; }

/* Add product button */
.ao-btn-add-product {
  background: #f0fdf4;
  color: #16a34a;
  border: 1.5px dashed #86efac;
  border-radius: 9px;
  padding: 10px 18px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all .15s;
  margin-top: 4px;
}
.ao-btn-add-product:hover {
  background: #dcfce7;
  border-color: #4ade80;
}

/* Alert */
.ao-alert-err {
  background: #fef2f2;
  border: 1.5px solid #fca5a5;
  border-radius: 8px;
  color: #dc2626;
  font-size: 13px;
  padding: 10px 14px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Divider */
.ao-divider { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }

/* Buttons row */
.ao-btn-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

.ao-btn-save {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s, transform .12s;
  box-shadow: 0 2px 8px rgba(59,130,246,.28);
}
.ao-btn-save:not(:disabled):hover { background: #2563eb; transform: translateY(-1px); }
.ao-btn-save:disabled { background: #93c5fd; cursor: not-allowed; }

.ao-btn-cancel {
  background: #fff;
  color: #64748b;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all .15s;
}
.ao-btn-cancel:hover { border-color: #cbd5e1; color: #374151; background: #f8fafc; }

/* Responsive */
@media (max-width: 600px) {
  .ao-page { padding: 18px 14px; }
  .ao-card-header, .ao-card-body { padding: 18px 18px; }
  .ao-product-row { grid-template-columns: 1fr 70px 90px 36px; gap: 8px; }
  .ao-btn-row { flex-direction: column; }
  .ao-btn-save, .ao-btn-cancel { width: 100%; text-align: center; }
}
`;
function injectStyles() {
  if (document.getElementById('ao-styles')) return;
  const tag = document.createElement('style');
  tag.id = 'ao-styles';
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

const AddOrders = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [customers, setCustomers] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [form, setForm] = useState({
    user_id: '',
    status: 'pending',
    products: [{ product_id: '', quantity: 1, price: 0 }],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Inject styles
  useEffect(() => { injectStyles(); }, []);

  // Fetch customers & products
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } });
        setCustomers(res.data.data || []);
      } catch (err) { console.error(err); }
    };

    const fetchProducts = async () => {
      try {
        const res = await api.get('/admin/products', { headers: { Authorization: `Bearer ${token}` } });
        setProductsList(res.data.data || []);
      } catch (err) { console.error(err); }
    };

    fetchCustomers();
    fetchProducts();
  }, [token]);

  // Handle form changes
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'user_id') value = Number(value); // ensure number
    setForm((p) => ({ ...p, [e.target.name]: value }));
  };

  const handleProductChange = (index, e) => {
    let value = e.target.value;
    if (['product_id', 'quantity', 'price'].includes(e.target.name)) value = Number(value);
    const updated = [...form.products];
    updated[index] = { ...updated[index], [e.target.name]: value };
    setForm((p) => ({ ...p, products: updated }));
  };

  const addProduct = () => setForm((p) => ({
    ...p, 
    products: [...p.products, { product_id: '', quantity: 1, price: 0 }]
  }));

  const removeProduct = (index) => {
    if (form.products.length === 1) return;
    setForm((p) => ({ ...p, products: p.products.filter((_, i) => i !== index) }));
  };

  // Total preview
  const total = form.products.reduce(
    (sum, p) => sum + (Number(p.price) || 0) * (Number(p.quantity) || 0),
    0
  );

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    // Validation: ensure customer selected
    if (!form.user_id) {
      setError('Please select a customer!');
      setSaving(false);
      return;
    }

    // Validate products
    for (let i = 0; i < form.products.length; i++) {
      const p = form.products[i];
      if (!p.product_id || p.quantity <= 0 || p.price < 0) {
        setError(`Product ${i + 1} is invalid`);
        setSaving(false);
        return;
      }
    }

    try {
      console.log('Submitting order:', form); // debug
      await api.post('/admin/orders', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      navigate('/dashboard/admin/orders');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setSaving(false);
    }
    console.log('Submitting order:', form);
  };

  return (
    <div className="ao-page">
      {/* Breadcrumb */}
      <div className="ao-breadcrumb">
        <span className="ao-breadcrumb-link" onClick={() => navigate('/dashboard/admin/orders')}>
          Orders
        </span>
        <span className="ao-breadcrumb-sep">/</span>
        <span className="ao-breadcrumb-cur">Add Order</span>
      </div>

      <div className="ao-card">
        <div className="ao-card-header">
          <h2 className="ao-card-title">Add New Order</h2>
          <p className="ao-card-sub">Fill in the details to create a new order</p>
        </div>

        <div className="ao-card-body">
          {error && <div className="ao-alert-err"><span>⚠</span>{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Customer */}
            <div className="ao-form-group">
              <label className="ao-label">Customer <span className="ao-req">*</span></label>
              <select
                className="ao-select"
                name="user_id"
                value={form.user_id}
                onChange={handleChange}
                required
              >
                <option value="">Select customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="ao-form-group">
              <label className="ao-label">Status</label>
              <select className="ao-select" name="status" value={form.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Products */}
            <div className="ao-section-title">Products ({form.products.length})</div>
            {form.products.map((p, i) => (
              <div key={i} className="ao-product-row">
                <span className="ao-product-index">Item {i + 1}</span>
                <select
                  className="ao-input-sm"
                  name="product_id"
                  value={p.product_id}
                  onChange={(e) => handleProductChange(i, e)}
                  required
                >
                  <option value="">Select product</option>
                  {productsList.map(prod => (
                    <option key={prod.id} value={prod.id}>{prod.name}</option>
                  ))}
                </select>
                <input
                  className="ao-input-sm"
                  name="quantity"
                  type="number"
                  min="1"
                  value={p.quantity}
                  onChange={(e) => handleProductChange(i, e)}
                  required
                />
                <input
                  className="ao-input-sm"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={p.price}
                  onChange={(e) => handleProductChange(i, e)}
                  required
                />
                <button type="button" className="ao-btn-remove" onClick={() => removeProduct(i)} disabled={form.products.length === 1}>×</button>
              </div>
            ))}

            <button type="button" className="ao-btn-add-product" onClick={addProduct}>+ Add Product</button>

            {/* Total preview */}
            {total > 0 && (
              <div style={{ marginTop: 14, padding: '10px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>Estimated Total</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#1d4ed8' }}>${total.toFixed(2)}</span>
              </div>
            )}

            <hr className="ao-divider" />

            {/* Buttons */}
            <div className="ao-btn-row">
              <button type="submit" className="ao-btn-save" disabled={saving}>
                {saving ? 'Saving…' : 'Save Order'}
              </button>
              <button type="button" className="ao-btn-cancel" onClick={() => navigate('/dashboard/admin/orders')} disabled={saving}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrders;
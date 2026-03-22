import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../services/api";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.ep-page {
  padding: 32px 36px;
  min-height: 100vh;
  background: #f1f5f9;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.ep-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 20px; }
.ep-bc-link { font-size: 13px; color: #6366f1; cursor: pointer; font-weight: 600; }
.ep-bc-link:hover { text-decoration: underline; }
.ep-bc-sep { color: #cbd5e1; font-size: 13px; }
.ep-bc-cur { font-size: 13px; color: #94a3b8; }
.ep-header { margin-bottom: 28px; }
.ep-title { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -.5px; margin: 0; }
.ep-sub   { font-size: 13px; color: #94a3b8; margin-top: 4px; font-weight: 500; }

.ep-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
  align-items: start;
}
.ep-card {
  background: #fff; border-radius: 20px;
  box-shadow: 0 2px 16px rgba(0,0,0,.07); overflow: hidden;
}
.ep-card-head {
  padding: 18px 24px; border-bottom: 1.5px solid #f3f4f6;
  display: flex; align-items: center; gap: 10px; background: #fafafa;
}
.ep-card-head-icon {
  width: 34px; height: 34px; border-radius: 9px;
  background: #eef2ff; color: #6366f1;
  display: flex; align-items: center; justify-content: center;
}
.ep-card-head-title { font-size: 14px; font-weight: 700; color: #0f172a; }
.ep-card-body { padding: 24px; }

/* Form */
.ep-field { margin-bottom: 18px; }
.ep-field:last-child { margin-bottom: 0; }
.ep-label {
  display: block; font-size: 12px; font-weight: 700;
  color: #64748b; text-transform: uppercase;
  letter-spacing: .7px; margin-bottom: 7px;
}
.ep-input, .ep-textarea, .ep-select {
  width: 100%; padding: 0 14px;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-family: inherit; font-size: 14px; color: #0f172a;
  background: #fff; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.ep-input  { height: 44px; }
.ep-select { height: 44px; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 14px center;
  padding-right: 36px; cursor: pointer;
}
.ep-textarea { height: 100px; padding: 12px 14px; resize: vertical; }
.ep-input:focus, .ep-textarea:focus, .ep-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,.1);
}
.ep-input::placeholder, .ep-textarea::placeholder { color: #cbd5e1; }
.ep-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* Image preview */
.ep-img-wrap {
  width: 100%; height: 200px; border-radius: 14px;
  background: #f8fafc; border: 2px dashed #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; cursor: pointer; transition: border-color .15s;
  margin-bottom: 10px; position: relative;
}
.ep-img-wrap:hover { border-color: #a5b4fc; }
.ep-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.ep-img-placeholder { text-align: center; color: #94a3b8; }
.ep-img-placeholder-icon { font-size: 40px; margin-bottom: 8px; }
.ep-img-placeholder-text { font-size: 13px; font-weight: 500; }
.ep-img-overlay {
  position: absolute; inset: 0;
  background: rgba(99,102,241,.7); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 13.5px; font-weight: 700; opacity: 0;
  transition: opacity .15s;
}
.ep-img-wrap:hover .ep-img-overlay { opacity: 1; }

/* Stock badge */
.ep-stock {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 14px; border-radius: 20px;
  font-size: 13px; font-weight: 600;
}
.ep-stock.in  { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.ep-stock.out { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

/* Info rows (right panel) */
.ep-info-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13.5px;
}
.ep-info-row:last-child { border-bottom: none; }
.ep-info-label { color: #64748b; font-weight: 500; }
.ep-info-val   { color: #0f172a; font-weight: 600; }
.ep-price-big  { font-size: 28px; font-weight: 800; color: #6366f1; margin: 12px 0; }

/* Error / Success */
.ep-error {
  background: #fef2f2; color: #dc2626;
  border: 1px solid #fecaca; border-radius: 10px;
  padding: 12px 16px; font-size: 13.5px; font-weight: 500;
  margin-bottom: 16px;
}
.ep-success {
  background: #f0fdf4; color: #16a34a;
  border: 1px solid #bbf7d0; border-radius: 10px;
  padding: 12px 16px; font-size: 13.5px; font-weight: 500;
  margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
}

/* Actions */
.ep-actions { display: flex; gap: 10px; margin-top: 20px; }
.ep-btn-cancel {
  flex: 1; height: 46px; background: #fff; color: #374151;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all .12s;
}
.ep-btn-cancel:hover { border-color: #94a3b8; }
.ep-btn-order {
  flex: 2; height: 46px; background: #6366f1; color: #fff;
  border: none; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: background .15s, transform .1s;
}
.ep-btn-order:hover:not(:disabled) { background: #4f46e5; transform: translateY(-1px); }
.ep-btn-order:disabled { opacity: .6; cursor: not-allowed; transform: none; }

/* Skeleton */
@keyframes ep-sk { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.ep-sk {
  background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size: 200% 100%; animation: ep-sk 1.5s infinite;
  border-radius: 8px; display: block;
}

@media (max-width: 900px) {
  .ep-layout { grid-template-columns: 1fr; }
  .ep-page { padding: 16px 14px; }
  .ep-row { grid-template-columns: 1fr; }
}
`;

function injectCSS() {
  if (document.getElementById('ep-css')) return;
  const el = document.createElement('style');
  el.id = 'ep-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

export default function EditProductCustomer() {
  const navigate = useNavigate();
  const { id }   = useParams();

  const [product,  setProduct]  = useState(null);
  const [form,     setForm]     = useState({
    name: '', price: '', quantity: '', description: '', status: 'active',
  });
  const [image,    setImage]    = useState(null);
  const [preview,  setPreview]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');

  const fileRef = React.useRef(null);

  useEffect(() => { injectCSS(); }, []);

  /* ── Load product ── */
  useEffect(() => {
    const fetchProduct = async () => {
      setFetching(true);
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/customer/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data?.data ?? res.data;
        setProduct(p);
        setForm({
          name:        p.name        ?? '',
          price:       p.price       ?? '',
          quantity:    p.quantity    ?? '',
          description: p.description ?? '',
          status:      p.status      ?? 'active',
        });
        if (p.image) setPreview(p.image);
      } catch (err) {
        console.error(err);
        setError('Failed to load product.');
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const data  = new FormData();
      data.append('name',        form.name);
      data.append('price',       form.price);
      data.append('quantity',    form.quantity);
      data.append('description', form.description);
      data.append('status',      form.status);
      data.append('_method',     'Post');
      if (image) data.append('image', image);

      await api.post(`/customer/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Product updated successfully!');
      setTimeout(() => navigate('/dashboard/customer/products'), 1200);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      setError(
        typeof msg === 'object'
          ? Object.values(msg).flat()[0]
          : msg || 'Failed to update product.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* ── Skeleton ── */
  if (fetching) {
    return (
      <div className="ep-page">
        <div className="ep-bc">
          <div className="ep-sk" style={{ width: 70, height: 13 }} />
          <span className="ep-bc-sep">/</span>
          <div className="ep-sk" style={{ width: 110, height: 13 }} />
        </div>
        <div className="ep-layout">
          <div className="ep-card">
            <div className="ep-card-head" style={{ background: '#fafafa' }}>
              <div className="ep-sk" style={{ width: 140, height: 14 }} />
            </div>
            <div className="ep-card-body">
              <div className="ep-sk" style={{ height: 200, marginBottom: 16 }} />
              {[1,2,3].map(k => (
                <div key={k} style={{ marginBottom: 16 }}>
                  <div className="ep-sk" style={{ width: 80, height: 11, marginBottom: 8 }} />
                  <div className="ep-sk" style={{ width: '100%', height: 44 }} />
                </div>
              ))}
            </div>
          </div>
          <div className="ep-card">
            <div className="ep-card-head" style={{ background: '#fafafa' }}>
              <div className="ep-sk" style={{ width: 100, height: 14 }} />
            </div>
            <div className="ep-card-body">
              {[1,2,3,4].map(k => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f1f5f9' }}>
                  <div className="ep-sk" style={{ width: 80, height: 13 }} />
                  <div className="ep-sk" style={{ width: 90, height: 13 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══ Render ══ */
  return (
    <div className="ep-page">

      {/* Breadcrumb */}
      <div className="ep-bc">
        <span className="ep-bc-link" onClick={() => navigate('/dashboard/customer/products')}>
          Products
        </span>
        <span className="ep-bc-sep">/</span>
        <span className="ep-bc-cur">Edit Product</span>
      </div>

      <div className="ep-header">
        <h1 className="ep-title">Edit Product</h1>
        <div className="ep-sub">Update product details for #{id}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="ep-layout">

          {/* ── Left — Form ── */}
          <div className="ep-card">
            <div className="ep-card-head">
              <div className="ep-card-head-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <div className="ep-card-head-title">Product Details</div>
            </div>
            <div className="ep-card-body">

              {error   && <div className="ep-error">{error}</div>}
              {success && <div className="ep-success">✅ {success}</div>}

              {/* Image */}
              <div className="ep-field">
                <label className="ep-label">Product Image</label>
                <div className="ep-img-wrap" onClick={() => fileRef.current?.click()}>
                  {preview ? (
                    <img src={preview} alt="product" />
                  ) : (
                    <div className="ep-img-placeholder">
                      <div className="ep-img-placeholder-icon">🖼️</div>
                      <div className="ep-img-placeholder-text">Click to upload image</div>
                    </div>
                  )}
                  <div className="ep-img-overlay">📷 Change Image</div>
                </div>
                <input ref={fileRef} type="file" accept="image/*"
                  style={{ display:'none' }}
                  onChange={e => handleImage(e.target.files[0])} />
              </div>

              {/* Name */}
              <div className="ep-field">
                <label className="ep-label">Product Name</label>
                <input className="ep-input" type="text" name="name"
                  placeholder="e.g. MG 7" value={form.name}
                  onChange={handleChange} required />
              </div>

              {/* Price & Quantity */}
              <div className="ep-row">
                <div className="ep-field">
                  <label className="ep-label">Price ($)</label>
                  <input className="ep-input" type="number" name="price"
                    min="0" step="0.01" placeholder="0.00"
                    value={form.price} onChange={handleChange} required />
                </div>
                <div className="ep-field">
                  <label className="ep-label">Quantity</label>
                  <input className="ep-input" type="number" name="quantity"
                    min="0" placeholder="0"
                    value={form.quantity} onChange={handleChange} required />
                </div>
              </div>

              {/* Status */}
              <div className="ep-field">
                <label className="ep-label">Status</label>
                <select className="ep-select" name="status"
                  value={form.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Description */}
              <div className="ep-field">
                <label className="ep-label">Description</label>
                <textarea className="ep-textarea" name="description"
                  placeholder="Product description…"
                  value={form.description} onChange={handleChange} />
              </div>

              {/* Actions */}
              <div className="ep-actions">
                <button type="button" className="ep-btn-cancel"
                  onClick={() => navigate('/dashboard/customer/products')}>
                  Cancel
                </button>
                <button type="submit" className="ep-btn-order" disabled={loading}>
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        style={{animation:'spin 1s linear infinite'}}>
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
                      Save Changes
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* ── Right — Info panel ── */}
          <div>
            <div className="ep-card">
              <div className="ep-card-head">
                <div className="ep-card-head-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div className="ep-card-head-title">Product Info</div>
              </div>
              <div className="ep-card-body">

                <div className="ep-price-big">
                  ${Number(form.price || 0).toLocaleString(undefined,{minimumFractionDigits:2})}
                </div>

                <div className="ep-info-row">
                  <span className="ep-info-label">Product ID</span>
                  <span className="ep-info-val" style={{ fontFamily:'monospace' }}>#{id}</span>
                </div>
                <div className="ep-info-row">
                  <span className="ep-info-label">Stock</span>
                  <span className="ep-info-val">
                    <span className={`ep-stock ${Number(form.quantity) > 0 ? 'in' : 'out'}`}>
                      {Number(form.quantity) > 0 ? `${form.quantity} in stock` : 'Out of stock'}
                    </span>
                  </span>
                </div>
                <div className="ep-info-row">
                  <span className="ep-info-label">Status</span>
                  <span className="ep-info-val" style={{
                    color: form.status === 'active' ? '#16a34a' : '#dc2626',
                    textTransform: 'capitalize',
                  }}>
                    {form.status}
                  </span>
                </div>
                <div className="ep-info-row">
                  <span className="ep-info-label">Category</span>
                  <span className="ep-info-val">{product?.category?.name || '—'}</span>
                </div>
                <div className="ep-info-row">
                  <span className="ep-info-label">Created</span>
                  <span className="ep-info-val" style={{ fontSize:12.5, color:'#64748b' }}>
                    {product?.created_at
                      ? new Date(product.created_at).toLocaleDateString()
                      : '—'}
                  </span>
                </div>

                {/* Quick order button */}
                <button
                  type="button"
                  style={{
                    width:'100%', height:44, marginTop:16,
                    background:'#f0fdf4', color:'#16a34a',
                    border:'1px solid #bbf7d0', borderRadius:12,
                    fontFamily:'inherit', fontSize:13.5, fontWeight:700,
                    cursor:'pointer', display:'flex', alignItems:'center',
                    justifyContent:'center', gap:6,
                  }}
                  onClick={() => navigate('/dashboard/customer/orders/add', {
                    state: { product: { id: Number(id), ...form } }
                  })}
                >
                  🛒 Order This Product
                </button>

              </div>
            </div>
          </div>

        </div>
      </form>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
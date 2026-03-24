// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import api from '../../services/api';

// /* ── Cart helpers ── */
// function getCart() {
//   try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
//   catch { return []; }
// }
// function clearCart() {
//   localStorage.setItem('cart', '[]');
//   window.dispatchEvent(new Event('storage'));
// }

// /* ── CSS ── */
// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

// *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// .ck-page {
//   min-height: 100vh;
//   background: #f8fafc;
//   font-family: 'DM Sans', sans-serif;
//   color: #0f172a;
// }

// /* ── Steps bar ── */
// .ck-steps {
//   background: #fff;
//   border-bottom: 1px solid #e2e8f0;
//   padding: 18px 0;
// }
// .ck-steps-inner {
//   max-width: 960px; margin: 0 auto; padding: 0 24px;
//   display: flex; align-items: center; gap: 0;
// }
// .ck-step {
//   display: flex; align-items: center; gap: 10px;
//   font-size: 13px; font-weight: 600; color: #94a3b8;
// }
// .ck-step.active { color: #6366f1; }
// .ck-step.done   { color: #16a34a; }
// .ck-step-num {
//   width: 28px; height: 28px; border-radius: 50%;
//   background: #f1f5f9; border: 2px solid #e2e8f0;
//   display: flex; align-items: center; justify-content: center;
//   font-size: 12px; font-weight: 800; flex-shrink: 0;
// }
// .ck-step.active .ck-step-num { background: #6366f1; border-color: #6366f1; color: #fff; }
// .ck-step.done   .ck-step-num { background: #16a34a; border-color: #16a34a; color: #fff; }
// .ck-step-line { flex: 1; height: 2px; background: #e2e8f0; margin: 0 12px; }
// .ck-step-line.done { background: #6366f1; }

// /* ── Layout ── */
// .ck-body {
//   max-width: 960px; margin: 0 auto; padding: 40px 24px;
//   display: grid; grid-template-columns: 1fr 360px;
//   gap: 24px; align-items: start;
// }

// /* ── Card ── */
// .ck-card {
//   background: #fff;
//   border-radius: 20px;
//   border: 1px solid #e2e8f0;
//   box-shadow: 0 2px 12px rgba(0,0,0,.05);
//   overflow: hidden;
// }
// .ck-card-head {
//   padding: 18px 24px;
//   border-bottom: 1px solid #f1f5f9;
//   background: #fafafa;
//   display: flex; align-items: center; gap: 10px;
// }
// .ck-card-head-icon {
//   width: 34px; height: 34px; border-radius: 10px;
//   background: #eef2ff; color: #6366f1;
//   display: flex; align-items: center; justify-content: center;
//   font-size: 16px; flex-shrink: 0;
// }
// .ck-card-title { font-size: 15px; font-weight: 700; color: #0f172a; }
// .ck-card-body  { padding: 24px; }

// /* ── Order items ── */
// .ck-item {
//   display: flex; align-items: center; gap: 14px;
//   padding: 14px 0; border-bottom: 1px solid #f8fafc;
// }
// .ck-item:last-child { border-bottom: none; padding-bottom: 0; }
// .ck-item-img {
//   width: 60px; height: 60px; border-radius: 12px;
//   background: #f1f5f9; border: 1px solid #e2e8f0;
//   overflow: hidden; flex-shrink: 0;
//   display: flex; align-items: center; justify-content: center;
//   font-size: 24px;
// }
// .ck-item-img img { width: 100%; height: 100%; object-fit: cover; }
// .ck-item-info { flex: 1; min-width: 0; }
// .ck-item-name  { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
// .ck-item-meta  { font-size: 12.5px; color: #94a3b8; }

// /* Qty controls */
// .ck-qty {
//   display: flex; align-items: center; gap: 8px; flex-shrink: 0;
// }
// .ck-qty-btn {
//   width: 30px; height: 30px;
//   background: #f1f5f9; border: 1px solid #e2e8f0;
//   border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 700;
//   display: flex; align-items: center; justify-content: center;
//   color: #374151; transition: all .12s;
// }
// .ck-qty-btn:hover:not(:disabled) { background: #eef2ff; border-color: #6366f1; color: #6366f1; }
// .ck-qty-btn:disabled { opacity: .3; cursor: not-allowed; }
// .ck-qty-num { font-size: 14px; font-weight: 700; min-width: 22px; text-align: center; }

// .ck-item-price { font-size: 15px; font-weight: 800; color: #6366f1; flex-shrink: 0; min-width: 70px; text-align: right; }

// .ck-rm {
//   width: 28px; height: 28px; flex-shrink: 0;
//   background: #fff1f2; border: 1px solid #fecdd3;
//   border-radius: 8px; cursor: pointer; font-size: 13px;
//   display: flex; align-items: center; justify-content: center;
//   color: #e11d48; transition: background .12s;
// }
// .ck-rm:hover { background: #ffe4e6; }

// /* ── Empty cart ── */
// .ck-empty {
//   text-align: center; padding: 60px 20px;
// }
// .ck-empty-icon  { font-size: 56px; margin-bottom: 14px; }
// .ck-empty-title { font-size: 18px; font-weight: 700; color: #374151; margin-bottom: 6px; }
// .ck-empty-desc  { font-size: 13.5px; color: #94a3b8; margin-bottom: 20px; }
// .ck-btn-back {
//   background: #6366f1; color: #fff; border: none;
//   border-radius: 12px; padding: 12px 28px;
//   font-family: inherit; font-size: 14px; font-weight: 700;
//   cursor: pointer; transition: background .15s;
// }
// .ck-btn-back:hover { background: #4f46e5; }

// /* ── Summary card (right) ── */
// .ck-sum-row {
//   display: flex; justify-content: space-between; align-items: center;
//   padding: 10px 0; border-bottom: 1px solid #f8fafc; font-size: 14px;
// }
// .ck-sum-row:last-of-type { border-bottom: none; }
// .ck-sum-label { color: #64748b; font-weight: 500; }
// .ck-sum-val   { color: #0f172a; font-weight: 700; }
// .ck-sum-total {
//   display: flex; justify-content: space-between; align-items: center;
//   padding: 16px 0 0; border-top: 2px solid #e2e8f0; margin-top: 8px;
// }
// .ck-sum-total-label { font-size: 15px; font-weight: 700; color: #0f172a; }
// .ck-sum-total-val   { font-size: 26px; font-weight: 800; color: #6366f1; font-family: 'Syne', sans-serif; }

// /* ── Error / Note ── */
// .ck-error {
//   background: #fef2f2; color: #dc2626;
//   border: 1px solid #fecaca; border-radius: 10px;
//   padding: 12px 16px; font-size: 13.5px; font-weight: 500;
//   margin-bottom: 16px;
// }
// .ck-note {
//   background: #fffbeb; color: #92400e;
//   border: 1px solid #fde68a; border-radius: 10px;
//   padding: 12px 16px; font-size: 13px;
//   margin-bottom: 16px; line-height: 1.5;
// }

// /* ── Buttons ── */
// .ck-btn-order {
//   width: 100%; height: 52px;
//   background: #6366f1; color: #fff;
//   border: none; border-radius: 14px;
//   font-family: 'Syne', sans-serif;
//   font-size: 16px; font-weight: 800; cursor: pointer;
//   display: flex; align-items: center; justify-content: center; gap: 8px;
//   transition: background .15s, transform .1s;
//   margin-bottom: 10px;
// }
// .ck-btn-order:hover:not(:disabled) { background: #4f46e5; transform: translateY(-1px); }
// .ck-btn-order:disabled { background: #c7d2fe; cursor: not-allowed; transform: none; }
// .ck-btn-shop {
//   width: 100%; height: 44px;
//   background: #fff; color: #64748b;
//   border: 1.5px solid #e2e8f0; border-radius: 12px;
//   font-family: inherit; font-size: 13.5px; font-weight: 600;
//   cursor: pointer; transition: border-color .12s, color .12s;
// }
// .ck-btn-shop:hover { border-color: #94a3b8; color: #374151; }

// /* ── Success state ── */
// .ck-success {
//   max-width: 480px; margin: 80px auto; padding: 0 24px;
//   text-align: center;
// }
// .ck-success-icon {
//   width: 80px; height: 80px; border-radius: 50%;
//   background: #f0fdf4; border: 3px solid #bbf7d0;
//   display: flex; align-items: center; justify-content: center;
//   font-size: 36px; margin: 0 auto 20px;
// }
// .ck-success-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: #0f172a; margin-bottom: 10px; }
// .ck-success-desc  { font-size: 15px; color: #64748b; margin-bottom: 28px; line-height: 1.6; }
// .ck-success-btns  { display: flex; gap: 10px; }
// .ck-success-btn-orders {
//   flex: 1; height: 48px; background: #6366f1; color: #fff;
//   border: none; border-radius: 12px; font-family: inherit;
//   font-size: 14px; font-weight: 700; cursor: pointer; transition: background .15s;
// }
// .ck-success-btn-orders:hover { background: #4f46e5; }
// .ck-success-btn-home {
//   flex: 1; height: 48px; background: #fff; color: #374151;
//   border: 1.5px solid #e2e8f0; border-radius: 12px; font-family: inherit;
//   font-size: 14px; font-weight: 600; cursor: pointer; transition: border-color .12s;
// }
// .ck-success-btn-home:hover { border-color: #94a3b8; }

// /* ── Skeleton ── */
// @keyframes ck-sk { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
// .ck-sk {
//   background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
//   background-size: 200% 100%; animation: ck-sk 1.5s infinite;
//   border-radius: 8px; display: block;
// }

// @media (max-width: 768px) {
//   .ck-body { grid-template-columns: 1fr; padding: 24px 16px; }
//   .ck-steps-inner { gap: 0; }
// }
// `;

// function injectCSS() {
//   if (document.getElementById('ck-css')) return;
//   const el = document.createElement('style');
//   el.id = 'ck-css';
//   el.textContent = CSS;
//   document.head.appendChild(el);
// }

// /* ════════════════════════════════════════
//    Main Component
// ════════════════════════════════════════ */
// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const productId = searchParams.get('product'); // single product mode

//   const [items,   setItems]   = useState([]);   // cart items
//   const [product, setProduct] = useState(null); // single product (if ?product=id)
//   const [loading, setLoading] = useState(!!productId);
//   const [submitting, setSubmitting] = useState(false);
//   const [error,   setError]   = useState('');
//   const [success, setSuccess] = useState(false);
//   const [orderId, setOrderId] = useState(null);

//   useEffect(() => { injectCSS(); }, []);

//   /* ── Load single product OR use cart ── */
//   useEffect(() => {
//     if (productId) {
//       // Single product mode: ?product=ID
//       const loadProduct = async () => {
//         setLoading(true);
//         try {
//           const token = localStorage.getItem('token');
//           const headers = token ? { Authorization: `Bearer ${token}` } : {};
//           const res = await api.get(`/customer/products/${productId}`, { headers });
//           const p = res.data?.data ?? res.data;
//           setProduct(p);
//           setItems([{
//             id: p.id, name: p.name, price: p.price,
//             image: p.image, qty: 1, maxQty: p.quantity,
//           }]);
//         } catch (err) {
//           console.error(err);
//           setError('Failed to load product.');
//         } finally {
//           setLoading(false);
//         }
//       };
//       loadProduct();
//     } else {
//       // Cart mode: load from localStorage
//       const cartItems = getCart();
//       setItems(cartItems);
//     }
//   }, [productId]);

//   /* ── Qty controls ── */
//   const increase = (id) =>
//     setItems(prev => prev.map(c =>
//       c.id === id && c.qty < c.maxQty ? { ...c, qty: c.qty + 1 } : c
//     ));

//   const decrease = (id) =>
//     setItems(prev => {
//       const item = prev.find(c => c.id === id);
//       if (!item) return prev;
//       if (item.qty <= 1) return prev.filter(c => c.id !== id);
//       return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
//     });

//   const removeItem = (id) => setItems(prev => prev.filter(c => c.id !== id));

//   /* ── Totals ── */
//   const totalItems = items.reduce((s, c) => s + c.qty, 0);
//   const totalPrice = items.reduce((s, c) => s + Number(c.price) * c.qty, 0);

//   /* ── Submit order ── */
//   const handlePlaceOrder = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) { navigate('/login'); return; }
//     if (items.length === 0) { setError('No items to order.'); return; }

//     setError('');
//     setSubmitting(true);
//     try {
//       const headers = { Authorization: `Bearer ${token}` };

//       // ✅ Backend យក customer_id ពី token ដោយស្វ័យប្រវត្តិ
//       const res = await api.post('/customer/orders', {
//         products: items.map(it => ({
//           product_id: Number(it.id),
//           quantity:   Number(it.qty),
//           price:      Number(it.price),
//         })),
//       }, { headers });

//       const newOrderId = res.data?.data?.id ?? res.data?.id;
//       setOrderId(newOrderId);
//       setSuccess(true);
//       // Clear cart after successful order
//       if (!productId) clearCart();
//     } catch (err) {
//       console.error(err);
//       const msg = err.response?.data?.message;
//       setError(
//         typeof msg === 'object'
//           ? Object.values(msg).flat()[0]
//           : msg || 'Failed to place order. Please try again.'
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   /* ── Success screen ── */
//   if (success) {
//     return (
//       <div className="ck-page">
//         <style>{CSS}</style>
//         <div className="ck-success">
//           <div className="ck-success-icon">✅</div>
//           <div className="ck-success-title">Order Placed!</div>
//           <div className="ck-success-desc">
//             Your order has been placed successfully.
//             {orderId && <><br />Order <strong>#{orderId}</strong></>}
//           </div>
//           <div className="ck-success-btns">
//             <button className="ck-success-btn-orders"
//               onClick={() => navigate('/dashboard/customer/orders')}>
//               View Orders
//             </button>
//             <button className="ck-success-btn-home"
//               onClick={() => navigate('/')}>
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ── Skeleton ── */
//   if (loading) {
//     return (
//       <div className="ck-page">
//         <style>{CSS}</style>
//         <div className="ck-steps">
//           <div className="ck-steps-inner">
//             <div className="ck-sk" style={{ width: 300, height: 28 }} />
//           </div>
//         </div>
//         <div className="ck-body">
//           <div className="ck-card">
//             <div className="ck-card-head" style={{ background: '#fafafa' }}>
//               <div className="ck-sk" style={{ width: 150, height: 14 }} />
//             </div>
//             <div className="ck-card-body">
//               {[1,2].map(k => (
//                 <div key={k} style={{ display:'flex', gap:14, padding:'14px 0', borderBottom:'1px solid #f8fafc' }}>
//                   <div className="ck-sk" style={{ width:60, height:60, borderRadius:12, flexShrink:0 }} />
//                   <div style={{ flex:1 }}>
//                     <div className="ck-sk" style={{ width:'70%', height:14, marginBottom:8 }} />
//                     <div className="ck-sk" style={{ width:'40%', height:12 }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="ck-card">
//             <div className="ck-card-body">
//               {[1,2,3].map(k => (
//                 <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f8fafc' }}>
//                   <div className="ck-sk" style={{ width:100, height:14 }} />
//                   <div className="ck-sk" style={{ width:70, height:14 }} />
//                 </div>
//               ))}
//               <div className="ck-sk" style={{ width:'100%', height:52, borderRadius:14, marginTop:16 }} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ── Empty cart ── */
//   if (items.length === 0 && !loading) {
//     return (
//       <div className="ck-page">
//         <style>{CSS}</style>
//         <div className="ck-empty" style={{ maxWidth: 480, margin: '80px auto', padding: '0 24px' }}>
//           <div className="ck-empty-icon">🛒</div>
//           <div className="ck-empty-title">Your cart is empty</div>
//           <div className="ck-empty-desc">Add some products before checking out.</div>
//           <button className="ck-btn-back" onClick={() => navigate('/')}>
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ── Main render ── */
//   return (
//     <div className="ck-page">
//       <style>{CSS}</style>

//       {/* Steps */}
//       <div className="ck-steps">
//         <div className="ck-steps-inner">
//           <div className="ck-step done">
//             <div className="ck-step-num">✓</div>
//             Cart
//           </div>
//           <div className="ck-step-line done" />
//           <div className="ck-step active">
//             <div className="ck-step-num">2</div>
//             Review Order
//           </div>
//           <div className="ck-step-line" />
//           <div className="ck-step">
//             <div className="ck-step-num">3</div>
//             Confirmation
//           </div>
//         </div>
//       </div>

//       <div className="ck-body">

//         {/* ── Left — Order items ── */}
//         <div className="ck-card">
//           <div className="ck-card-head">
//             <div className="ck-card-head-icon">🛍</div>
//             <div className="ck-card-title">
//               Order Items ({items.length} product{items.length !== 1 ? 's' : ''})
//             </div>
//           </div>
//           <div className="ck-card-body">
//             {error && <div className="ck-error">{error}</div>}
//             {!localStorage.getItem('token') && (
//               <div className="ck-note">
//                 ⚠️ You need to <strong style={{ cursor:'pointer', textDecoration:'underline' }} onClick={() => navigate('/login')}>login</strong> before placing your order.
//               </div>
//             )}
//             {items.map(item => (
//               <div className="ck-item" key={item.id}>
//                 <div className="ck-item-img">
//                   {item.image
//                     ? <img src={item.image} alt={item.name} onError={e=>{e.target.style.display='none'}} />
//                     : '📦'}
//                 </div>
//                 <div className="ck-item-info">
//                   <div className="ck-item-name">{item.name}</div>
//                   <div className="ck-item-meta">
//                     ${Number(item.price).toFixed(2)} each · Max {item.maxQty} in stock
//                   </div>
//                 </div>
//                 <div className="ck-qty">
//                   <button className="ck-qty-btn" onClick={() => decrease(item.id)}>−</button>
//                   <span className="ck-qty-num">{item.qty}</span>
//                   <button
//                     className="ck-qty-btn"
//                     onClick={() => increase(item.id)}
//                     disabled={item.qty >= item.maxQty}
//                   >+</button>
//                 </div>
//                 <div className="ck-item-price">
//                   ${(Number(item.price) * item.qty).toFixed(2)}
//                 </div>
//                 <button className="ck-rm" onClick={() => removeItem(item.id)} title="Remove">🗑</button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── Right — Summary ── */}
//         <div>
//           <div className="ck-card">
//             <div className="ck-card-head">
//               <div className="ck-card-head-icon">🧾</div>
//               <div className="ck-card-title">Order Summary</div>
//             </div>
//             <div className="ck-card-body">

//               {/* Per item */}
//               {items.map(item => (
//                 <div className="ck-sum-row" key={item.id}>
//                   <span className="ck-sum-label">{item.name} × {item.qty}</span>
//                   <span className="ck-sum-val">
//                     ${(Number(item.price) * item.qty).toFixed(2)}
//                   </span>
//                 </div>
//               ))}

//               <div className="ck-sum-row">
//                 <span className="ck-sum-label">Total Items</span>
//                 <span className="ck-sum-val">{totalItems} units</span>
//               </div>

//               <div className="ck-sum-total">
//                 <span className="ck-sum-total-label">Total</span>
//                 <span className="ck-sum-total-val">${totalPrice.toFixed(2)}</span>
//               </div>

//               <div style={{ marginTop: 20 }}>
//                 <button
//                   className="ck-btn-order"
//                   onClick={handlePlaceOrder}
//                   disabled={submitting || items.length === 0}
//                 >
//                   {submitting ? (
//                     <>
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//                         stroke="currentColor" strokeWidth="2.5"
//                         style={{ animation: 'spin 1s linear infinite' }}>
//                         <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
//                       </svg>
//                       Placing Order…
//                     </>
//                   ) : (
//                     <>✅ Place Order</>
//                   )}
//                 </button>
//                 <button className="ck-btn-shop" onClick={() => navigate('/')}>
//                   ← Continue Shopping
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>

//       </div>
//       <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

/* ── Cart helpers ── */
function getCart() {
  try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
  catch { return []; }
}
function clearCart() {
  localStorage.setItem('cart', '[]');
  window.dispatchEvent(new Event('storage'));
}

/* ── CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ck-page {
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'DM Sans', sans-serif;
  color: #0f172a;
}

/* ── Steps bar ── */
.ck-steps {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 18px 0;
}
.ck-steps-inner {
  max-width: 960px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; gap: 0;
}
.ck-step {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; font-weight: 600; color: #94a3b8;
}
.ck-step.active { color: #6366f1; }
.ck-step.done   { color: #16a34a; }
.ck-step-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: #f1f5f9; border: 2px solid #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; flex-shrink: 0;
}
.ck-step.active .ck-step-num { background: #6366f1; border-color: #6366f1; color: #fff; }
.ck-step.done   .ck-step-num { background: #16a34a; border-color: #16a34a; color: #fff; }
.ck-step-line { flex: 1; height: 2px; background: #e2e8f0; margin: 0 12px; }
.ck-step-line.done { background: #6366f1; }

/* ── Layout ── */
.ck-body {
  max-width: 960px; margin: 0 auto; padding: 40px 24px;
  display: grid; grid-template-columns: 1fr 360px;
  gap: 24px; align-items: start;
}

/* ── Card ── */
.ck-card {
  background: #fff;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 12px rgba(0,0,0,.05);
  overflow: hidden;
}
.ck-card-head {
  padding: 18px 24px;
  border-bottom: 1px solid #f1f5f9;
  background: #fafafa;
  display: flex; align-items: center; gap: 10px;
}
.ck-card-head-icon {
  width: 34px; height: 34px; border-radius: 10px;
  background: #eef2ff; color: #6366f1;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.ck-card-title { font-size: 15px; font-weight: 700; color: #0f172a; }
.ck-card-body  { padding: 24px; }

/* ── Order items ── */
.ck-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 0; border-bottom: 1px solid #f8fafc;
}
.ck-item:last-child { border-bottom: none; padding-bottom: 0; }
.ck-item-img {
  width: 60px; height: 60px; border-radius: 12px;
  background: #f1f5f9; border: 1px solid #e2e8f0;
  overflow: hidden; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
}
.ck-item-img img { width: 100%; height: 100%; object-fit: cover; }
.ck-item-info { flex: 1; min-width: 0; }
.ck-item-name  { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.ck-item-meta  { font-size: 12.5px; color: #94a3b8; }

/* Qty controls */
.ck-qty {
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
}
.ck-qty-btn {
  width: 30px; height: 30px;
  background: #f1f5f9; border: 1px solid #e2e8f0;
  border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  color: #374151; transition: all .12s;
}
.ck-qty-btn:hover:not(:disabled) { background: #eef2ff; border-color: #6366f1; color: #6366f1; }
.ck-qty-btn:disabled { opacity: .3; cursor: not-allowed; }
.ck-qty-num { font-size: 14px; font-weight: 700; min-width: 22px; text-align: center; }

.ck-item-price { font-size: 15px; font-weight: 800; color: #6366f1; flex-shrink: 0; min-width: 70px; text-align: right; }

.ck-rm {
  width: 28px; height: 28px; flex-shrink: 0;
  background: #fff1f2; border: 1px solid #fecdd3;
  border-radius: 8px; cursor: pointer; font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  color: #e11d48; transition: background .12s;
}
.ck-rm:hover { background: #ffe4e6; }

/* ── Empty cart ── */
.ck-empty {
  text-align: center; padding: 60px 20px;
}
.ck-empty-icon  { font-size: 56px; margin-bottom: 14px; }
.ck-empty-title { font-size: 18px; font-weight: 700; color: #374151; margin-bottom: 6px; }
.ck-empty-desc  { font-size: 13.5px; color: #94a3b8; margin-bottom: 20px; }
.ck-btn-back {
  background: #6366f1; color: #fff; border: none;
  border-radius: 12px; padding: 12px 28px;
  font-family: inherit; font-size: 14px; font-weight: 700;
  cursor: pointer; transition: background .15s;
}
.ck-btn-back:hover { background: #4f46e5; }

/* ── Summary card (right) ── */
.ck-sum-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0; border-bottom: 1px solid #f8fafc; font-size: 14px;
}
.ck-sum-row:last-of-type { border-bottom: none; }
.ck-sum-label { color: #64748b; font-weight: 500; }
.ck-sum-val   { color: #0f172a; font-weight: 700; }
.ck-sum-total {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 0 0; border-top: 2px solid #e2e8f0; margin-top: 8px;
}
.ck-sum-total-label { font-size: 15px; font-weight: 700; color: #0f172a; }
.ck-sum-total-val   { font-size: 26px; font-weight: 800; color: #6366f1; font-family: 'Syne', sans-serif; }

/* ── Error / Note ── */
.ck-error {
  background: #fef2f2; color: #dc2626;
  border: 1px solid #fecaca; border-radius: 10px;
  padding: 12px 16px; font-size: 13.5px; font-weight: 500;
  margin-bottom: 16px;
}
.ck-note {
  background: #fffbeb; color: #92400e;
  border: 1px solid #fde68a; border-radius: 10px;
  padding: 12px 16px; font-size: 13px;
  margin-bottom: 16px; line-height: 1.5;
}

/* ── Buttons ── */
.ck-btn-order {
  width: 100%; height: 52px;
  background: #6366f1; color: #fff;
  border: none; border-radius: 14px;
  font-family: 'Syne', sans-serif;
  font-size: 16px; font-weight: 800; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: background .15s, transform .1s;
  margin-bottom: 10px;
}
.ck-btn-order:hover:not(:disabled) { background: #4f46e5; transform: translateY(-1px); }
.ck-btn-order:disabled { background: #c7d2fe; cursor: not-allowed; transform: none; }
.ck-btn-shop {
  width: 100%; height: 44px;
  background: #fff; color: #64748b;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  cursor: pointer; transition: border-color .12s, color .12s;
}
.ck-btn-shop:hover { border-color: #94a3b8; color: #374151; }

/* ── Success state ── */
.ck-success {
  max-width: 480px; margin: 80px auto; padding: 0 24px;
  text-align: center;
}
.ck-success-icon {
  width: 80px; height: 80px; border-radius: 50%;
  background: #f0fdf4; border: 3px solid #bbf7d0;
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; margin: 0 auto 20px;
}
.ck-success-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: #0f172a; margin-bottom: 10px; }
.ck-success-desc  { font-size: 15px; color: #64748b; margin-bottom: 28px; line-height: 1.6; }
.ck-success-btns  { display: flex; gap: 10px; }
.ck-success-btn-orders {
  flex: 1; height: 48px; background: #6366f1; color: #fff;
  border: none; border-radius: 12px; font-family: inherit;
  font-size: 14px; font-weight: 700; cursor: pointer; transition: background .15s;
}
.ck-success-btn-orders:hover { background: #4f46e5; }
.ck-success-btn-home {
  flex: 1; height: 48px; background: #fff; color: #374151;
  border: 1.5px solid #e2e8f0; border-radius: 12px; font-family: inherit;
  font-size: 14px; font-weight: 600; cursor: pointer; transition: border-color .12s;
}
.ck-success-btn-home:hover { border-color: #94a3b8; }

/* ── Skeleton ── */
@keyframes ck-sk { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.ck-sk {
  background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size: 200% 100%; animation: ck-sk 1.5s infinite;
  border-radius: 8px; display: block;
}

@media (max-width: 768px) {
  .ck-body { grid-template-columns: 1fr; padding: 24px 16px; }
  .ck-steps-inner { gap: 0; }
}
`;

function injectCSS() {
  if (document.getElementById('ck-css')) return;
  const el = document.createElement('style');
  el.id = 'ck-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ════════════════════════════════════════
   Main Component
════════════════════════════════════════ */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product'); // single product mode

  const [items,   setItems]   = useState([]);   // cart items
  const [ setProduct] = useState(null); // single product (if ?product=id)
  const [loading, setLoading] = useState(!!productId);
  const [submitting, setSubmitting] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => { injectCSS(); }, []);

  /* ── Load single product OR use cart ── */
  useEffect(() => {
    if (productId) {
      // Single product mode: ?product=ID
      const loadProduct = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const res = await api.get(`/customer/products/${productId}`, { headers });
          const p = res.data?.data ?? res.data;
          setProduct(p);
          setItems([{
            id: p.id, name: p.name, price: p.price,
            image: p.image, qty: 1, maxQty: p.quantity,
          }]);
        } catch (err) {
          console.error(err);
          setError('Failed to load product.');
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    } else {
      // Cart mode: load from localStorage
      const cartItems = getCart();
      setItems(cartItems);
    }
  }, [productId]);

  /* ── Qty controls ── */
  const increase = (id) =>
    setItems(prev => prev.map(c =>
      c.id === id && c.qty < c.maxQty ? { ...c, qty: c.qty + 1 } : c
    ));

  const decrease = (id) =>
    setItems(prev => {
      const item = prev.find(c => c.id === id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter(c => c.id !== id);
      return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });

  const removeItem = (id) => setItems(prev => prev.filter(c => c.id !== id));

  /* ── Totals ── */
  const totalItems = items.reduce((s, c) => s + c.qty, 0);
  const totalPrice = items.reduce((s, c) => s + Number(c.price) * c.qty, 0);

  /* ── Submit order ── */
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    if (items.length === 0) { setError('No items to order.'); return; }

    setError('');
    setSubmitting(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      
      const res = await api.post('/customer/orders', {
        products: items.map(it => ({
          product_id: Number(it.id),
          quantity:   Number(it.qty),
          price:      Number(it.price),
        })),
      }, { headers });

      const newOrderId = res.data?.data?.id ?? res.data?.id;
      setOrderId(newOrderId);
      setSuccess(true);
      // Clear cart after successful order
      if (!productId) clearCart();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      setError(
        typeof msg === 'object'
          ? Object.values(msg).flat()[0]
          : msg || 'Failed to place order. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success screen ── */
  if (success) {
    return (
      <div className="ck-page">
        <style>{CSS}</style>
        <div className="ck-success">
          <div className="ck-success-icon">✅</div>
          <div className="ck-success-title">Order Placed!</div>
          <div className="ck-success-desc">
            Your order has been placed successfully.
            {orderId && <><br />Order <strong>#{orderId}</strong></>}
          </div>
          <div className="ck-success-btns">
            <button className="ck-success-btn-orders"
              onClick={() => navigate('/profile')}>
              View Orders
            </button>
            <button className="ck-success-btn-home"
              onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Skeleton ── */
  if (loading) {
    return (
      <div className="ck-page">
        <style>{CSS}</style>
        <div className="ck-steps">
          <div className="ck-steps-inner">
            <div className="ck-sk" style={{ width: 300, height: 28 }} />
          </div>
        </div>
        <div className="ck-body">
          <div className="ck-card">
            <div className="ck-card-head" style={{ background: '#fafafa' }}>
              <div className="ck-sk" style={{ width: 150, height: 14 }} />
            </div>
            <div className="ck-card-body">
              {[1,2].map(k => (
                <div key={k} style={{ display:'flex', gap:14, padding:'14px 0', borderBottom:'1px solid #f8fafc' }}>
                  <div className="ck-sk" style={{ width:60, height:60, borderRadius:12, flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <div className="ck-sk" style={{ width:'70%', height:14, marginBottom:8 }} />
                    <div className="ck-sk" style={{ width:'40%', height:12 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ck-card">
            <div className="ck-card-body">
              {[1,2,3].map(k => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f8fafc' }}>
                  <div className="ck-sk" style={{ width:100, height:14 }} />
                  <div className="ck-sk" style={{ width:70, height:14 }} />
                </div>
              ))}
              <div className="ck-sk" style={{ width:'100%', height:52, borderRadius:14, marginTop:16 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Empty cart ── */
  if (items.length === 0 && !loading) {
    return (
      <div className="ck-page">
        <style>{CSS}</style>
        <div className="ck-empty" style={{ maxWidth: 480, margin: '80px auto', padding: '0 24px' }}>
          <div className="ck-empty-icon">🛒</div>
          <div className="ck-empty-title">Your cart is empty</div>
          <div className="ck-empty-desc">Add some products before checking out.</div>
          <button className="ck-btn-back" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /* ── Main render ── */
  return (
    <div className="ck-page">
      <style>{CSS}</style>

      {/* Steps */}
      <div className="ck-steps">
        <div className="ck-steps-inner">
          <div className="ck-step done">
            <div className="ck-step-num">✓</div>
            Cart
          </div>
          <div className="ck-step-line done" />
          <div className="ck-step active">
            <div className="ck-step-num">2</div>
            Review Order
          </div>
          <div className="ck-step-line" />
          <div className="ck-step">
            <div className="ck-step-num">3</div>
            Confirmation
          </div>
        </div>
      </div>

      <div className="ck-body">

        {/* ── Left — Order items ── */}
        <div className="ck-card">
          <div className="ck-card-head">
            <div className="ck-card-head-icon">🛍</div>
            <div className="ck-card-title">
              Order Items ({items.length} product{items.length !== 1 ? 's' : ''})
            </div>
          </div>
          <div className="ck-card-body">
            {error && <div className="ck-error">{error}</div>}
            {!localStorage.getItem('token') && (
              <div className="ck-note">
                ⚠️ You need to <strong style={{ cursor:'pointer', textDecoration:'underline' }} onClick={() => navigate('/login')}>login</strong> before placing your order.
              </div>
            )}
            {items.map(item => (
              <div className="ck-item" key={item.id}>
                <div className="ck-item-img">
                  {item.image
                    ? <img src={item.image} alt={item.name} onError={e=>{e.target.style.display='none'}} />
                    : '📦'}
                </div>
                <div className="ck-item-info">
                  <div className="ck-item-name">{item.name}</div>
                  <div className="ck-item-meta">
                    ${Number(item.price).toFixed(2)} each · Max {item.maxQty} in stock
                  </div>
                </div>
                <div className="ck-qty">
                  <button className="ck-qty-btn" onClick={() => decrease(item.id)}>−</button>
                  <span className="ck-qty-num">{item.qty}</span>
                  <button
                    className="ck-qty-btn"
                    onClick={() => increase(item.id)}
                    disabled={item.qty >= item.maxQty}
                  >+</button>
                </div>
                <div className="ck-item-price">
                  ${(Number(item.price) * item.qty).toFixed(2)}
                </div>
                <button className="ck-rm" onClick={() => removeItem(item.id)} title="Remove">🗑</button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Summary ── */}
        <div>
          <div className="ck-card">
            <div className="ck-card-head">
              <div className="ck-card-head-icon">🧾</div>
              <div className="ck-card-title">Order Summary</div>
            </div>
            <div className="ck-card-body">

              {/* Per item */}
              {items.map(item => (
                <div className="ck-sum-row" key={item.id}>
                  <span className="ck-sum-label">{item.name} × {item.qty}</span>
                  <span className="ck-sum-val">
                    ${(Number(item.price) * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="ck-sum-row">
                <span className="ck-sum-label">Total Items</span>
                <span className="ck-sum-val">{totalItems} units</span>
              </div>

              <div className="ck-sum-total">
                <span className="ck-sum-total-label">Total</span>
                <span className="ck-sum-total-val">${totalPrice.toFixed(2)}</span>
              </div>

              <div style={{ marginTop: 20 }}>
                <button
                  className="ck-btn-order"
                  onClick={handlePlaceOrder}
                  disabled={submitting || items.length === 0}
                >
                  {submitting ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Placing Order…
                    </>
                  ) : (
                    <>✅ Place Order</>
                  )}
                </button>
                <button className="ck-btn-shop" onClick={() => navigate('/')}>
                  ← Continue Shopping
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../assets/style/Front/HomePage.css';

/* ─── Cart helpers (localStorage) ─────────────────────── */
function getCart() {
  try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  // notify same-tab listeners (Navbar polling)
  window.dispatchEvent(new Event('storage'));
}

/* ─── Static data ─────────────────────────────────────── */
const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    title: 'Free Delivery',
    desc: 'Free shipping on all orders over $100',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Self Pickup',
    desc: 'Pick up from our store at your convenience',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '1-Year Warranty',
    desc: 'Full warranty coverage on all products',
  },
];

/* ─── Extra CSS for cart drawer ───────────────────────── */
const CART_CSS = `
.cart-overlay {
  position: fixed; inset: 0; z-index: 999;
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(3px);
  opacity: 0; pointer-events: none;
  transition: opacity .25s;
}
.cart-overlay.open { opacity: 1; pointer-events: all; }

.cart-drawer {
  position: fixed; top: 0; right: 0; bottom: 0; z-index: 1000;
  width: 400px; max-width: 100vw;
  background: #fff;
  box-shadow: -8px 0 40px rgba(0,0,0,.12);
  display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform .3s cubic-bezier(.4,0,.2,1);
}
.cart-drawer.open { transform: translateX(0); }

.cart-drawer-head {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex; align-items: center; justify-content: space-between;
  background: #fafafa;
}
.cart-drawer-title {
  font-size: 18px; font-weight: 800; color: #0f172a;
  display: flex; align-items: center; gap: 10px;
}
.cart-drawer-badge {
  font-size: 11px; font-weight: 700;
  background: #6366f1; color: #fff;
  border-radius: 20px; padding: 2px 9px;
}
.cart-drawer-close {
  width: 34px; height: 34px;
  background: #f1f5f9; border: none; border-radius: 9px;
  font-size: 20px; cursor: pointer; color: #64748b;
  display: flex; align-items: center; justify-content: center;
  transition: background .12s;
}
.cart-drawer-close:hover { background: #e2e8f0; color: #0f172a; }

.cart-items { flex: 1; overflow-y: auto; padding: 12px 24px; }
.cart-items::-webkit-scrollbar { width: 4px; }
.cart-items::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

.cart-empty {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  height: 100%; gap: 10px; color: #94a3b8;
  padding: 40px 0;
}
.cart-empty-icon { font-size: 52px; }
.cart-empty-title { font-size: 16px; font-weight: 700; color: #374151; }
.cart-empty-desc  { font-size: 13.5px; }

/* Cart item row */
.cart-item {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 0; border-bottom: 1px solid #f8fafc;
}
.cart-item:last-child { border-bottom: none; }
.cart-item-img {
  width: 56px; height: 56px; border-radius: 10px;
  background: #f1f5f9; border: 1px solid #e2e8f0;
  object-fit: cover; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; overflow: hidden;
}
.cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
.cart-item-info { flex: 1; min-width: 0; }
.cart-item-name {
  font-size: 13.5px; font-weight: 700; color: #0f172a;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-bottom: 3px;
}
.cart-item-price { font-size: 13px; font-weight: 700; color: #6366f1; }
.cart-item-unit  { font-size: 11.5px; color: #94a3b8; margin-left: 4px; font-weight: 400; }

/* Qty controls */
.cart-qty {
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
}
.cart-qty-btn {
  width: 28px; height: 28px;
  background: #f1f5f9; border: 1px solid #e2e8f0;
  border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  color: #374151; transition: background .12s, border-color .12s;
  flex-shrink: 0;
}
.cart-qty-btn:hover:not(:disabled) { background: #e0e7ff; border-color: #6366f1; color: #6366f1; }
.cart-qty-btn:disabled { opacity: .3; cursor: not-allowed; }
.cart-qty-num { font-size: 14px; font-weight: 700; min-width: 22px; text-align: center; color: #0f172a; }

.cart-remove {
  width: 28px; height: 28px; flex-shrink: 0;
  background: #fff1f2; border: 1px solid #fecdd3;
  border-radius: 8px; cursor: pointer; font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  color: #e11d48; transition: background .12s;
}
.cart-remove:hover { background: #ffe4e6; }

/* Cart footer */
.cart-footer {
  padding: 18px 24px;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
}
.cart-total-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 14px;
}
.cart-total-label { font-size: 14px; color: #64748b; font-weight: 500; }
.cart-total-val   { font-size: 22px; font-weight: 800; color: #0f172a; }
.cart-btn-checkout {
  width: 100%; height: 48px;
  background: #6366f1; color: #fff;
  border: none; border-radius: 12px;
  font-family: inherit; font-size: 15px; font-weight: 700;
  cursor: pointer; margin-bottom: 8px;
  transition: background .15s, transform .1s;
}
.cart-btn-checkout:hover { background: #4f46e5; transform: translateY(-1px); }
.cart-btn-continue {
  width: 100%; height: 42px;
  background: #fff; color: #64748b;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  cursor: pointer; transition: border-color .12s, color .12s;
}
.cart-btn-continue:hover { border-color: #94a3b8; color: #374151; }

/* Add animation on product card button */
.btn-added {
  background: #d1fae5 !important;
  color: #065f46 !important;
  border-color: #6ee7b7 !important;
}
`;

function injectCartCSS() {
  if (document.getElementById('cart-css')) return;
  const el = document.createElement('style');
  el.id = 'cart-css';
  el.textContent = CART_CSS;
  document.head.appendChild(el);
}

/* ─── Sub-components ──────────────────────────────────── */
function ProductCard({ product, onAddToCart, onBuyNow, onViewDetail, inCart }) {
  const outOfStock = product.quantity <= 0;
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
      </div>
      <div className="product-actions">
        <button
          className={`btn btn-ghost${inCart ? ' btn-added' : ''}`}
          onClick={() => onAddToCart(product)}
          disabled={outOfStock}
        >
          {inCart ? '✓ Added' : '🛒 Add'}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onBuyNow(product)}
          disabled={outOfStock}
        >
          Buy
        </button>
      </div>
      <button className="btn-detail" onClick={() => onViewDetail(product)}>
        View Details →
      </button>
    </div>
  );
}

function BenefitCard({ benefit }) {
  return (
    <div className="benefit-card">
      <div className="benefit-icon">{benefit.icon}</div>
      <h4 className="benefit-title">{benefit.title}</h4>
      <p className="benefit-desc">{benefit.desc}</p>
    </div>
  );
}

/* ─── Cart Item ───────────────────────────────────────── */
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-img">
        {item.image
          ? <img src={item.image} alt={item.name} onError={e=>{e.target.style.display='none'}} />
          : '📦'}
      </div>
      <div className="cart-item-info">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-price">
          ${(Number(item.price) * item.qty).toFixed(2)}
          {item.qty > 1 && (
            <span className="cart-item-unit">
              (${Number(item.price).toFixed(2)} × {item.qty})
            </span>
          )}
        </div>
      </div>
      <div className="cart-qty">
        <button className="cart-qty-btn" onClick={() => onDecrease(item.id)}>−</button>
        <span className="cart-qty-num">{item.qty}</span>
        <button
          className="cart-qty-btn"
          onClick={() => onIncrease(item.id)}
          disabled={item.qty >= item.maxQty}
        >+</button>
      </div>
      <button className="cart-remove" onClick={() => onRemove(item.id)} title="Remove">🗑</button>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [cart,      setCart]      = useState(getCart);   // load from localStorage
  const [cartOpen,  setCartOpen]  = useState(false);

  useEffect(() => { injectCartCSS(); }, []);

  /* ── Load products ── */
  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await api.get('/customer/products/list', { headers });
        const list = res.data?.data ?? res.data ?? [];
        setProducts(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error('Failed to load:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ── Sync cart → localStorage every time cart changes ── */
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  /* ── Cart helpers ── */
  const cartIds  = new Set(cart.map(c => c.id));
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + Number(c.price) * c.qty, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === product.id);
      if (exists) {
        if (exists.qty >= exists.maxQty) return prev;
        return prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, {
        id: product.id, name: product.name,
        price: product.price, image: product.image,
        qty: 1, maxQty: product.quantity,
      }];
    });
    setCartOpen(true);
  };

  const increase = (id) =>
    setCart(prev => prev.map(c =>
      c.id === id && c.qty < c.maxQty ? { ...c, qty: c.qty + 1 } : c
    ));

  const decrease = (id) =>
    setCart(prev => {
      const item = prev.find(c => c.id === id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter(c => c.id !== id);
      return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });

  const removeFromCart = (id) =>
    setCart(prev => prev.filter(c => c.id !== id));

  const handleBuyNow = (product) => {
    addToCart(product);
    setCartOpen(true);
  };

  const handleViewDetail = (p) => navigate(`/product/${p.id}`);

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    navigate('/dashboard/customer/orders/add', { state: { cartItems: cart } });
  };

  /* ── Render ── */
  return (
    <div className="page">

      {/* ══ Cart Overlay ══ */}
      <div
        className={`cart-overlay${cartOpen ? ' open' : ''}`}
        onClick={() => setCartOpen(false)}
      />

      {/* ══ Cart Drawer ══ */}
      <div className={`cart-drawer${cartOpen ? ' open' : ''}`}>

        {/* Header */}
        <div className="cart-drawer-head">
          <div className="cart-drawer-title">
            🛒 My Cart
            {cartCount > 0 && (
              <span className="cart-drawer-badge">{cartCount} items</span>
            )}
          </div>
          <button className="cart-drawer-close" onClick={() => setCartOpen(false)}>×</button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <div className="cart-empty-title">Your cart is empty</div>
              <div className="cart-empty-desc">Add products to get started</div>
            </div>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total ({cartCount} items)</span>
              <span className="cart-total-val">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="cart-btn-checkout" onClick={handleCheckout}>
              Checkout →
            </button>
            <button className="cart-btn-continue" onClick={() => setCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-tag">Premium Audio</span>
          <h1 className="hero-heading">
            Elevate Your<br />Audio Journey
          </h1>
          <p className="hero-sub">
            Discover earbuds, headphones, speakers and more — crafted
            for audiophiles who refuse to compromise.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>
              Shop Now
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/about')}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-media">
          <img
            src="https://i.pinimg.com/1200x/19/28/7c/19287c8799f8c0ce38103cfe7a240bea.jpg"
            alt="Premium audio headphones"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Featured Products</h2>
          <button className="btn btn-ghost" onClick={() => navigate('/products')}>
            See all →
          </button>
        </div>
        {loading ? (
          <div className="skeleton-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {products.slice(0, 10).map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
                onViewDetail={handleViewDetail}
                inCart={cartIds.has(p.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Benefits */}
      <section className="section benefits-section">
        <div className="benefits-grid">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={i} benefit={b} />
          ))}
        </div>
      </section>

    </div>
  );
}
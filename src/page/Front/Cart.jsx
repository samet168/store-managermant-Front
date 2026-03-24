import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.cart-page {
  min-height: 100vh;
  background: #f4f3f0;
  font-family: 'DM Sans', sans-serif;
  padding: 40px 60px 80px;
}

.cart-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 28px; }
.cart-bc-link { font-size: 13px; color: #c17b3f; cursor: pointer; font-weight: 600; letter-spacing: .01em; }
.cart-bc-link:hover { text-decoration: underline; }
.cart-bc-sep { font-size: 13px; color: #c4bfb6; }
.cart-bc-cur { font-size: 13px; color: #9c9488; }

.cart-header {
  display: flex; align-items: baseline;
  gap: 14px; margin-bottom: 28px;
}
.cart-title {
  font-family: 'DM Serif Display', serif;
  font-size: 2.6rem; font-weight: 400;
  color: #1c1915; letter-spacing: -.5px;
}
.cart-count {
  font-size: 13px; font-weight: 700;
  background: #fdf0e3; color: #c17b3f;
  border: 1px solid #f0d9be;
  border-radius: 20px; padding: 3px 12px;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

.cart-card {
  background: #fff;
  border: 1px solid #e8e4dd;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,.05);
  overflow: hidden;
}

.cart-card-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f2ede7;
  background: #faf8f5;
  display: flex; align-items: center; justify-content: space-between;
}
.cart-card-title { font-size: 12px; font-weight: 700; color: #6b6460; text-transform: uppercase; letter-spacing: .08em; }
.cart-clear-btn {
  font-size: 12px; font-weight: 600; color: #c17b3f;
  background: transparent; border: none; cursor: pointer;
  transition: color .15s; letter-spacing: .02em;
}
.cart-clear-btn:hover { color: #9a5e29; }

.cart-item {
  display: flex; align-items: center; gap: 18px;
  padding: 20px 24px;
  border-bottom: 1px solid #f2ede7;
  transition: background .15s;
}
.cart-item:last-child { border-bottom: none; }
.cart-item:hover { background: #fdfcfb; }

.cart-item-img {
  width: 76px; height: 76px;
  border-radius: 12px;
  object-fit: cover;
  background: #f2ede7;
  border: 1px solid #e8e4dd;
  flex-shrink: 0;
}
.cart-item-img-ph {
  width: 76px; height: 76px;
  border-radius: 12px;
  background: #f2ede7;
  border: 1px solid #e8e4dd;
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; flex-shrink: 0;
}

.cart-item-info { flex: 1; min-width: 0; }
.cart-item-name {
  font-size: 15px; font-weight: 600; color: #1c1915;
  margin-bottom: 4px; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
}
.cart-item-cat { font-size: 12px; color: #9c9488; margin-bottom: 8px; letter-spacing: .02em; }
.cart-item-price { font-size: 15px; font-weight: 700; color: #c17b3f; }

.cart-item-right {
  display: flex; flex-direction: column;
  align-items: flex-end; gap: 10px;
}

.cart-qty {
  display: flex; align-items: center;
  border: 1.5px solid #e8e4dd; border-radius: 10px; overflow: hidden;
}
.cart-qty-btn {
  width: 34px; height: 34px;
  background: #faf8f5; border: none;
  font-size: 18px; font-weight: 500; color: #6b6460;
  cursor: pointer; transition: background .15s;
  display: flex; align-items: center; justify-content: center;
}
.cart-qty-btn:hover { background: #f2ede7; color: #1c1915; }
.cart-qty-num {
  width: 40px; text-align: center;
  font-size: 14px; font-weight: 700; color: #1c1915;
  border-left: 1px solid #e8e4dd;
  border-right: 1px solid #e8e4dd;
  line-height: 34px;
}

.cart-item-subtotal { font-size: 14px; font-weight: 700; color: #1c1915; }

.cart-remove-btn {
  background: transparent; border: none;
  color: #c4bfb6; font-size: 20px;
  cursor: pointer; transition: color .15s;
  line-height: 1; padding: 2px;
}
.cart-remove-btn:hover { color: #c17b3f; }

.cart-empty {
  padding: 70px 20px; text-align: center;
}
.cart-empty-icon { font-size: 60px; margin-bottom: 16px; }
.cart-empty-text { font-family: 'DM Serif Display', serif; font-size: 22px; font-weight: 400; color: #1c1915; margin-bottom: 8px; }
.cart-empty-sub  { font-size: 14px; color: #9c9488; margin-bottom: 28px; }

.summary-card {
  background: #fff;
  border: 1px solid #e8e4dd;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,.05);
  overflow: hidden;
  position: sticky;
  top: 24px;
}
.summary-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f2ede7;
  background: #faf8f5;
}
.summary-title { font-size: 12px; font-weight: 700; color: #6b6460; text-transform: uppercase; letter-spacing: .08em; }
.summary-body  { padding: 22px 24px; }

.summary-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13.5px; color: #6b6460;
  padding: 9px 0; border-bottom: 1px solid #f9f7f4;
}
.summary-row:last-of-type { border-bottom: none; }
.summary-row.total {
  font-size: 17px; font-weight: 800; color: #1c1915;
  padding-top: 16px; margin-top: 6px;
  border-top: 1.5px solid #e8e4dd; border-bottom: none;
}
.summary-row .label { font-weight: 500; }
.summary-row.total .label { font-weight: 700; }
.summary-val { font-weight: 600; color: #1c1915; }
.summary-row.total .summary-val { color: #c17b3f; font-size: 1.25rem; }

.promo-wrap { display: flex; gap: 8px; margin: 18px 0; }
.promo-input {
  flex: 1; border: 1.5px solid #e8e4dd; border-radius: 10px;
  padding: 10px 13px; font-family: 'DM Sans', sans-serif;
  font-size: 13px; color: #1c1915; outline: none;
  transition: border-color .15s; background: #faf8f5;
}
.promo-input:focus { border-color: #c17b3f; background: #fff; }
.promo-input::placeholder { color: #b5afa8; }
.promo-btn {
  background: #1c1915; color: #f4f3f0; border: none;
  border-radius: 10px; padding: 10px 16px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all .15s; white-space: nowrap; letter-spacing: .02em;
}
.promo-btn:hover { background: #2e2a25; }

.checkout-btn {
  width: 100%; background: #c17b3f; color: #fff;
  border: none; border-radius: 12px;
  padding: 15px; margin-top: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px; font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(193,123,63,.28);
  transition: all .18s; letter-spacing: .02em;
}
.checkout-btn:hover { background: #a8672e; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(193,123,63,.36); }
.checkout-btn:disabled { background: #dfc4a2; cursor: not-allowed; transform: none; box-shadow: none; }

.continue-btn {
  width: 100%; background: transparent; color: #6b6460;
  border: 1.5px solid #e8e4dd; border-radius: 12px;
  padding: 13px; margin-top: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all .15s;
}
.continue-btn:hover { border-color: #b5afa8; color: #1c1915; background: #faf8f5; }

.shipping-note {
  font-size: 12px; color: #9c9488;
  text-align: center; margin-top: 16px;
  display: flex; align-items: center; justify-content: center; gap: 5px;
}

.toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  background: #1c1915; color: #fff;
  padding: 12px 22px; border-radius: 50px;
  font-size: 14px; font-weight: 600;
  box-shadow: 0 6px 24px rgba(0,0,0,.2);
  z-index: 9999; animation: fadeInUp .25s ease;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translate(-50%, 14px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}

.order-success {
  text-align: center; padding: 70px 30px;
}
.order-success-icon { font-size: 64px; margin-bottom: 16px; }
.order-success-title { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #1c1915; margin-bottom: 10px; }
.order-success-sub { font-size: 14px; color: #9c9488; }

@media (max-width: 900px) {
  .cart-page  { padding: 24px 20px 60px; }
  .cart-layout { grid-template-columns: 1fr; }
  .summary-card { position: static; }
}
@media (max-width: 480px) {
  .cart-item { gap: 12px; padding: 14px 16px; }
  .cart-item-img, .cart-item-img-ph { width: 58px; height: 58px; }
}
`;

// ── Mock initial cart items ──────────────────────────────
const INITIAL_CART = [
  { id: 1, name: "Ceramic Pour-Over Set", category: "Coffee & Tea", price: 48.00, qty: 1, image: null, emoji: "☕" },
  { id: 2, name: "Linen Table Runner", category: "Home & Living", price: 34.99, qty: 2, image: null, emoji: "🏠" },
  { id: 3, name: "Beeswax Candle Trio", category: "Scents & Candles", price: 27.50, qty: 1, image: null, emoji: "🕯️" },
];

function injectStyles() {
  if (document.getElementById("cart-styles")) return;
  const tag = document.createElement("style");
  tag.id = "cart-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Component ──────────────────────────────────────────────
export default function Cart() {
  const [items, setItems]       = useState(INITIAL_CART);
  const [promo, setPromo]       = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading]   = useState(false);
  const [ordered, setOrdered]   = useState(false);
  const [toast, setToast]       = useState(null);
  const [page, setPage]         = useState("cart"); // "cart" | "products"

  useEffect(() => { injectStyles(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    if (window.confirm("Clear all items from cart?")) {
      setItems([]);
      showToast("Cart cleared");
    }
  };

  const applyPromo = () => {
    if (promo.toLowerCase() === "save10") {
      setDiscount(10);
      showToast("✓ Promo applied — 10% off!");
    } else {
      showToast("❌ Invalid promo code");
    }
  };

  const subtotal    = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping    = subtotal > 100 ? 0 : 9.99;
  const discountAmt = subtotal * (discount / 100);
  const total       = Math.max(0, subtotal - discountAmt + shipping);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600)); // simulate API
    setLoading(false);
    setOrdered(true);
    setItems([]);
    setDiscount(0);
    setPromo("");
  };

  if (page === "products") {
    return (
      <div className="cart-page">
        <div className="cart-bc">
          <span className="cart-bc-link" onClick={() => setPage("cart")}>Cart</span>
          <span className="cart-bc-sep">/</span>
          <span className="cart-bc-cur">Products</span>
        </div>
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🛍️</div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", color: "#1c1915", marginBottom: 10 }}>Product Catalogue</p>
          <p style={{ color: "#9c9488", fontSize: 14, marginBottom: 28 }}>This would be your products page.</p>
          <button className="checkout-btn" style={{ maxWidth: 200, margin: "0 auto" }} onClick={() => setPage("cart")}>← Back to Cart</button>
        </div>
      </div>
    );
  }

  if (ordered) {
    return (
      <div className="cart-page">
        <div className="order-success">
          <div className="order-success-icon">✅</div>
          <p className="order-success-title">Order Placed!</p>
          <p className="order-success-sub">Thank you for your purchase. Your order is being processed.</p>
          <button className="checkout-btn" style={{ maxWidth: 220, margin: "28px auto 0" }} onClick={() => { setOrdered(false); setItems(INITIAL_CART); }}>
            Start New Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {toast && <div className="toast">{toast}</div>}

      {/* Breadcrumb */}
      <div className="cart-bc">
        <span className="cart-bc-link" onClick={() => setPage("products")}>Home</span>
        <span className="cart-bc-sep">/</span>
        <span className="cart-bc-cur">Cart</span>
      </div>

      {/* Header */}
      <div className="cart-header">
        <h1 className="cart-title">
          Shopping Cart
        </h1>
        {items.length > 0 && (
          <span className="cart-count">{items.length} item{items.length > 1 ? "s" : ""}</span>
        )}
      </div>

      <div className="cart-layout">

        {/* Items */}
        <div className="cart-card">
          <div className="cart-card-header">
            <span className="cart-card-title">Your Items</span>
            {items.length > 0 && (
              <button className="cart-clear-btn" onClick={clearCart}>Clear All</button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-text">Your cart is empty</p>
              <p className="cart-empty-sub">Add some products to get started</p>
              <button className="checkout-btn" style={{ maxWidth: 200, margin: "0 auto" }} onClick={() => setPage("products")}>
                Shop Now
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                ) : (
                  <div className="cart-item-img-ph">{item.emoji || "📦"}</div>
                )}

                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  {item.category && <p className="cart-item-cat">{item.category}</p>}
                  <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                </div>

                <div className="cart-item-right">
                  <button className="cart-remove-btn" onClick={() => removeItem(item.id)}>×</button>
                  <div className="cart-qty">
                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span className="cart-qty-num">{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <span className="cart-item-subtotal">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="summary-card">
          <div className="summary-header">
            <span className="summary-title">Order Summary</span>
          </div>
          <div className="summary-body">

            <div className="summary-row">
              <span className="label">Subtotal</span>
              <span className="summary-val">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row" style={{ color: "#5a8a5a" }}>
                <span className="label">Discount ({discount}%)</span>
                <span style={{ fontWeight: 600 }}>−${discountAmt.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span className="label">Shipping</span>
              <span className="summary-val">
                {shipping === 0
                  ? <span style={{ color: "#5a8a5a", fontWeight: 700 }}>Free</span>
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row total">
              <span className="label">Total</span>
              <span className="summary-val">${total.toFixed(2)}</span>
            </div>

            <div className="promo-wrap">
              <input
                className="promo-input"
                placeholder='Try "SAVE10"'
                value={promo}
                onChange={e => setPromo(e.target.value)}
                onKeyDown={e => e.key === "Enter" && applyPromo()}
              />
              <button className="promo-btn" onClick={applyPromo}>Apply</button>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={items.length === 0 || loading}
            >
              {loading ? "Processing…" : "Proceed to Checkout →"}
            </button>

            <button className="continue-btn" onClick={() => setPage("products")}>
              ← Continue Shopping
            </button>

            <p className="shipping-note">🚚 Free shipping on orders over $100</p>
          </div>
        </div>

      </div>
    </div>
  );
}
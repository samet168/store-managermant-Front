import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.cart-page {
  min-height: 100vh;
  background: #f9fafb;
  font-family: 'Inter', sans-serif;
  padding: 40px 80px 80px;
}

/* Breadcrumb */
.cart-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 28px; }
.cart-bc-link { font-size: 13px; color: #3b82f6; cursor: pointer; font-weight: 500; }
.cart-bc-link:hover { text-decoration: underline; }
.cart-bc-sep { font-size: 13px; color: #d1d5db; }
.cart-bc-cur { font-size: 13px; color: #9ca3af; }

/* Header */
.cart-header {
  display: flex; align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.cart-title { font-size: 1.8rem; font-weight: 800; color: #0f172a; letter-spacing: -.5px; }
.cart-count {
  font-size: 13px; font-weight: 600;
  background: #eff6ff; color: #3b82f6;
  border: 1px solid #bfdbfe;
  border-radius: 20px; padding: 3px 12px;
  margin-left: 10px;
}

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

/* Cart items card */
.cart-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
}

.cart-card-header {
  padding: 16px 22px;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
  display: flex; align-items: center; justify-content: space-between;
}
.cart-card-title { font-size: 13px; font-weight: 700; color: #374151; }
.cart-clear-btn {
  font-size: 12.5px; font-weight: 600; color: #dc2626;
  background: transparent; border: none; cursor: pointer;
  transition: color .15s;
}
.cart-clear-btn:hover { color: #b91c1c; }

/* Cart item row */
.cart-item {
  display: flex; align-items: center; gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid #f3f4f6;
  transition: background .15s;
}
.cart-item:last-child { border-bottom: none; }
.cart-item:hover { background: #fafafa; }

.cart-item-img {
  width: 72px; height: 72px;
  border-radius: 10px;
  object-fit: cover;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
}
.cart-item-img-ph {
  width: 72px; height: 72px;
  border-radius: 10px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; flex-shrink: 0;
}

.cart-item-info { flex: 1; min-width: 0; }
.cart-item-name {
  font-size: 14.5px; font-weight: 600; color: #0f172a;
  margin-bottom: 4px; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
}
.cart-item-cat {
  font-size: 12px; color: #9ca3af; margin-bottom: 8px;
}
.cart-item-price {
  font-size: 15px; font-weight: 700; color: #3b82f6;
}

.cart-item-right {
  display: flex; flex-direction: column;
  align-items: flex-end; gap: 10px;
}

/* Qty control */
.cart-qty {
  display: flex; align-items: center;
  border: 1.5px solid #e5e7eb; border-radius: 8px; overflow: hidden;
}
.cart-qty-btn {
  width: 32px; height: 32px;
  background: #f9fafb; border: none;
  font-size: 16px; font-weight: 600; color: #374151;
  cursor: pointer; transition: background .15s;
  display: flex; align-items: center; justify-content: center;
}
.cart-qty-btn:hover { background: #f3f4f6; }
.cart-qty-num {
  width: 40px; text-align: center;
  font-size: 14px; font-weight: 700; color: #0f172a;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  line-height: 32px;
}

.cart-item-subtotal {
  font-size: 14px; font-weight: 700; color: #0f172a;
}

.cart-remove-btn {
  background: transparent; border: none;
  color: #d1d5db; font-size: 18px;
  cursor: pointer; transition: color .15s;
  line-height: 1; padding: 2px;
}
.cart-remove-btn:hover { color: #dc2626; }

/* Empty state */
.cart-empty {
  padding: 60px 20px; text-align: center;
}
.cart-empty-icon { font-size: 56px; margin-bottom: 16px; }
.cart-empty-text { font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 6px; }
.cart-empty-sub  { font-size: 13.5px; color: #9ca3af; margin-bottom: 24px; }

/* Summary card */
.summary-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
  position: sticky;
  top: 24px;
}
.summary-header {
  padding: 16px 22px;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
}
.summary-title { font-size: 13px; font-weight: 700; color: #374151; }
.summary-body  { padding: 20px 22px; }

.summary-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13.5px; color: #6b7280;
  padding: 8px 0; border-bottom: 1px solid #f9fafb;
}
.summary-row:last-of-type { border-bottom: none; }
.summary-row.total {
  font-size: 16px; font-weight: 800; color: #0f172a;
  padding-top: 14px; margin-top: 6px;
  border-top: 1.5px solid #e5e7eb; border-bottom: none;
}
.summary-row .label { font-weight: 500; }
.summary-row.total .label { font-weight: 800; }
.summary-val { font-weight: 600; color: #0f172a; }
.summary-row.total .summary-val { color: #3b82f6; font-size: 1.2rem; }

/* Promo input */
.promo-wrap {
  display: flex; gap: 8px; margin: 16px 0;
}
.promo-input {
  flex: 1; border: 1.5px solid #e5e7eb; border-radius: 8px;
  padding: 9px 12px; font-family: 'Inter', sans-serif;
  font-size: 13px; color: #0f172a; outline: none;
  transition: border-color .15s;
}
.promo-input:focus { border-color: #3b82f6; }
.promo-input::placeholder { color: #9ca3af; }
.promo-btn {
  background: #f3f4f6; color: #374151; border: 1.5px solid #e5e7eb;
  border-radius: 8px; padding: 9px 14px;
  font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all .15s; white-space: nowrap;
}
.promo-btn:hover { background: #e5e7eb; }

/* Checkout button */
.checkout-btn {
  width: 100%; background: #3b82f6; color: #fff;
  border: none; border-radius: 10px;
  padding: 14px; margin-top: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 15px; font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 14px rgba(59,130,246,.3);
  transition: all .18s;
}
.checkout-btn:hover { background: #2563eb; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,.38); }
.checkout-btn:disabled { background: #93c5fd; cursor: not-allowed; transform: none; }

.continue-btn {
  width: 100%; background: transparent; color: #6b7280;
  border: 1.5px solid #e5e7eb; border-radius: 10px;
  padding: 12px; margin-top: 10px;
  font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all .15s;
}
.continue-btn:hover { border-color: #9ca3af; color: #374151; background: #f9fafb; }

/* Shipping note */
.shipping-note {
  font-size: 12px; color: #9ca3af;
  text-align: center; margin-top: 14px;
  display: flex; align-items: center; justify-content: center; gap: 5px;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-page  { padding: 24px 20px 60px; }
  .cart-layout { grid-template-columns: 1fr; }
  .summary-card { position: static; }
}
@media (max-width: 480px) {
  .cart-item { gap: 12px; padding: 14px 16px; }
  .cart-item-img, .cart-item-img-ph { width: 56px; height: 56px; }
}
`;

function injectStyles() {
  if (document.getElementById("cart-styles")) return;
  const tag = document.createElement("style");
  tag.id = "cart-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Sample local cart (replace with real cart state/context) ──
const INITIAL_CART = [];

// ── Component ──────────────────────────────────────────────
const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems]     = useState(INITIAL_CART);
  const [promo, setPromo]     = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => { injectStyles(); }, []);

  // ── Load cart from localStorage or API ──────────────────
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
     { setItems(JSON.parse(saved)); } 
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ── Handlers ─────────────────────────────────────────────
  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    if (window.confirm("Clear all items from cart?")) setItems([]);
  };

  const applyPromo = () => {
    if (promo.toLowerCase() === "save10") setDiscount(10);
    else alert("Invalid promo code.");
  };

  // ── Calculations ─────────────────────────────────────────
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal > 100 ? 0 : 9.99;
  const discountAmt = subtotal * (discount / 100);
  const total     = Math.max(0, subtotal - discountAmt + shipping);

  // ── Checkout ──────────────────────────────────────────────
  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.post("/orders", {
        items: items.map(i => ({
          product_id: i.id,
          quantity:   i.qty,
          price:      i.price,
        })),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("cart");
      setItems([]);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">

      {/* Breadcrumb */}
      <div className="cart-bc">
        <span className="cart-bc-link" onClick={() => navigate("/")}>Home</span>
        <span className="cart-bc-sep">/</span>
        <span className="cart-bc-cur">Cart</span>
      </div>

      {/* Header */}
      <div className="cart-header">
        <h1 className="cart-title">
          Shopping Cart
          {items.length > 0 && (
            <span className="cart-count">{items.length} items</span>
          )}
        </h1>
      </div>

      <div className="cart-layout">

        {/* Items */}
        <div className="cart-card">
          <div className="cart-card-header">
            <span className="cart-card-title">Your Items</span>
            {items.length > 0 && (
              <button className="cart-clear-btn" onClick={clearCart}>
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-text">Your cart is empty</p>
              <p className="cart-empty-sub">Add some products to get started</p>
              <button
                className="checkout-btn"
                style={{ maxWidth: 200, margin: "0 auto" }}
                onClick={() => navigate("/products")}
              >
                Shop Now
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                ) : (
                  <div className="cart-item-img-ph">📦</div>
                )}

                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  {item.category && (
                    <p className="cart-item-cat">{item.category}</p>
                  )}
                  <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                </div>

                <div className="cart-item-right">
                  <button className="cart-remove-btn" onClick={() => removeItem(item.id)}>
                    ×
                  </button>
                  <div className="cart-qty">
                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span className="cart-qty-num">{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <span className="cart-item-subtotal">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
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
              <div className="summary-row" style={{ color: "#16a34a" }}>
                <span className="label">Discount ({discount}%)</span>
                <span style={{ fontWeight: 600 }}>−${discountAmt.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span className="label">Shipping</span>
              <span className="summary-val">
                {shipping === 0 ? (
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>Free</span>
                ) : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row total">
              <span className="label">Total</span>
              <span className="summary-val">${total.toFixed(2)}</span>
            </div>

            {/* Promo */}
            <div className="promo-wrap">
              <input
                className="promo-input"
                placeholder="Promo code"
                value={promo}
                onChange={e => setPromo(e.target.value)}
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

            <button className="continue-btn" onClick={() => navigate("/products")}>
              ← Continue Shopping
            </button>

            <p className="shipping-note">
              🚚 Free shipping on orders over $100
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
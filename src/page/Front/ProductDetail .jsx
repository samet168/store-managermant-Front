import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

// ── CSS ────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.pd-page {
  min-height: 100vh;
  background: #f9fafb;
  font-family: 'Inter', sans-serif;
  padding: 40px 80px 80px;
}
.pd-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 28px; }
.pd-bc-link { font-size: 13px; color: #3b82f6; cursor: pointer; font-weight: 500; }
.pd-bc-link:hover { text-decoration: underline; }
.pd-bc-sep { font-size: 13px; color: #d1d5db; }
.pd-bc-cur { font-size: 13px; color: #9ca3af; }

.pd-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,.07);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
}
.pd-img-wrap { background: #f3f4f6; aspect-ratio: 1/1; overflow: hidden; }
.pd-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.pd-img:hover { transform: scale(1.04); }
.pd-img-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 80px; color: #d1d5db; }

.pd-info { padding: 40px; display: flex; flex-direction: column; }

.pd-category {
  display: inline-block; font-size: 11.5px; font-weight: 600;
  letter-spacing: 1.2px; text-transform: uppercase;
  color: #3b82f6; background: #eff6ff; border: 1px solid #bfdbfe;
  border-radius: 20px; padding: 3px 12px; margin-bottom: 14px; width: fit-content;
}
.pd-name { font-size: 1.9rem; font-weight: 800; color: #0f172a; line-height: 1.2; letter-spacing: -.5px; margin-bottom: 12px; }
.pd-price { font-size: 2rem; font-weight: 800; color: #3b82f6; margin-bottom: 16px; }

.pd-stock { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; width: fit-content; }
.pd-stock.in  { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.pd-stock.out { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.pd-stock-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

.pd-divider { border: none; border-top: 1px solid #f3f4f6; margin: 16px 0; }

.pd-desc-label { font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #9ca3af; margin-bottom: 8px; }
.pd-desc { font-size: 14.5px; color: #6b7280; line-height: 1.75; margin-bottom: 24px; flex: 1; }

.pd-qty-row { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
.pd-qty-label { font-size: 13px; font-weight: 600; color: #374151; }
.pd-qty-ctrl { display: flex; align-items: center; border: 1.5px solid #e5e7eb; border-radius: 9px; overflow: hidden; }
.pd-qty-btn { width: 36px; height: 36px; background: #f9fafb; border: none; font-size: 18px; font-weight: 600; color: #374151; cursor: pointer; transition: background .15s; display: flex; align-items: center; justify-content: center; }
.pd-qty-btn:hover { background: #f3f4f6; }
.pd-qty-num { width: 44px; text-align: center; font-size: 14px; font-weight: 700; color: #0f172a; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; line-height: 36px; }

.pd-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
.pd-btn-cart {
  flex: 1; background: #3b82f6; color: #fff; border: none; border-radius: 10px;
  padding: 13px 24px; font-family: 'Inter', sans-serif; font-size: 14.5px; font-weight: 700;
  cursor: pointer; box-shadow: 0 3px 12px rgba(59,130,246,.3); transition: all .18s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.pd-btn-cart:hover { background: #2563eb; transform: translateY(-1px); }
.pd-btn-cart:disabled { background: #93c5fd; cursor: not-allowed; transform: none; }

.pd-btn-buy {
  flex: 1; background: #0f172a; color: #fff; border: none; border-radius: 10px;
  padding: 13px 24px; font-family: 'Inter', sans-serif; font-size: 14.5px; font-weight: 700;
  cursor: pointer; transition: all .18s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.pd-btn-buy:hover { background: #1e293b; transform: translateY(-1px); }
.pd-btn-buy:disabled { opacity: .5; cursor: not-allowed; transform: none; }

.pd-btn-wish {
  width: 48px; height: 48px; background: #fff;
  border: 1.5px solid #e5e7eb; border-radius: 10px;
  cursor: pointer; font-size: 20px; transition: all .18s;
  display: flex; align-items: center; justify-content: center;
}
.pd-btn-wish:hover { border-color: #fca5a5; background: #fef2f2; }

/* Toast */
.pd-toast {
  position: fixed; bottom: 28px; left: 50%;
  transform: translateX(-50%);
  background: #0f172a; color: #fff;
  padding: 12px 22px; border-radius: 10px;
  font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
  display: flex; align-items: center; gap: 8px;
  z-index: 9999;
  animation: pd-slideup .3s ease;
}
@keyframes pd-slideup {
  from { opacity: 0; transform: translateX(-50%) translateY(16px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.pd-meta { margin-top: 4px; }
.pd-meta-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #9ca3af; padding: 7px 0; border-bottom: 1px solid #f3f4f6; }
.pd-meta-row:last-child { border-bottom: none; }
.pd-meta-label { font-weight: 600; color: #6b7280; min-width: 80px; }
.pd-meta-val { color: #374151; }

.pd-skeleton {
  background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
  background-size: 200% 100%; animation: pd-shimmer 1.4s infinite; border-radius: 8px;
}
@keyframes pd-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

@media (max-width: 768px) {
  .pd-page { padding: 24px 16px 60px; }
  .pd-card { grid-template-columns: 1fr; }
  .pd-info { padding: 24px 20px; }
  .pd-name { font-size: 1.5rem; }
  .pd-price { font-size: 1.6rem; }
}
`;

function injectStyles() {
  if (document.getElementById("pd-styles")) return;
  const tag = document.createElement("style");
  tag.id = "pd-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── addToCart utility ──────────────────────────────────────
const addToCart = (product, qty) => {
  const cart     = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id:       product.id,
      name:     product.name,
      price:    Number(product.price),
      image:    product.image || null,
      category: product.category?.name || "",
      qty,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ── Component ──────────────────────────────────────────────
const ProductDetail = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty]         = useState(1);
  const [wished, setWished]   = useState(false);
  const [toast, setToast]     = useState("");

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Fetch product failed:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Show toast 2s
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    showToast(`✓ ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate("/cart");           // ← go to cart
  };

  // Skeleton
  if (loading) {
    return (
      <div className="pd-page">
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          <div className="pd-skeleton" style={{ width: 60, height: 16 }} />
          <div className="pd-skeleton" style={{ width: 8,  height: 16 }} />
          <div className="pd-skeleton" style={{ width: 80, height: 16 }} />
        </div>
        <div className="pd-card">
          <div className="pd-skeleton" style={{ aspectRatio: "1/1" }} />
          <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="pd-skeleton" style={{ width: 80,    height: 22 }} />
            <div className="pd-skeleton" style={{ width: "70%", height: 32 }} />
            <div className="pd-skeleton" style={{ width: 100,   height: 36 }} />
            <div className="pd-skeleton" style={{ width: "100%", height: 80 }} />
            <div className="pd-skeleton" style={{ width: "100%", height: 48 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return (
    <div className="pd-page">
      <p style={{ color: "#9ca3af", textAlign: "center", paddingTop: 60 }}>Product not found.</p>
    </div>
  );

  const inStock = (product.quantity ?? product.stock ?? 1) > 0;

  return (
    <div className="pd-page">

      {/* Breadcrumb */}
      <div className="pd-bc">
        <span className="pd-bc-link" onClick={() => navigate("/")}>Home</span>
        <span className="pd-bc-sep">/</span>
        <span className="pd-bc-link" onClick={() => navigate("/products")}>Products</span>
        <span className="pd-bc-sep">/</span>
        <span className="pd-bc-cur">{product.name}</span>
      </div>

      {/* Card */}
      <div className="pd-card">

        {/* Image */}
        <div className="pd-img-wrap">
          {product.image ? (
            <img src={product.image} alt={product.name} className="pd-img" />
          ) : (
            <div className="pd-img-ph">📦</div>
          )}
        </div>

        {/* Info */}
        <div className="pd-info">
          {product.category?.name && (
            <span className="pd-category">{product.category.name}</span>
          )}
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-price">${Number(product.price).toFixed(2)}</p>

          <span className={`pd-stock ${inStock ? "in" : "out"}`}>
            <span className="pd-stock-dot" />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>

          <hr className="pd-divider" />

          <p className="pd-desc-label">Description</p>
          <p className="pd-desc">{product.description || "No description available."}</p>

          {inStock && (
            <div className="pd-qty-row">
              <span className="pd-qty-label">Qty</span>
              <div className="pd-qty-ctrl">
                <button className="pd-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="pd-qty-num">{qty}</span>
                <button className="pd-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>
          )}

          <div className="pd-actions">
            <button className="pd-btn-cart" onClick={handleAddToCart} disabled={!inStock}>
              🛒 Add to Cart
            </button>
            <button className="pd-btn-buy" onClick={handleBuyNow} disabled={!inStock}>
              Buy Now
            </button>
            <button className="pd-btn-wish" onClick={() => setWished(w => !w)} title="Wishlist">
              {wished ? "❤️" : "🤍"}
            </button>
          </div>

          <div className="pd-meta">
            {product.sku && (
              <div className="pd-meta-row">
                <span className="pd-meta-label">SKU</span>
                <span className="pd-meta-val">{product.sku}</span>
              </div>
            )}
            {product.category?.name && (
              <div className="pd-meta-row">
                <span className="pd-meta-label">Category</span>
                <span className="pd-meta-val">{product.category.name}</span>
              </div>
            )}
            {product.quantity !== undefined && (
              <div className="pd-meta-row">
                <span className="pd-meta-label">Stock</span>
                <span className="pd-meta-val">{product.quantity} units</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="pd-toast">{toast}</div>}

    </div>
  );
};

export default ProductDetail;
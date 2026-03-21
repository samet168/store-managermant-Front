import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// ── CSS ────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.pp-page {
  min-height: 100vh;
  background: #f9fafb;
  font-family: 'Inter', sans-serif;
  padding: 40px 80px 80px;
}

/* Header */
.pp-header { margin-bottom: 28px; }
.pp-title  { font-size: 2rem; font-weight: 800; color: #0f172a; letter-spacing: -.5px; margin-bottom: 4px; }
.pp-sub    { font-size: 14px; color: #6b7280; }

/* Controls */
.pp-controls { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }

.pp-search-wrap {
  display: flex; align-items: center;
  background: #fff; border: 1.5px solid #e5e7eb;
  border-radius: 10px; overflow: hidden;
  transition: border-color .15s, box-shadow .15s;
  flex: 1; min-width: 200px; max-width: 340px;
}
.pp-search-wrap:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.12); }
.pp-search-input {
  flex: 1; border: none; outline: none; padding: 10px 14px;
  font-family: 'Inter', sans-serif; font-size: 14px; color: #0f172a; background: transparent;
}
.pp-search-input::placeholder { color: #9ca3af; }
.pp-search-ico { padding: 0 12px; color: #9ca3af; font-size: 15px; }
.pp-search-clear {
  padding: 0 10px; cursor: pointer; color: #9ca3af;
  font-size: 18px; background: none; border: none; line-height: 1;
}

.pp-sort {
  background: #fff; border: 1.5px solid #e5e7eb; border-radius: 10px;
  padding: 9px 14px; font-family: 'Inter', sans-serif;
  font-size: 13.5px; color: #374151; outline: none; cursor: pointer;
}
.pp-sort:focus { border-color: #3b82f6; }

/* Category pills */
.pp-cats { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
.pp-pill {
  padding: 6px 16px; border-radius: 20px; border: 1.5px solid #e5e7eb;
  background: #fff; color: #6b7280; font-family: 'Inter', sans-serif;
  font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s; white-space: nowrap;
}
.pp-pill:hover { border-color: #3b82f6; color: #3b82f6; }
.pp-pill.on { background: #3b82f6; color: #fff; border-color: #3b82f6; box-shadow: 0 2px 8px rgba(59,130,246,.28); }

/* Result info */
.pp-info { font-size: 13px; color: #9ca3af; margin-bottom: 20px; }
.pp-info b { color: #374151; }

/* Grid */
.pp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 20px; }

/* Card */
.pp-card {
  background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
  overflow: hidden; display: flex; flex-direction: column;
  transition: box-shadow .2s, transform .2s, border-color .2s; cursor: pointer;
}
.pp-card:hover { box-shadow: 0 10px 32px rgba(0,0,0,.1); transform: translateY(-4px); border-color: #dbeafe; }

.pp-img-wrap { aspect-ratio: 1/1; background: #f3f4f6; overflow: hidden; position: relative; }
.pp-img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s; }
.pp-card:hover .pp-img { transform: scale(1.06); }
.pp-img-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 52px; color: #d1d5db; }

.pp-badge-wrap { position: absolute; top: 10px; left: 10px; display: flex; flex-direction: column; gap: 5px; }
.pp-badge {
  font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 20px;
  width: fit-content;
}
.pp-badge.out  { background: #fef2f2; color: #dc2626; }
.pp-badge.low  { background: #fffbeb; color: #b45309; }

.pp-wish {
  position: absolute; top: 10px; right: 10px;
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,.9); border: none; cursor: pointer;
  font-size: 15px; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,.1); transition: all .15s;
}
.pp-wish:hover { background: #fef2f2; transform: scale(1.1); }

.pp-body { padding: 13px 15px 6px; flex: 1; }
.pp-cat  { font-size: 11px; font-weight: 600; color: #3b82f6; text-transform: uppercase; letter-spacing: .8px; margin-bottom: 4px; }
.pp-name { font-size: 14px; font-weight: 600; color: #111827; line-height: 1.4; margin-bottom: 7px; }
.pp-price { font-size: 1.05rem; font-weight: 800; color: #3b82f6; }
.pp-stock { font-size: 11.5px; margin-top: 3px; }
.pp-stock.low { color: #b45309; }
.pp-stock.out { color: #dc2626; }

.pp-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; padding: 8px 13px 13px; }
.pp-btn-cart {
  background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe;
  border-radius: 8px; padding: 8px 6px; font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s;
  display: flex; align-items: center; justify-content: center; gap: 4px;
}
.pp-btn-cart:hover { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.pp-btn-cart:disabled { opacity: .4; cursor: not-allowed; }
.pp-btn-view {
  background: #0f172a; color: #fff; border: none; border-radius: 8px;
  padding: 8px 6px; font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600; cursor: pointer; transition: background .15s;
}
.pp-btn-view:hover { background: #1e293b; }

/* Skeleton */
.pp-skel-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; }
.pp-skel {
  background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
  background-size: 200% 100%; animation: pp-shim 1.4s infinite; border-radius: 6px;
}
@keyframes pp-shim { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

/* Empty */
.pp-empty { grid-column: 1/-1; text-align: center; padding: 60px 20px; }
.pp-empty-icon { font-size: 52px; margin-bottom: 14px; }
.pp-empty-title { font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 5px; }
.pp-empty-sub { font-size: 13.5px; color: #9ca3af; }

/* Toast */
.pp-toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  background: #0f172a; color: #fff; padding: 12px 22px; border-radius: 10px;
  font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
  display: flex; align-items: center; gap: 8px; z-index: 9999;
  animation: pp-up .3s ease;
}
@keyframes pp-up {
  from { opacity:0; transform:translateX(-50%) translateY(14px); }
  to   { opacity:1; transform:translateX(-50%) translateY(0); }
}

/* Pagination */
.pp-pagi { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 40px; flex-wrap: wrap; }
.pp-pg-btn {
  width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
  border: 1.5px solid #e5e7eb; border-radius: 9px;
  background: #fff; color: #374151;
  font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all .15s;
}
.pp-pg-btn:hover:not(:disabled) { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
.pp-pg-btn.on  { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.pp-pg-btn:disabled { opacity: .35; cursor: not-allowed; }
.pp-pg-dots { font-size: 14px; color: #9ca3af; padding: 0 4px; }

/* Responsive */
@media (max-width: 900px) { .pp-page { padding: 28px 24px 60px; } }
@media (max-width: 600px) {
  .pp-page { padding: 20px 14px 60px; }
  .pp-title { font-size: 1.5rem; }
  .pp-search-wrap { max-width: 100%; }
  .pp-controls { flex-direction: column; align-items: stretch; }
}
`;

function injectStyles() {
  if (document.getElementById("pp-styles")) return;
  const tag = document.createElement("style");
  tag.id = "pp-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── addToCart ──────────────────────────────────────────────
const addToCartUtil = (product) => {
  const cart     = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find(i => i.id === product.id);
  if (existing) { existing.qty += 1; }
  else cart.push({ id: product.id, name: product.name, price: Number(product.price), image: product.image || null, category: product.category?.name || "", qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ── Component ──────────────────────────────────────────────
const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts]       = useState([]);
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [activeCat, setActiveCat]     = useState("all");
  const [sort, setSort]               = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage]       = useState(1);
  const [total, setTotal]             = useState(0);
  const [wished, setWished]           = useState({});
  const [toast, setToast]             = useState("");

  useEffect(() => { injectStyles(); }, []);

  // Fetch categories
  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data.data || []))
      .catch(console.error);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, per_page: 12 };
      if (search)           params.search      = search;
      if (activeCat !== "all") params.category_id = activeCat;
      if (sort !== "default")  params.sort        = sort;

      const res = await api.get("/products", { params });
      setProducts(res.data.data            || []);
      setCurrentPage(res.data.current_page || 1);
      setLastPage(res.data.last_page       || 1);
      setTotal(res.data.total              || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, activeCat, sort]);

  // Reset page on filter change
  useEffect(() => { setCurrentPage(1); fetchProducts(1); }, [search, activeCat, sort]);

  // Fetch on page change
  useEffect(() => { fetchProducts(currentPage); }, [currentPage]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000); };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if ((product.quantity ?? product.stock ?? 1) <= 0) return;
    addToCartUtil(product);
    showToast(`✓ ${product.name} added to cart`);
  };

  const toggleWish = (e, id) => {
    e.stopPropagation();
    setWished(p => ({ ...p, [id]: !p[id] }));
  };

  // Pagination pages
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  const visPages = pages.filter(p => p === 1 || p === lastPage || (p >= currentPage - 1 && p <= currentPage + 1));

  return (
    <div className="pp-page">

      {/* Header */}
      <div className="pp-header">
        <h1 className="pp-title">Shop</h1>
        <p className="pp-sub">Discover our full collection of premium audio gear</p>
      </div>

      {/* Controls */}
      <div className="pp-controls">
        <div className="pp-search-wrap">
          <span className="pp-search-ico">🔍</span>
          <input
            className="pp-search-input"
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="pp-search-clear" onClick={() => setSearch("")}>×</button>
          )}
        </div>

        <select className="pp-sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {/* Category pills */}
      <div className="pp-cats">
        <button className={`pp-pill${activeCat === "all" ? " on" : ""}`} onClick={() => setActiveCat("all")}>
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`pp-pill${activeCat === cat.id ? " on" : ""}`}
            onClick={() => setActiveCat(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Result count */}
      {!loading && (
        <p className="pp-info">
          Showing <b>{products.length}</b> of <b>{total}</b> products
        </p>
      )}

      {/* Grid */}
      <div className="pp-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="pp-skel-card">
              <div className="pp-skel" style={{ aspectRatio: "1/1" }} />
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>
                <div className="pp-skel" style={{ height: 12, width: "50%" }} />
                <div className="pp-skel" style={{ height: 16, width: "80%" }} />
                <div className="pp-skel" style={{ height: 20, width: "40%" }} />
              </div>
            </div>
          ))
        ) : products.length === 0 ? (
          <div className="pp-empty">
            <div className="pp-empty-icon">📦</div>
            <p className="pp-empty-title">No products found</p>
            <p className="pp-empty-sub">Try a different search or category</p>
          </div>
        ) : (
          products.map(product => {
            const qty     = product.quantity ?? product.stock;
            const inStock = (qty ?? 1) > 0;
            const isLow   = qty !== undefined && qty > 0 && qty <= 5;

            return (
              <div
                key={product.id}
                className="pp-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="pp-img-wrap">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="pp-img" />
                  ) : (
                    <div className="pp-img-ph">📦</div>
                  )}

                  <div className="pp-badge-wrap">
                    {!inStock && <span className="pp-badge out">Out of Stock</span>}
                    {inStock && isLow && <span className="pp-badge low">Only {qty} left</span>}
                  </div>

                  <button className="pp-wish" onClick={e => toggleWish(e, product.id)}>
                    {wished[product.id] ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="pp-body">
                  {product.category?.name && <p className="pp-cat">{product.category.name}</p>}
                  <p className="pp-name">{product.name}</p>
                  <p className="pp-price">${Number(product.price).toFixed(2)}</p>
                  {!inStock && <p className="pp-stock out">Out of stock</p>}
                  {inStock && isLow && <p className="pp-stock low">Only {qty} left</p>}
                </div>

                <div className="pp-actions">
                  <button
                    className="pp-btn-cart"
                    onClick={e => handleAddToCart(e, product)}
                    disabled={!inStock}
                  >
                    🛒 Add
                  </button>
                  <button
                    className="pp-btn-view"
                    onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                  >
                    View →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {!loading && lastPage > 1 && (
        <div className="pp-pagi">
          <button className="pp-pg-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>←</button>
          {visPages.map((p, i) => (
            <React.Fragment key={p}>
              {i > 0 && visPages[i - 1] !== p - 1 && <span className="pp-pg-dots">…</span>}
              <button
                className={`pp-pg-btn${currentPage === p ? " on" : ""}`}
                onClick={() => setCurrentPage(p)}
              >{p}</button>
            </React.Fragment>
          ))}
          <button className="pp-pg-btn" disabled={currentPage === lastPage} onClick={() => setCurrentPage(p => p + 1)}>→</button>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="pp-toast">{toast}</div>}

    </div>
  );
};

export default Products;
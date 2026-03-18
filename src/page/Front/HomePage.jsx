
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../assets/style/Front/HomePage.css';

/* ─── Static data ─────────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    title: 'Free Delivery',
    desc: 'Free shipping on all orders over $100',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Self Pickup',
    desc: 'Pick up from our store at your convenience',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '1-Year Warranty',
    desc: 'Full warranty coverage on all products',
  },
];

/* ─── Sub-components ──────────────────────────────────────────── */

function ProductCard({ product, onAddToCart, onBuyNow, onViewDetail }) {
  return (
<div className="product-card">
  <div className="product-img-wrap">
    <img src={product.image} alt={product.name} className="product-img" />
  </div>

  <div className="product-info">
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">${Number(product.price).toFixed(2)}</p>
  </div>

  <div className="product-actions">
    <button className="btn btn-ghost" onClick={() => onAddToCart(product)}>
      🛒 Add
    </button>
    <button className="btn btn-primary" onClick={() => onBuyNow(product)}>
      Buy
    </button>
  </div>

  <button className="btn-detail" onClick={() => onViewDetail(product)}>
    View Details →
  </button>
</div>
  );
}

function CategoryCard({ cat }) {
  return (
    <a href={cat.link} className="category-card">
      <div className="category-img-wrap">
        <img src={cat.img} alt={cat.name} />
      </div>
      <span className="category-name">{cat.name}</span>
    </a>
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

/* ─── Main Page ──────────────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts]     = useState([]); 
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products'),
        ]);
        setCategories(catRes.data.data);
        setProducts(prodRes.data.data);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddToCart  = (p) => alert(`${p.name} added to cart!`);
  const handleBuyNow     = (p) => alert(`Proceeding to buy ${p.name}!`);
  const handleViewDetail = (p) => navigate(`/product/${p.id}`);

  return (
    <>
      

      <div className="page">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero-text">
            <span className="hero-tag">Premium Audio</span>
            <h1 className="hero-heading">Elevate Your<br />Audio Journey</h1>
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

        {/* ── Featured Products ────────────────────────────────── */}
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
              {products.slice(0, 10).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Categories ───────────────────────────────────────── */}
        {categories.length > 0 && (
          <section className="section section-alt">
            <div className="section-head">
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <div className="categories-grid">
              {categories.map((cat, i) => (
                <CategoryCard key={i} cat={cat} />
              ))}
            </div>
          </section>
        )}

        {/* ── Benefits ─────────────────────────────────────────── */}
        <section className="section benefits-section">
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <BenefitCard key={i} benefit={b} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

/* ─── Styles (scoped via class names) ───────────────────────── */
// const styles = `
//   /* ── Reset / Base ── */
//   .page {
//     font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
//     color: #1a1a2e;
//     background: #ffffff;
//   }

//   /* ── Hero ── */
//   .hero {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 48px;
//     padding: 80px 64px;
//     background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 60%, #16213e 100%);
//     overflow: hidden;
//     position: relative;
//   }

//   .hero::before {
//     content: '';
//     position: absolute;
//     top: -80px;
//     right: -80px;
//     width: 400px;
//     height: 400px;
//     background: radial-gradient(circle, rgba(0,216,255,0.08) 0%, transparent 70%);
//     pointer-events: none;
//   }

//   .hero-text {
//     flex: 1;
//     min-width: 300px;
//     z-index: 1;
//   }

//   .hero-tag {
//     display: inline-block;
//     font-size: 12px;
//     font-weight: 600;
//     letter-spacing: 2px;
//     text-transform: uppercase;
//     color: #00d8ff;
//     background: rgba(0,216,255,0.1);
//     border: 1px solid rgba(0,216,255,0.25);
//     border-radius: 20px;
//     padding: 4px 14px;
//     margin-bottom: 20px;
//   }

//   .hero-heading {
//     font-size: clamp(2.2rem, 4vw, 3.5rem);
//     font-weight: 800;
//     line-height: 1.15;
//     color: #ffffff;
//     margin: 0 0 20px;
//     letter-spacing: -0.5px;
//   }

//   .hero-sub {
//     font-size: 1.05rem;
//     color: rgba(255,255,255,0.6);
//     line-height: 1.75;
//     margin: 0 0 36px;
//     max-width: 460px;
//   }

//   .hero-btns {
//     display: flex;
//     gap: 12px;
//     flex-wrap: wrap;
//   }

//   .hero-media {
//     flex: 0 0 420px;
//     z-index: 1;
//   }

//   .hero-media img {
//     width: 100%;
//     border-radius: 20px;
//     object-fit: cover;
//     aspect-ratio: 1 / 1;
//     box-shadow: 0 32px 64px rgba(0,0,0,0.5);
//   }

//   /* ── Sections ── */
//   .section {
//     padding: 72px 64px;
//   }

//   .section-alt {
//     background: #f8f9fc;
//   }

//   .section-head {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: 36px;
//   }

//   .section-title {
//     font-size: 1.75rem;
//     font-weight: 700;
//     color: #0f0f1a;
//     margin: 0;
//     letter-spacing: -0.3px;
//   }

//   /* ── Buttons ── */
//   .btn {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     border: none;
//     border-radius: 10px;
//     padding: 10px 20px;
//     font-size: 0.9rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.2s ease;
//     text-decoration: none;
//     white-space: nowrap;
//   }

//   .btn-primary {
//     background: #00d8ff;
//     color: #0f0f1a;
//   }
//   .btn-primary:hover {
//     background: #00c4e8;
//     transform: translateY(-1px);
//     box-shadow: 0 6px 20px rgba(0,216,255,0.35);
//   }

//   .btn-outline {
//     background: transparent;
//     color: #ffffff;
//     border: 1.5px solid rgba(255,255,255,0.3);
//   }
//   .btn-outline:hover {
//     background: rgba(255,255,255,0.07);
//     border-color: rgba(255,255,255,0.6);
//   }

//   .btn-ghost {
//     background: transparent;
//     color: #00d8ff;
//     padding: 8px 14px;
//   }
//   .btn-ghost:hover {
//     background: rgba(0,216,255,0.08);
//   }

//   .btn-lg {
//     padding: 14px 28px;
//     font-size: 1rem;
//     border-radius: 12px;
//   }

//   /* ── Product Grid ── */
//   .products-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//     gap: 24px;
//   }

//   .product-card {
//     background: #fff;
//     border: 1px solid #eaecf0;
//     border-radius: 16px;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     transition: box-shadow 0.25s, transform 0.25s;
//   }

//   .product-card:hover {
//     box-shadow: 0 12px 32px rgba(0,0,0,0.1);
//     transform: translateY(-3px);
//   }

//   .product-img-wrap {
//     aspect-ratio: 1 / 1;
//     background: #f4f5f7;
//     overflow: hidden;
//   }

//   .product-img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.35s ease;
//   }

//   .product-card:hover .product-img {
//     transform: scale(1.04);
//   }

//   .product-info {
//     padding: 16px 16px 8px;
//     flex: 1;
//   }

//   .product-name {
//     font-size: 0.95rem;
//     font-weight: 600;
//     color: #1a1a2e;
//     margin: 0 0 6px;
//     line-height: 1.4;
//   }

//   .product-price {
//     font-size: 1.1rem;
//     font-weight: 700;
//     color: #00a8cc;
//     margin: 0;
//   }

//   .product-actions {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 8px;
//     padding: 8px 16px;
//   }

//   .btn-detail {
//     display: block;
//     width: 100%;
//     padding: 10px;
//     margin: 0;
//     background: transparent;
//     border: none;
//     border-top: 1px solid #eaecf0;
//     color: #6b7280;
//     font-size: 0.85rem;
//     font-weight: 500;
//     cursor: pointer;
//     transition: color 0.2s, background 0.2s;
//     text-align: center;
//     border-radius: 0 0 16px 16px;
//   }

//   .btn-detail:hover {
//     background: #f8f9fc;
//     color: #0f0f1a;
//   }

//   /* ── Skeletons ── */
//   .skeleton-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//     gap: 24px;
//   }

//   .skeleton-card {
//     height: 320px;
//     border-radius: 16px;
//     background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//     background-size: 200% 100%;
//     animation: shimmer 1.4s infinite;
//   }

//   @keyframes shimmer {
//     0%   { background-position: 200% 0; }
//     100% { background-position: -200% 0; }
//   }

//   /* ── Categories ── */
//   .categories-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
//     gap: 20px;
//   }

//   .category-card {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 12px;
//     padding: 24px 16px;
//     background: #fff;
//     border: 1px solid #eaecf0;
//     border-radius: 16px;
//     text-decoration: none;
//     transition: box-shadow 0.2s, transform 0.2s;
//   }

//   .category-card:hover {
//     box-shadow: 0 8px 24px rgba(0,0,0,0.08);
//     transform: translateY(-2px);
//   }

//   .category-img-wrap {
//     width: 72px;
//     height: 72px;
//     border-radius: 50%;
//     background: #f0fafe;
//     overflow: hidden;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .category-img-wrap img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   .category-name {
//     font-size: 0.9rem;
//     font-weight: 600;
//     color: #1a1a2e;
//     text-align: center;
//   }

//   /* ── Benefits ── */
//   .benefits-section {
//     background: #0f0f1a;
//   }

//   .benefits-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//     gap: 24px;
//   }

//   .benefit-card {
//     padding: 32px 28px;
//     border: 1px solid rgba(255,255,255,0.08);
//     border-radius: 16px;
//     background: rgba(255,255,255,0.04);
//     transition: background 0.2s;
//   }

//   .benefit-card:hover {
//     background: rgba(0,216,255,0.05);
//     border-color: rgba(0,216,255,0.2);
//   }

//   .benefit-icon {
//     width: 48px;
//     height: 48px;
//     border-radius: 12px;
//     background: rgba(0,216,255,0.12);
//     color: #00d8ff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 16px;
//   }

//   .benefit-title {
//     font-size: 1rem;
//     font-weight: 700;
//     color: #ffffff;
//     margin: 0 0 8px;
//   }

//   .benefit-desc {
//     font-size: 0.875rem;
//     color: rgba(255,255,255,0.5);
//     line-height: 1.65;
//     margin: 0;
//   }

//   /* ── Responsive ── */
//   @media (max-width: 900px) {
//     .hero {
//       flex-direction: column;
//       padding: 56px 32px;
//       text-align: center;
//     }
//     .hero-sub { margin-left: auto; margin-right: auto; }
//     .hero-btns { justify-content: center; }
//     .hero-media { flex: unset; width: 100%; max-width: 380px; }
//   }

//   @media (max-width: 600px) {
//     .section { padding: 48px 20px; }
//     .hero { padding: 48px 20px; }
//     .section-title { font-size: 1.4rem; }
//   }
// `;
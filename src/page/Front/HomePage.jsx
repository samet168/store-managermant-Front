import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../assets/style/Front/HomePage.css';

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

/* ─── Sub-components ──────────────────────────────────── */
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

/* ─── Main Page ───────────────────────────────────────── */
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
        setCategories(catRes.data.data || []);
        setProducts(prodRes.data.data   || []);
      } catch (err) {
        console.error('Failed to load:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddToCart  = (p) => alert(`${p.name} added to cart!`);
  const handleBuyNow     = (p) => navigate(`/checkout?product=${p.id}`);
  const handleViewDetail = (p) => navigate(`/product/${p.id}`);

  return (
    <div className="page">

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

      {/* Categories */}
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
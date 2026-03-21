import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.ab-page {
  font-family: 'Inter', sans-serif;
  background: #fff;
  color: #111827;
}

/* ── Hero ─────────────────────────────────────────────── */
.ab-hero {
  background: #f8faff;
  border-bottom: 1px solid #e5e7eb;
  padding: 80px 80px 72px;
  display: flex;
  align-items: center;
  gap: 60px;
}
.ab-hero-text { flex: 1; }
.ab-tag {
  display: inline-block;
  font-size: 11.5px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: #3b82f6; background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 20px; padding: 4px 14px;
  margin-bottom: 18px;
}
.ab-hero-title {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800; color: #0f172a;
  line-height: 1.15; letter-spacing: -.8px;
  margin-bottom: 18px;
}
.ab-hero-title span { color: #3b82f6; }
.ab-hero-desc {
  font-size: 1rem; color: #6b7280;
  line-height: 1.8; max-width: 480px;
  margin-bottom: 32px;
}
.ab-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.ab-btn {
  display: inline-flex; align-items: center; gap: 7px;
  border: none; border-radius: 9px; padding: 11px 22px;
  font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all .18s; text-decoration: none; white-space: nowrap;
}
.ab-btn-primary { background: #3b82f6; color: #fff; box-shadow: 0 2px 10px rgba(59,130,246,.28); }
.ab-btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
.ab-btn-outline { background: #fff; color: #374151; border: 1.5px solid #d1d5db; }
.ab-btn-outline:hover { border-color: #9ca3af; background: #f9fafb; }

.ab-hero-img {
  flex: 0 0 400px;
}
.ab-hero-img img {
  width: 100%; border-radius: 18px;
  object-fit: cover; aspect-ratio: 4/3;
  box-shadow: 0 20px 48px rgba(0,0,0,.1);
}

/* ── Stats ────────────────────────────────────────────── */
.ab-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid #e5e7eb;
}
.ab-stat {
  padding: 36px 28px;
  border-right: 1px solid #e5e7eb;
  text-align: center;
}
.ab-stat:last-child { border-right: none; }
.ab-stat-num {
  font-size: 2.2rem; font-weight: 800;
  color: #3b82f6; letter-spacing: -.5px;
  margin-bottom: 6px;
}
.ab-stat-label { font-size: 13.5px; color: #6b7280; font-weight: 500; }

/* ── Section base ─────────────────────────────────────── */
.ab-section { padding: 72px 80px; }
.ab-section-alt { background: #f9fafb; }
.ab-section-title {
  font-size: 1.7rem; font-weight: 800;
  color: #0f172a; letter-spacing: -.4px;
  margin-bottom: 8px;
}
.ab-section-sub { font-size: 14.5px; color: #6b7280; margin-bottom: 40px; max-width: 520px; }

/* ── Mission / Story ──────────────────────────────────── */
.ab-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.ab-two-col img {
  width: 100%; border-radius: 14px;
  object-fit: cover; aspect-ratio: 4/3;
  box-shadow: 0 8px 28px rgba(0,0,0,.08);
}
.ab-text-block p {
  font-size: 14.5px; color: #6b7280;
  line-height: 1.8; margin-bottom: 16px;
}
.ab-text-block p:last-child { margin-bottom: 0; }

/* ── Values ───────────────────────────────────────────── */
.ab-values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.ab-value-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 28px 24px;
  transition: box-shadow .2s, transform .2s, border-color .2s;
}
.ab-value-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  transform: translateY(-3px);
  border-color: #bfdbfe;
}
.ab-value-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  background: #eff6ff; color: #3b82f6;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; margin-bottom: 16px;
}
.ab-value-title {
  font-size: 15px; font-weight: 700;
  color: #0f172a; margin-bottom: 8px;
}
.ab-value-desc { font-size: 13.5px; color: #6b7280; line-height: 1.65; }

/* ── Team ─────────────────────────────────────────────── */
.ab-team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 22px;
}
.ab-team-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 28px 20px;
  text-align: center;
  transition: box-shadow .2s, transform .2s;
}
.ab-team-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  transform: translateY(-3px);
}
.ab-team-avatar {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: #fff; font-size: 26px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
}
.ab-team-name { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.ab-team-role { font-size: 13px; color: #6b7280; }

/* ── CTA ──────────────────────────────────────────────── */
.ab-cta {
  background: #0f172a;
  padding: 72px 80px;
  text-align: center;
}
.ab-cta-title {
  font-size: 2rem; font-weight: 800;
  color: #f0f4ff; letter-spacing: -.5px;
  margin-bottom: 14px;
}
.ab-cta-sub {
  font-size: 15px; color: rgba(240,244,255,.55);
  margin-bottom: 32px; max-width: 460px; margin-left: auto; margin-right: auto;
  line-height: 1.75;
}

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 900px) {
  .ab-hero    { flex-direction: column; padding: 56px 32px; text-align: center; }
  .ab-hero-desc { margin: 0 auto 28px; }
  .ab-hero-btns { justify-content: center; }
  .ab-hero-img { flex: unset; width: 100%; max-width: 380px; margin: 0 auto; }
  .ab-stats { grid-template-columns: repeat(2, 1fr); }
  .ab-stat  { border-right: none; border-bottom: 1px solid #e5e7eb; }
  .ab-stat:nth-child(odd) { border-right: 1px solid #e5e7eb; }
  .ab-stat:nth-last-child(-n+2) { border-bottom: none; }
  .ab-section { padding: 52px 32px; }
  .ab-two-col { grid-template-columns: 1fr; }
  .ab-cta { padding: 56px 32px; }
}
@media (max-width: 600px) {
  .ab-hero    { padding: 44px 20px; }
  .ab-section { padding: 44px 20px; }
  .ab-cta     { padding: 44px 20px; }
  .ab-stats   { grid-template-columns: repeat(2, 1fr); }
  .ab-section-title { font-size: 1.4rem; }
}
`;

function injectStyles() {
  if (document.getElementById("ab-styles")) return;
  const tag = document.createElement("style");
  tag.id = "ab-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Data ───────────────────────────────────────────────────
const VALUES = [
  { icon: "🎧", title: "Sound Excellence", desc: "We curate only the finest audio equipment from world-class brands." },
  { icon: "🛡️", title: "Trust & Quality",  desc: "Every product is tested and verified before reaching our shelves." },
  { icon: "🚀", title: "Fast Delivery",    desc: "Same-day dispatch with free shipping on orders over $100." },
  { icon: "💬", title: "24/7 Support",     desc: "Our audio experts are always here to help you find the perfect gear." },
  { icon: "♻️", title: "Sustainability",   desc: "Committed to eco-friendly packaging and responsible sourcing." },
  { icon: "🏆", title: "Best Prices",      desc: "Price-match guarantee ensures you always get the best deal." },
];

const TEAM = [
  { name: "Sokha Chan",  role: "Founder & CEO",       initials: "SC" },
  { name: "Dara Pich",   role: "Head of Products",    initials: "DP" },
  { name: "Maly Heng",   role: "Customer Experience", initials: "MH" },
  { name: "Rith Keo",    role: "Tech Lead",           initials: "RK" },
];

const STATS = [
  { num: "10K+",  label: "Happy Customers" },
  { num: "500+",  label: "Products" },
  { num: "50+",   label: "Brands" },
  { num: "4.9★",  label: "Average Rating" },
];

// ── Component ──────────────────────────────────────────────
const About = () => {
  const navigate = useNavigate();

  useEffect(() => { injectStyles(); }, []);

  return (
    <div className="ab-page">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="ab-hero">
        <div className="ab-hero-text">
          <span className="ab-tag">About Us</span>
          <h1 className="ab-hero-title">
            Passionate About<br />
            <span>Perfect Sound</span>
          </h1>
          <p className="ab-hero-desc">
            We are a team of audiophiles dedicated to bringing you the world's
            finest audio equipment — from premium headphones to studio-grade speakers.
            Your perfect sound experience starts here.
          </p>
          <div className="ab-hero-btns">
            <button className="ab-btn ab-btn-primary" onClick={() => navigate("/products")}>
              Shop Now
            </button>
            <button className="ab-btn ab-btn-outline" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>
        </div>

        <div className="ab-hero-img">
          <img
            src="https://i.pinimg.com/1200x/19/28/7c/19287c8799f8c0ce38103cfe7a240bea.jpg"
            alt="Our store"
          />
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <div className="ab-stats">
        {STATS.map((s, i) => (
          <div key={i} className="ab-stat">
            <div className="ab-stat-num">{s.num}</div>
            <div className="ab-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Our Story ────────────────────────────────────── */}
      <section className="ab-section">
        <div className="ab-two-col">
          <div>
            <div className="ab-tag">Our Story</div>
            <h2 className="ab-section-title">Born from a Love of Music</h2>
            <div className="ab-text-block">
              <p>
                Founded in 2018 in Phnom Penh, StoreFront started as a small
                passion project by a group of music lovers who were frustrated by the
                lack of quality audio gear available locally.
              </p>
              <p>
                What began in a tiny apartment quickly grew into Cambodia's leading
                premium audio retailer — serving thousands of customers across the
                country with an ever-growing catalog of world-class products.
              </p>
              <p>
                Today, we partner with over 50 global brands to bring you the most
                comprehensive selection of headphones, speakers, earbuds, and
                professional audio equipment available anywhere in Southeast Asia.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80"
            alt="Our story"
          />
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="ab-section ab-section-alt">
        <div className="ab-two-col">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
            alt="Our mission"
          />
          <div>
            <div className="ab-tag">Our Mission</div>
            <h2 className="ab-section-title">Sound for Everyone</h2>
            <div className="ab-text-block">
              <p>
                Our mission is simple: make exceptional audio accessible to everyone.
                Whether you're a professional musician, a casual listener, or a
                gaming enthusiast — we have the perfect gear for you.
              </p>
              <p>
                We believe that great sound transforms the way you experience music,
                movies, and everyday life. That's why we're committed to offering
                only the highest-quality products at the most competitive prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="ab-section">
        <h2 className="ab-section-title">Why Choose Us</h2>
        <p className="ab-section-sub">
          We go beyond just selling products — we deliver an experience built on trust, quality, and passion.
        </p>
        <div className="ab-values-grid">
          {VALUES.map((v, i) => (
            <div key={i} className="ab-value-card">
              <div className="ab-value-icon">{v.icon}</div>
              <h4 className="ab-value-title">{v.title}</h4>
              <p className="ab-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────── */}
      <section className="ab-section ab-section-alt">
        <h2 className="ab-section-title">Meet the Team</h2>
        <p className="ab-section-sub">
          The people behind StoreFront — united by a love of great audio.
        </p>
        <div className="ab-team-grid">
          {TEAM.map((m, i) => (
            <div key={i} className="ab-team-card">
              <div className="ab-team-avatar">{m.initials}</div>
              <p className="ab-team-name">{m.name}</p>
              <p className="ab-team-role">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="ab-cta">
        <h2 className="ab-cta-title">Ready to Elevate Your Sound?</h2>
        <p className="ab-cta-sub">
          Browse our collection of premium audio gear and find your perfect match today.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="ab-btn ab-btn-primary"
            style={{ fontSize: 15, padding: "13px 28px" }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
          <button
            className="ab-btn ab-btn-outline"
            style={{ fontSize: 15, padding: "13px 28px", background: "transparent", color: "rgba(240,244,255,.7)", borderColor: "rgba(255,255,255,.2)" }}
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </button>
        </div>
      </section>

    </div>
  );
};

export default About;
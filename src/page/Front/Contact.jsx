import React, { useState, useEffect } from "react";

import api from "../../services/api";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.ct-page {
  font-family: 'Inter', sans-serif;
  background: #fff;
  color: #111827;
}

/* ── Hero ─────────────────────────────────────────────── */
.ct-hero {
  background: #f8faff;
  border-bottom: 1px solid #e5e7eb;
  padding: 72px 80px 60px;
  text-align: center;
}
.ct-tag {
  display: inline-block;
  font-size: 11.5px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: #3b82f6; background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 20px; padding: 4px 14px;
  margin-bottom: 16px;
}
.ct-hero-title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800; color: #0f172a;
  line-height: 1.2; letter-spacing: -.5px;
  margin-bottom: 14px;
}
.ct-hero-sub {
  font-size: 15px; color: #6b7280;
  line-height: 1.75; max-width: 480px;
  margin: 0 auto;
}

/* ── Main layout ──────────────────────────────────────── */
.ct-main {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  padding: 60px 80px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Contact form card ────────────────────────────────── */
.ct-form-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 2px 14px rgba(0,0,0,.06);
  overflow: hidden;
}
.ct-form-header {
  padding: 22px 28px 18px;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
}
.ct-form-title { font-size: 17px; font-weight: 700; color: #0f172a; margin: 0; }
.ct-form-sub   { font-size: 13px; color: #9ca3af; margin-top: 3px; }

.ct-form-body { padding: 26px 28px 30px; }

/* Row for 2 inputs side by side */
.ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

/* Form group */
.ct-fg { margin-bottom: 18px; }
.ct-label {
  font-size: 13px; font-weight: 600; color: #374151;
  margin-bottom: 6px; display: block;
}
.ct-req { color: #ef4444; margin-left: 2px; }

.ct-input, .ct-select, .ct-textarea {
  width: 100%; background: #fff;
  border: 1.5px solid #e5e7eb; border-radius: 9px;
  padding: 10px 14px; font-family: 'Inter', sans-serif;
  font-size: 14px; color: #0f172a; outline: none;
  transition: border-color .15s, box-shadow .15s;
  appearance: none;
}
.ct-input::placeholder,
.ct-textarea::placeholder { color: #9ca3af; }
.ct-input:focus, .ct-select:focus, .ct-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.12);
}
.ct-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }

/* Alerts */
.ct-alert-ok {
  background: #f0fdf4; border: 1.5px solid #86efac;
  border-radius: 9px; color: #16a34a; font-size: 13.5px;
  padding: 12px 16px; margin-bottom: 20px;
  display: flex; align-items: center; gap: 8px;
}
.ct-alert-err {
  background: #fef2f2; border: 1.5px solid #fca5a5;
  border-radius: 9px; color: #dc2626; font-size: 13.5px;
  padding: 12px 16px; margin-bottom: 20px;
  display: flex; align-items: center; gap: 8px;
}

/* Divider */
.ct-divider { border: none; border-top: 1px solid #f3f4f6; margin: 22px 0; }

/* Submit button */
.ct-btn-submit {
  width: 100%;
  background: #3b82f6; color: #fff; border: none;
  border-radius: 10px; padding: 13px;
  font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700;
  cursor: pointer; box-shadow: 0 3px 12px rgba(59,130,246,.3);
  transition: all .18s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.ct-btn-submit:not(:disabled):hover {
  background: #2563eb; transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59,130,246,.38);
}
.ct-btn-submit:disabled { background: #93c5fd; cursor: not-allowed; }

/* ── Info sidebar ─────────────────────────────────────── */
.ct-sidebar { display: flex; flex-direction: column; gap: 16px; }

.ct-info-card {
  background: #fff; border: 1px solid #e5e7eb;
  border-radius: 14px; padding: 22px 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
}
.ct-info-icon {
  width: 44px; height: 44px; border-radius: 11px;
  background: #eff6ff; color: #3b82f6; font-size: 20px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 13px;
}
.ct-info-title { font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
.ct-info-val   { font-size: 13.5px; color: #6b7280; line-height: 1.65; }
.ct-info-val a { color: #3b82f6; text-decoration: none; }
.ct-info-val a:hover { text-decoration: underline; }

/* Map placeholder */
.ct-map {
  background: #f3f4f6; border: 1px solid #e5e7eb;
  border-radius: 14px; height: 180px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px; color: #9ca3af; font-size: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
}
.ct-map-icon { font-size: 36px; }

/* Social links */
.ct-social { display: flex; gap: 10px; margin-top: 8px; }
.ct-social-btn {
  width: 36px; height: 36px; border-radius: 9px;
  background: #f3f4f6; border: 1px solid #e5e7eb;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; cursor: pointer; transition: all .15s;
  text-decoration: none;
}
.ct-social-btn:hover { background: #eff6ff; border-color: #bfdbfe; }

/* Hours table */
.ct-hours { width: 100%; font-size: 13px; }
.ct-hours tr { border-bottom: 1px solid #f3f4f6; }
.ct-hours tr:last-child { border-bottom: none; }
.ct-hours td { padding: 6px 0; color: #374151; }
.ct-hours td:first-child { color: #6b7280; width: 50%; }
.ct-hours .today td { font-weight: 600; color: #3b82f6; }
.ct-hours .today td:first-child { color: #3b82f6; }

/* Spinner */
@keyframes ct-spin { to { transform: rotate(360deg); } }

/* Responsive */
@media (max-width: 900px) {
  .ct-hero { padding: 52px 32px 44px; }
  .ct-main { grid-template-columns: 1fr; padding: 40px 32px 60px; }
  .ct-sidebar { order: -1; }
  .ct-sidebar { display: grid; grid-template-columns: 1fr 1fr; }
  .ct-map { grid-column: 1 / -1; }
}
@media (max-width: 600px) {
  .ct-hero { padding: 40px 20px 36px; }
  .ct-main { padding: 28px 16px 48px; }
  .ct-row  { grid-template-columns: 1fr; }
  .ct-form-header, .ct-form-body { padding-left: 20px; padding-right: 20px; }
  .ct-sidebar { grid-template-columns: 1fr; }
}
`;

function injectStyles() {
  if (document.getElementById("ct-styles")) return;
  const tag = document.createElement("style");
  tag.id = "ct-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

const SUBJECTS = [
  "General Inquiry",
  "Order Support",
  "Product Question",
  "Return / Refund",
  "Partnership",
  "Other",
];

const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 6:00 PM", today: true  },
  { day: "Saturday",         time: "9:00 AM – 5:00 PM", today: false },
  { day: "Sunday",           time: "10:00 AM – 3:00 PM", today: false },
];

// ── Component ──────────────────────────────────────────────
const Contact = () => {
//   const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error,   setError]   = useState("");

  useEffect(() => { injectStyles(); }, []);

  const handleChange = (e) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      await api.post("/contact", form);
      setSuccess("Your message has been sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      // if no /contact API, just show success for demo
      if (err.response?.status === 404) {
        setSuccess("Thank you for reaching out! We'll get back to you soon. ✓");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setError(err.response?.data?.message || "Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ct-page">

      {/* Hero */}
      <section className="ct-hero">
        <span className="ct-tag">Contact Us</span>
        <h1 className="ct-hero-title">We'd Love to Hear from You</h1>
        <p className="ct-hero-sub">
          Have a question, feedback, or need help with an order?
          Our team is here to help — reach out anytime.
        </p>
      </section>

      {/* Main */}
      <div className="ct-main">

        {/* Form */}
        <div className="ct-form-card">
          <div className="ct-form-header">
            <h2 className="ct-form-title">Send a Message</h2>
            <p className="ct-form-sub">We typically respond within 24 hours</p>
          </div>

          <div className="ct-form-body">
            {success && <div className="ct-alert-ok"><span>✓</span>{success}</div>}
            {error   && <div className="ct-alert-err"><span>⚠</span>{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="ct-row">
                <div className="ct-fg">
                  <label className="ct-label">Full Name <span className="ct-req">*</span></label>
                  <input
                    className="ct-input"
                    type="text"
                    name="name"
                    placeholder="Sokha Chan"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ct-fg">
                  <label className="ct-label">Email <span className="ct-req">*</span></label>
                  <input
                    className="ct-input"
                    type="email"
                    name="email"
                    placeholder="sokha@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone + Subject */}
              <div className="ct-row">
                <div className="ct-fg">
                  <label className="ct-label">Phone</label>
                  <input
                    className="ct-input"
                    type="tel"
                    name="phone"
                    placeholder="+855 12 345 678"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="ct-fg">
                  <label className="ct-label">Subject <span className="ct-req">*</span></label>
                  <select
                    className="ct-select"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">— Select subject —</option>
                    {SUBJECTS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="ct-fg">
                <label className="ct-label">
                  Message <span className="ct-req">*</span>
                  <span style={{ float: "right", fontWeight: 400, color: "#9ca3af", fontSize: 12 }}>
                    {form.message.length} / 500
                  </span>
                </label>
                <textarea
                  className="ct-textarea"
                  name="message"
                  placeholder="Tell us how we can help you…"
                  value={form.message}
                  onChange={handleChange}
                  maxLength={500}
                  rows={5}
                  required
                />
              </div>

              <hr className="ct-divider" />

              <button type="submit" className="ct-btn-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span style={{
                      width: 16, height: 16,
                      border: "2px solid rgba(255,255,255,.4)",
                      borderTopColor: "#fff", borderRadius: "50%",
                      display: "inline-block",
                      animation: "ct-spin .7s linear infinite",
                    }} />
                    Sending…
                  </>
                ) : "Send Message →"}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="ct-sidebar">

          {/* Address */}
          <div className="ct-info-card">
            <div className="ct-info-icon">📍</div>
            <p className="ct-info-title">Our Location</p>
            <p className="ct-info-val">
              123 Monivong Blvd, BKK1<br />
              Phnom Penh, Cambodia
            </p>
          </div>

          {/* Contact info */}
          <div className="ct-info-card">
            <div className="ct-info-icon">📞</div>
            <p className="ct-info-title">Get in Touch</p>
            <p className="ct-info-val">
              <a href="tel:+85512345678">+855 12 345 678</a><br />
              <a href="mailto:hello@storefront.com">hello@storefront.com</a>
            </p>
            <div className="ct-social">
              <a className="ct-social-btn" href="#" title="Facebook">📘</a>
              <a className="ct-social-btn" href="#" title="Instagram">📸</a>
              <a className="ct-social-btn" href="#" title="Telegram">✈️</a>
            </div>
          </div>

          {/* Hours */}
          <div className="ct-info-card">
            <div className="ct-info-icon">🕐</div>
            <p className="ct-info-title">Opening Hours</p>
            <table className="ct-hours">
              <tbody>
                {HOURS.map((h, i) => (
                  <tr key={i} className={h.today ? "today" : ""}>
                    <td>{h.day}</td>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Map placeholder */}
          <div className="ct-map">
            <div className="ct-map-icon">🗺️</div>
            <p>Phnom Penh, Cambodia</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

// ── Styles injected once into <head> ───────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

:root {
  --a-bg:    #0b0e14;
  --a-surf:  #111520;
  --a-surf2: #171c2b;
  --a-brd:   #1e2538;
  --a-brd2:  #2e3d6a;
  --a-acc:   #4f7cff;
  --a-acc2:  #00e5c0;
  --a-acc3:  #ff4f82;
  --a-t1:    #e8eaf4;
  --a-t2:    #8a90ab;
  --a-t3:    #535870;
  --a-rs:    8px;
  --a-tr:    .18s cubic-bezier(.4,0,.2,1);
}

/* ── Page wrapper ─────────────────────────────────────── */
.add-cat-page {
  min-height: 100vh;
  background: var(--a-bg);
  background-image:
    radial-gradient(ellipse 80% 50% at 10% -10%, rgba(79,124,255,.10) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 90% 110%, rgba(0,229,192,.07) 0%, transparent 55%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 56px 16px;
  font-family: 'Syne', sans-serif;
}

/* ── Card ─────────────────────────────────────────────── */
.add-cat-card {
  width: 100%;
  max-width: 520px;
  background: var(--a-surf) !important;
  border: 1px solid var(--a-brd) !important;
  border-radius: 18px !important;
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--a-brd), 0 24px 64px rgba(0,0,0,.55);
}

/* ── Card header ──────────────────────────────────────── */
.add-cat-header {
  padding: 28px 32px 22px;
  background: linear-gradient(180deg, var(--a-surf2) 0%, var(--a-surf) 100%);
  border-bottom: 1px solid var(--a-brd);
}
.add-cat-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -.4px;
  color: var(--a-t1);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.add-cat-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--a-acc), var(--a-acc2));
  flex-shrink: 0;
}
.add-cat-subtitle {
  font-size: 12.5px;
  color: var(--a-t3);
  margin: 6px 0 0 14px;
  font-family: 'DM Mono', monospace;
}

/* ── Card body ────────────────────────────────────────── */
.add-cat-body {
  padding: 28px 32px 32px;
}

/* ── Labels ───────────────────────────────────────────── */
.add-cat-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--a-t3);
  font-family: 'DM Mono', monospace;
  margin-bottom: 7px;
}
.add-cat-required {
  color: var(--a-acc3);
  margin-left: 2px;
}

/* ── Inputs ───────────────────────────────────────────── */
.add-cat-input {
  width: 100%;
  background: var(--a-bg) !important;
  border: 1px solid var(--a-brd) !important;
  border-radius: var(--a-rs) !important;
  padding: 10px 14px !important;
  font-family: 'DM Mono', monospace !important;
  font-size: 13.5px !important;
  color: var(--a-t1) !important;
  transition: border-color var(--a-tr), box-shadow var(--a-tr);
  outline: none !important;
  box-shadow: none !important;
}
.add-cat-input::placeholder { color: var(--a-t3) !important; }
.add-cat-input:focus {
  border-color: var(--a-acc) !important;
  box-shadow: 0 0 0 3px rgba(79,124,255,.16) !important;
}

.add-cat-textarea {
  resize: vertical;
  min-height: 96px;
}

/* ── Divider ──────────────────────────────────────────── */
.add-cat-divider {
  border: none;
  border-top: 1px solid var(--a-brd);
  margin: 24px 0;
}

/* ── Buttons ──────────────────────────────────────────── */
.add-cat-btn-submit {
  background: linear-gradient(135deg, var(--a-acc) 0%, #3a63e8 100%) !important;
  color: #fff !important;
  border: none !important;
  border-radius: var(--a-rs) !important;
  padding: 10px 26px !important;
  font-family: 'Syne', sans-serif !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  letter-spacing: .3px !important;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(79,124,255,.35) !important;
  transition: all var(--a-tr) !important;
}
.add-cat-btn-submit:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 24px rgba(79,124,255,.5) !important;
  filter: brightness(1.08);
}
.add-cat-btn-submit:active { transform: translateY(0) !important; }

.add-cat-btn-cancel {
  background: transparent !important;
  color: var(--a-t2) !important;
  border: 1px solid var(--a-brd) !important;
  border-radius: var(--a-rs) !important;
  padding: 10px 22px !important;
  font-family: 'Syne', sans-serif !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer;
  transition: all var(--a-tr) !important;
}
.add-cat-btn-cancel:hover {
  border-color: var(--a-brd2) !important;
  color: var(--a-t1) !important;
  background: var(--a-surf2) !important;
}

/* ── Alert error ──────────────────────────────────────── */
.add-cat-alert {
  background: rgba(255,79,130,.10) !important;
  border: 1px solid rgba(255,79,130,.28) !important;
  border-radius: var(--a-rs) !important;
  color: #ff7eaa !important;
  font-size: 13px;
  padding: 10px 14px;
}
`;

function injectStyles() {
  if (document.getElementById("add-cat-styles")) return;
  const tag = document.createElement("style");
  tag.id = "add-cat-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);

  // inject Bootstrap if not already loaded
  if (!document.getElementById("bootstrap-cdn")) {
    const link = document.createElement("link");
    link.id = "bootstrap-cdn";
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    document.head.appendChild(link);
  }
}

// ── Component ──────────────────────────────────────────────
const AddCategory = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => { injectStyles(); }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("admin/categories", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/dashboard/admin/categories");
    } catch (err) {
      console.error("Failed to add category:", err.response || err);
      setError(err.response?.data?.message || "Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-cat-page">
      <div className="add-cat-card card">

        {/* Header */}
        <div className="add-cat-header">
          <h2 className="add-cat-title">Add Category</h2>
          <p className="add-cat-subtitle">Fill in the details to create a new category</p>
        </div>

        {/* Body */}
        <div className="add-cat-body">

          {/* Error alert */}
          {error && (
            <div className="add-cat-alert d-flex align-items-center gap-2 mb-4" role="alert">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-4">
              <label className="add-cat-label">
                Name <span className="add-cat-required">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="add-cat-input"
                placeholder="e.g. Electronics"
                value={form.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="add-cat-label">Description</label>
              <textarea
                name="description"
                className="add-cat-input add-cat-textarea"
                placeholder="Brief description of this category…"
                value={form.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <hr className="add-cat-divider" />

            {/* Buttons */}
            <div className="d-flex align-items-center gap-3">
              <button
                type="submit"
                className="add-cat-btn-submit btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center gap-2">
                    <span
                      className="spinner-border spinner-border-sm"
                      style={{ width: 14, height: 14, borderWidth: 2, color: "#fff" }}
                    />
                    Saving…
                  </span>
                ) : (
                  "+ Add Category"
                )}
              </button>

              <button
                type="button"
                className="add-cat-btn-cancel btn"
                onClick={() => navigate("/dashboard/admin/categories")}
                disabled={loading}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddCategory;
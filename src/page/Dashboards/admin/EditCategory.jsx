import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

// ── Inject Bootstrap + custom CSS once ────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.ec-page {
  min-height: 100vh;
  background: #f4f6f9;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px 80px;
  font-family: 'Inter', sans-serif;
}

/* ── Card ─────────────────────────────────────────────── */
.ec-card {
  width: 100%;
  max-width: 560px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,.07);
  overflow: hidden;
}

/* ── Header ───────────────────────────────────────────── */
.ec-header {
  padding: 22px 28px 18px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}
.ec-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}
.ec-breadcrumb-link {
  font-size: 12px;
  color: #3b82f6;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: color .15s;
}
.ec-breadcrumb-link:hover { color: #2563eb; text-decoration: underline; }
.ec-breadcrumb-sep { font-size: 12px; color: #cbd5e1; }
.ec-breadcrumb-cur { font-size: 12px; color: #94a3b8; }

.ec-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ec-title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.ec-id-badge {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 2px 10px;
}

/* ── Body ─────────────────────────────────────────────── */
.ec-body { padding: 24px 28px 28px; }

/* ── Label ────────────────────────────────────────────── */
.ec-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.ec-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.ec-label-req { color: #ef4444; margin-left: 2px; }
.ec-char-count { font-size: 11.5px; color: #94a3b8; }
.ec-changed-dot {
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  margin-left: 5px;
  vertical-align: middle;
}

/* ── Inputs ───────────────────────────────────────────── */
.ec-input {
  width: 100%;
  background: #fff !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 8px !important;
  padding: 10px 14px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  color: #0f172a !important;
  transition: border-color .15s, box-shadow .15s;
  outline: none !important;
  box-shadow: none !important;
}
.ec-input::placeholder { color: #94a3b8 !important; }
.ec-input:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59,130,246,.15) !important;
}
.ec-input.is-changed {
  border-color: #f59e0b !important;
  background: #fffbeb !important;
}
textarea.ec-input {
  resize: vertical;
  min-height: 100px;
}

/* ── Divider ──────────────────────────────────────────── */
.ec-divider {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 22px 0;
}

/* ── Alerts ───────────────────────────────────────────── */
.ec-alert-err {
  background: #fef2f2 !important;
  border: 1.5px solid #fca5a5 !important;
  border-radius: 8px !important;
  color: #dc2626 !important;
  font-size: 13px;
  padding: 10px 14px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ec-alert-ok {
  background: #f0fdf4 !important;
  border: 1.5px solid #86efac !important;
  border-radius: 8px !important;
  color: #16a34a !important;
  font-size: 13px;
  padding: 10px 14px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Buttons ──────────────────────────────────────────── */
.ec-btn-save {
  background: #3b82f6 !important;
  color: #fff !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 10px 24px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 600 !important;
  cursor: pointer;
  transition: background .15s, transform .12s, box-shadow .15s !important;
  box-shadow: 0 2px 8px rgba(59,130,246,.3) !important;
}
.ec-btn-save:not(:disabled):hover {
  background: #2563eb !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 14px rgba(59,130,246,.4) !important;
}
.ec-btn-save:disabled {
  background: #93c5fd !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
}

.ec-btn-reset {
  background: #fff !important;
  color: #64748b !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 8px !important;
  padding: 10px 18px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 500 !important;
  cursor: pointer;
  transition: all .15s !important;
}
.ec-btn-reset:not(:disabled):hover {
  border-color: #f59e0b !important;
  color: #b45309 !important;
  background: #fffbeb !important;
}
.ec-btn-reset:disabled { opacity: .4 !important; cursor: not-allowed !important; }

.ec-btn-back {
  background: #fff !important;
  color: #64748b !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 8px !important;
  padding: 10px 18px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 500 !important;
  cursor: pointer;
  transition: all .15s !important;
  margin-left: auto !important;
}
.ec-btn-back:hover {
  border-color: #cbd5e1 !important;
  color: #374151 !important;
  background: #f8fafc !important;
}

/* ── Skeleton ─────────────────────────────────────────── */
.ec-skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: ec-shimmer 1.4s infinite;
  border-radius: 8px;
  height: 42px;
  width: 100%;
  margin-bottom: 18px;
}
.ec-skeleton.short { height: 16px; width: 40%; margin-bottom: 8px; }
.ec-skeleton.tall  { height: 100px; }
@keyframes ec-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 576px) {
  .ec-page   { padding: 20px 12px 60px; }
  .ec-header { padding: 18px 18px 14px; }
  .ec-body   { padding: 18px 18px 22px; }
  .ec-btn-row { flex-direction: column !important; }
  .ec-btn-save,
  .ec-btn-back { width: 100% !important; justify-content: center !important; }
  .ec-btn-back { margin-left: 0 !important; }
}
`;

function injectStyles() {
  if (document.getElementById("ec-styles")) return;
  const tag = document.createElement("style");
  tag.id = "ec-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);

  if (!document.getElementById("bootstrap-cdn")) {
    const link = document.createElement("link");
    link.id   = "bootstrap-cdn";
    link.rel  = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    document.head.appendChild(link);
  }
}

// ── Component ──────────────────────────────────────────────
const EditCategory = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const token    = localStorage.getItem("token");

  const [form, setForm]         = useState({ name: "", description: "" });
  const [original, setOriginal] = useState({ name: "", description: "" });
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  useEffect(() => { injectStyles(); }, []);

  // ── Fetch ────────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res  = await api.get(`admin/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = {
          name:        res.data.name        || "",
          description: res.data.description || "",
        };
        setForm(data);
        setOriginal(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load category data.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, token]);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const isDirty =
    form.name.trim() !== original.name.trim() ||
    form.description.trim() !== original.description.trim();

  const handleReset = () => {
    setForm(original);
    setError("");
    setSuccess("");
  };

  // ── Submit ───────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDirty) return;
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      await api.put(`admin/categories/${id}`, form, {
        headers: {
          Authorization:  `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setOriginal(form);
      setSuccess("Category updated successfully!");
      setTimeout(() => navigate("/dashboard/admin/categories"), 1200);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Skeleton ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="ec-page">
        <div className="ec-card">
          <div className="ec-header">
            <div className="ec-skeleton short" />
            <div className="ec-skeleton short" style={{ width: "55%" }} />
          </div>
          <div className="ec-body">
            <div className="ec-skeleton short" style={{ width: "25%", marginBottom: 6 }} />
            <div className="ec-skeleton" />
            <div className="ec-skeleton short" style={{ width: "25%", marginBottom: 6 }} />
            <div className="ec-skeleton tall" />
          </div>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="ec-page">
      <div className="ec-card">

        {/* Header */}
        <div className="ec-header">
          <div className="ec-breadcrumb">
            <span
              className="ec-breadcrumb-link"
              onClick={() => navigate("/dashboard/admin/categories")}
            >
              Categories
            </span>
            <span className="ec-breadcrumb-sep">/</span>
            <span className="ec-breadcrumb-cur">Edit</span>
          </div>
          <div className="ec-title-row">
            <h2 className="ec-title">Edit Category</h2>
            <span className="ec-id-badge">ID #{id}</span>
          </div>
        </div>

        {/* Body */}
        <div className="ec-body">

          {error   && <div className="ec-alert-err" role="alert"><span>⚠</span>{error}</div>}
          {success && <div className="ec-alert-ok"  role="alert"><span>✓</span>{success}</div>}

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-3">
              <div className="ec-label-row">
                <label className="ec-label">
                  Name <span className="ec-label-req">*</span>
                  {form.name !== original.name && (
                    <span className="ec-changed-dot" title="Unsaved change" />
                  )}
                </label>
                <span className="ec-char-count">{form.name.length} chars</span>
              </div>
              <input
                type="text"
                name="name"
                className={`ec-input${form.name !== original.name ? " is-changed" : ""}`}
                placeholder="e.g. Electronics"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <div className="ec-label-row">
                <label className="ec-label">
                  Description
                  {form.description !== original.description && (
                    <span className="ec-changed-dot" title="Unsaved change" />
                  )}
                </label>
                <span className="ec-char-count">{form.description.length} chars</span>
              </div>
              <textarea
                name="description"
                className={`ec-input${form.description !== original.description ? " is-changed" : ""}`}
                placeholder="Brief description of this category…"
                value={form.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <hr className="ec-divider" />

            {/* Buttons */}
            <div className="d-flex align-items-center flex-wrap gap-2 ec-btn-row">
              <button
                type="submit"
                className="ec-btn-save btn"
                disabled={saving || !isDirty}
              >
                {saving ? (
                  <span className="d-flex align-items-center gap-2">
                    <span
                      className="spinner-border spinner-border-sm"
                      style={{ width: 14, height: 14, borderWidth: 2 }}
                    />
                    Saving…
                  </span>
                ) : "Save Changes"}
              </button>

              <button
                type="button"
                className="ec-btn-reset btn"
                onClick={handleReset}
                disabled={saving || !isDirty}
                title="Reset to original values"
              >
                Reset
              </button>

              <button
                type="button"
                className="ec-btn-back btn"
                onClick={() => navigate("/dashboard/admin/categories")}
                disabled={saving}
              >
                ← Back
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default EditCategory;
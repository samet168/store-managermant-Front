import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.es-page {
  padding: 28px 32px;
  background: #f4f6f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Breadcrumb */
.es-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 18px; }
.es-bc-link { font-size: 12.5px; color: #3b82f6; cursor: pointer; font-weight: 500; }
.es-bc-link:hover { text-decoration: underline; }
.es-bc-sep { font-size: 12px; color: #cbd5e1; }
.es-bc-cur { font-size: 12.5px; color: #94a3b8; }

/* Card */
.es-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
  max-width: 500px;
}

/* Card header */
.es-card-header {
  padding: 20px 26px 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.es-card-title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0; }
.es-card-sub   { font-size: 12.5px; color: #94a3b8; margin-top: 3px; }
.es-id-badge {
  font-size: 12px; font-weight: 600; color: #64748b;
  background: #f1f5f9; border: 1px solid #e2e8f0;
  border-radius: 20px; padding: 3px 12px;
  font-family: 'Courier New', monospace; flex-shrink: 0;
}

/* Card body */
.es-card-body { padding: 24px 26px 28px; }

/* Alerts */
.es-alert-ok {
  background: #f0fdf4; border: 1.5px solid #86efac;
  border-radius: 8px; color: #16a34a; font-size: 13px;
  padding: 10px 14px; margin-bottom: 18px;
  display: flex; align-items: center; gap: 8px;
}
.es-alert-err {
  background: #fef2f2; border: 1.5px solid #fca5a5;
  border-radius: 8px; color: #dc2626; font-size: 13px;
  padding: 10px 14px; margin-bottom: 18px;
  display: flex; align-items: center; gap: 8px;
}

/* Form group */
.es-fg { margin-bottom: 18px; }
.es-label {
  font-size: 13px; font-weight: 600; color: #374151;
  margin-bottom: 6px; display: flex;
  align-items: center; justify-content: space-between;
}
.es-req { color: #ef4444; margin-left: 2px; }
.es-changed-dot {
  display: inline-block; width: 6px; height: 6px;
  border-radius: 50%; background: #f59e0b;
  margin-left: 6px; vertical-align: middle;
}
.es-hint { font-size: 11.5px; color: #94a3b8; margin-top: 5px; }

/* Inputs */
.es-input, .es-select {
  width: 100%; background: #fff;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 10px 14px; font-family: 'Inter', sans-serif;
  font-size: 13.5px; color: #0f172a; outline: none;
  transition: border-color .15s, box-shadow .15s;
  appearance: none;
}
.es-input::placeholder { color: #94a3b8; }
.es-input:focus, .es-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.12);
}
.es-input.changed, .es-select.changed {
  border-color: #f59e0b;
  background: #fffbeb;
}

/* Change type toggle */
.es-toggle { display: flex; gap: 8px; margin-bottom: 8px; }
.es-toggle-btn {
  flex: 1; padding: 8px 0; border-radius: 8px; cursor: pointer;
  font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
  border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
  transition: all .15s; text-align: center;
}
.es-toggle-btn.active-in  { background: #f0fdf4; color: #16a34a; border-color: #86efac; }
.es-toggle-btn.active-out { background: #fef2f2; color: #dc2626; border-color: #fca5a5; }

/* Preview */
.es-qty-preview {
  margin-top: 8px; padding: 10px 14px;
  background: #eff6ff; border: 1px solid #bfdbfe;
  border-radius: 8px; font-size: 13px; color: #3b82f6;
  font-weight: 600; display: flex; justify-content: space-between;
}

/* Divider */
.es-divider { border: none; border-top: 1px solid #e2e8f0; margin: 22px 0; }

/* Buttons */
.es-btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
.es-btn-save {
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 10px 26px;
  font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600;
  cursor: pointer; box-shadow: 0 2px 8px rgba(59,130,246,.28);
  transition: background .15s, transform .12s;
}
.es-btn-save:not(:disabled):hover { background: #2563eb; transform: translateY(-1px); }
.es-btn-save:disabled { background: #93c5fd; cursor: not-allowed; }

.es-btn-reset {
  background: #fff; color: #64748b;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 10px 16px; font-family: 'Inter', sans-serif;
  font-size: 13.5px; font-weight: 500; cursor: pointer;
  transition: all .15s;
}
.es-btn-reset:not(:disabled):hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
.es-btn-reset:disabled { opacity: .35; cursor: not-allowed; }

.es-btn-cancel {
  background: #fff; color: #64748b;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 10px 18px; font-family: 'Inter', sans-serif;
  font-size: 13.5px; font-weight: 500; cursor: pointer;
  transition: all .15s; margin-left: auto;
}
.es-btn-cancel:hover { border-color: #cbd5e1; color: #374151; background: #f8fafc; }

/* Skeleton */
.es-skeleton {
  background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size: 200% 100%;
  animation: es-shimmer 1.4s infinite; border-radius: 8px;
}
@keyframes es-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes es-spin    { to{transform:rotate(360deg)} }

/* Responsive */
@media (max-width: 576px) {
  .es-page { padding: 18px 14px; }
  .es-card-header, .es-card-body { padding: 16px 18px; }
  .es-btn-row { flex-direction: column; }
  .es-btn-save, .es-btn-cancel { width: 100%; text-align: center; }
  .es-btn-cancel { margin-left: 0; }
}
`;

function injectStyles() {
  if (document.getElementById("es-styles")) return;
  const tag = document.createElement("style");
  tag.id = "es-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Component ──────────────────────────────────────────────
const EditStock = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const token    = localStorage.getItem("token");

  const [form, setForm]         = useState({ productId: "", change: "", reason: "", changeType: "in" });
  const [original, setOriginal] = useState({ productId: "", change: "", reason: "", changeType: "in" });
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  useEffect(() => { injectStyles(); }, []);

  // ── Fetch existing log ───────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/stock-logs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const d = res.data;
        const changeVal  = Math.abs(d.change) || "";
        const changeType = (d.change ?? 0) >= 0 ? "in" : "out";
        const data = {
          productId:  String(d.product_id  || ""),
          change:     String(changeVal),
          reason:     d.reason || "",
          changeType,
        };
        setForm(data);
        setOriginal(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stock log data.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, token]);

  const handleChange = (e) => {
    setError(""); setSuccess("");
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const setChangeType = (t) => {
    setError(""); setSuccess("");
    setForm(p => ({ ...p, changeType: t }));
  };

  // dirty check
  const isDirty =
    form.productId  !== original.productId  ||
    form.change     !== original.change     ||
    form.reason     !== original.reason     ||
    form.changeType !== original.changeType;

  const handleReset = () => { setForm(original); setError(""); setSuccess(""); };

  // signed change
  const signedChange = form.changeType === "out"
    ? -Math.abs(Number(form.change))
    :  Math.abs(Number(form.change));

  // ── Submit ───────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDirty) return;
    setError(""); setSuccess("");
    setSaving(true);
    try {
      await api.post(`/admin/stock-logs/${id}`, {
        product_id: parseInt(form.productId),
        change:     signedChange,
        reason:     form.reason,
        date:       new Date().toISOString(),
      }, {
        headers: {
          Authorization:  `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setOriginal(form);
      setSuccess("Stock log updated successfully!");
      setTimeout(() => navigate("/dashboard/admin/stock-logs"), 1200);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Update failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ── Skeleton ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="es-page">
        <div className="es-card">
          <div className="es-card-header" style={{ background: "#f8fafc" }}>
            <div className="es-skeleton" style={{ width: 140, height: 18 }} />
          </div>
          <div className="es-card-body">
            {[1, 2, 3].map(k => (
              <div key={k} className="es-fg">
                <div className="es-skeleton" style={{ width: 90, height: 13, marginBottom: 7 }} />
                <div className="es-skeleton" style={{ height: 42 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="es-page">

      {/* Breadcrumb */}
      <div className="es-bc">
        <span className="es-bc-link" onClick={() => navigate("/dashboard/admin/stock-logs")}>
          Stock Logs
        </span>
        <span className="es-bc-sep">/</span>
        <span className="es-bc-cur">Edit #{id}</span>
      </div>

      <div className="es-card">

        {/* Header */}
        <div className="es-card-header">
          <div>
            <h2 className="es-card-title">Edit Stock Log</h2>
            <p className="es-card-sub">Update stock change details</p>
          </div>
          <span className="es-id-badge">#{id}</span>
        </div>

        {/* Body */}
        <div className="es-card-body">

          {error   && <div className="es-alert-err"><span>⚠</span>{error}</div>}
          {success && <div className="es-alert-ok"><span>✓</span>{success}</div>}

          <form onSubmit={handleSubmit}>

            {/* Product ID */}
            <div className="es-fg">
              <label className="es-label">
                <span>
                  Product ID <span className="es-req">*</span>
                  {form.productId !== original.productId && (
                    <span className="es-changed-dot" title="Changed" />
                  )}
                </span>
              </label>
              <input
                className={`es-input${form.productId !== original.productId ? " changed" : ""}`}
                type="number"
                name="productId"
                min="1"
                placeholder="Enter product ID"
                value={form.productId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Change type + quantity */}
            <div className="es-fg">
              <label className="es-label">
                <span>
                  Change Type & Quantity <span className="es-req">*</span>
                  {(form.change !== original.change || form.changeType !== original.changeType) && (
                    <span className="es-changed-dot" title="Changed" />
                  )}
                </span>
              </label>
              <div className="es-toggle">
                <button
                  type="button"
                  className={`es-toggle-btn${form.changeType === "in" ? " active-in" : ""}`}
                  onClick={() => setChangeType("in")}
                >
                  + Stock In
                </button>
                <button
                  type="button"
                  className={`es-toggle-btn${form.changeType === "out" ? " active-out" : ""}`}
                  onClick={() => setChangeType("out")}
                >
                  − Stock Out
                </button>
              </div>
              <input
                className={`es-input${form.change !== original.change ? " changed" : ""}`}
                type="number"
                name="change"
                min="1"
                placeholder="Quantity (positive number)"
                value={form.change}
                onChange={handleChange}
                required
              />
              {form.change && Number(form.change) > 0 && (
                <div className="es-qty-preview">
                  <span>Will record change:</span>
                  <span>
                    {form.changeType === "out" ? "-" : "+"}
                    {Math.abs(Number(form.change))} units
                  </span>
                </div>
              )}
            </div>

            {/* Reason */}
            <div className="es-fg">
              <label className="es-label">
                <span>
                  Reason
                  {form.reason !== original.reason && (
                    <span className="es-changed-dot" title="Changed" />
                  )}
                </span>
              </label>
              <input
                className={`es-input${form.reason !== original.reason ? " changed" : ""}`}
                type="text"
                name="reason"
                placeholder="e.g. Purchase, adjustment, damaged…"
                value={form.reason}
                onChange={handleChange}
              />
            </div>

            <hr className="es-divider" />

            {/* Buttons */}
            <div className="es-btn-row">
              <button type="submit" className="es-btn-save" disabled={saving || !isDirty}>
                {saving ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 14, height: 14,
                      border: "2px solid rgba(255,255,255,.4)",
                      borderTopColor: "#fff", borderRadius: "50%",
                      display: "inline-block",
                      animation: "es-spin .7s linear infinite",
                    }} />
                    Saving…
                  </span>
                ) : "Save Changes"}
              </button>

              <button
                type="button"
                className="es-btn-reset"
                onClick={handleReset}
                disabled={saving || !isDirty}
                title="Reset to original"
              >
                Reset
              </button>

              <button
                type="button"
                className="es-btn-cancel"
                onClick={() => navigate("/dashboard/admin/stock-logs")}
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

export default EditStock;
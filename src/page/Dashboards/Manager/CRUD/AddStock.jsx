import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.as-page {
  padding: 28px 32px;
  background: #f4f6f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Breadcrumb */
.as-bc { display: flex; align-items: center; gap: 6px; margin-bottom: 18px; }
.as-bc-link { font-size: 12.5px; color: #3b82f6; cursor: pointer; font-weight: 500; }
.as-bc-link:hover { text-decoration: underline; }
.as-bc-sep  { font-size: 12px; color: #cbd5e1; }
.as-bc-cur  { font-size: 12.5px; color: #94a3b8; }

/* Card */
.as-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  overflow: hidden;
  max-width: 500px;
}

/* Card header */
.as-card-header {
  padding: 20px 26px 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}
.as-card-title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0; }
.as-card-sub   { font-size: 12.5px; color: #94a3b8; margin-top: 3px; }

/* Card body */
.as-card-body { padding: 24px 26px 28px; }

/* Alerts */
.as-alert-ok {
  background: #f0fdf4; border: 1.5px solid #86efac;
  border-radius: 8px; color: #16a34a; font-size: 13px;
  padding: 10px 14px; margin-bottom: 18px;
  display: flex; align-items: flex-start; gap: 8px;
}
.as-alert-err {
  background: #fef2f2; border: 1.5px solid #fca5a5;
  border-radius: 8px; color: #dc2626; font-size: 13px;
  padding: 10px 14px; margin-bottom: 18px;
  display: flex; align-items: center; gap: 8px;
}

/* Form group */
.as-fg { margin-bottom: 18px; }
.as-label {
  font-size: 13px; font-weight: 600; color: #374151;
  margin-bottom: 6px; display: block;
}
.as-req { color: #ef4444; margin-left: 2px; }
.as-hint { font-size: 11.5px; color: #94a3b8; margin-top: 5px; }

/* Inputs */
.as-input {
  width: 100%; background: #fff;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 10px 14px; font-family: 'Inter', sans-serif;
  font-size: 13.5px; color: #0f172a; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.as-input::placeholder { color: #94a3b8; }
.as-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,.12);
}

/* Change type toggle */
.as-toggle { display: flex; gap: 8px; margin-bottom: 8px; }
.as-toggle-btn {
  flex: 1; padding: 8px 0; border-radius: 8px; cursor: pointer;
  font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
  border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
  transition: all .15s; text-align: center;
}
.as-toggle-btn.active-in {
  background: #f0fdf4; color: #16a34a;
  border-color: #86efac;
}
.as-toggle-btn.active-out {
  background: #fef2f2; color: #dc2626;
  border-color: #fca5a5;
}

/* Current qty preview */
.as-qty-preview {
  margin-top: 10px; padding: 10px 14px;
  background: #eff6ff; border: 1px solid #bfdbfe;
  border-radius: 8px; font-size: 13px; color: #3b82f6;
  font-weight: 600; display: flex; justify-content: space-between;
}

/* Divider */
.as-divider { border: none; border-top: 1px solid #e2e8f0; margin: 22px 0; }

/* Buttons */
.as-btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
.as-btn-save {
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 10px 26px;
  font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600;
  cursor: pointer; box-shadow: 0 2px 8px rgba(59,130,246,.28);
  transition: background .15s, transform .12s;
}
.as-btn-save:not(:disabled):hover { background: #2563eb; transform: translateY(-1px); }
.as-btn-save:disabled { background: #93c5fd; cursor: not-allowed; }
.as-btn-cancel {
  background: #fff; color: #64748b;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 10px 18px; font-family: 'Inter', sans-serif;
  font-size: 13.5px; font-weight: 500; cursor: pointer;
  transition: all .15s;
}
.as-btn-cancel:hover { border-color: #cbd5e1; color: #374151; background: #f8fafc; }

/* Responsive */
@media (max-width: 576px) {
  .as-page { padding: 18px 14px; }
  .as-card-header, .as-card-body { padding: 16px 18px; }
  .as-btn-row { flex-direction: column; }
  .as-btn-save, .as-btn-cancel { width: 100%; text-align: center; }
}

@keyframes as-spin { to { transform: rotate(360deg); } }
`;

function injectStyles() {
  if (document.getElementById("as-styles")) return;
  const tag = document.createElement("style");
  tag.id = "as-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Component ──────────────────────────────────────────────
const AddStock = () => {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [changeType, setChangeType] = useState("in");   // "in" | "out"
  const [change, setChange]   = useState("");
  const [reason, setReason]   = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentQty, setCurrentQty] = useState(null);
  const [error, setError]     = useState("");

  useEffect(() => { injectStyles(); }, []);

  // computed signed change
  const signedChange = changeType === "out"
    ? -Math.abs(Number(change))
    :  Math.abs(Number(change));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setCurrentQty(null);

    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/manager/stock-logs",
        {
          product_id: parseInt(productId),
          change:     signedChange,
          reason:     reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCurrentQty(res.data.current_quantity ?? null);
      setMessage("Stock updated successfully!");
      // reset form
      setProductId("");
      setChange("");
      setReason("");
      setChangeType("in");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        (err.request ? "Network error. Please try again." : "Unexpected error.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="as-page">

      {/* Breadcrumb */}
      <div className="as-bc">
        <span className="as-bc-link" onClick={() => navigate("/dashboard/manager/stock")}>
          Stock Logs
        </span>
        <span className="as-bc-sep">/</span>
        <span className="as-bc-cur">Add Stock</span>
      </div>

      <div className="as-card">

        {/* Header */}
        <div className="as-card-header">
          <h2 className="as-card-title">Add Stock Log</h2>
          <p className="as-card-sub">Record a stock change for a product</p>
        </div>

        {/* Body */}
        <div className="as-card-body">

          {/* Success */}
          {message && (
            <div className="as-alert-ok">
              <span>✓</span>
              <div>
                {message}
                {currentQty !== null && (
                  <div style={{ marginTop: 4, fontSize: 12, color: "#15803d" }}>
                    Current stock: <strong>{currentQty}</strong> units
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="as-alert-err"><span>⚠</span>{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Product ID */}
            <div className="as-fg">
              <label className="as-label">
                Product ID <span className="as-req">*</span>
              </label>
              <input
                className="as-input"
                type="number"
                min="1"
                placeholder="Enter product ID"
                value={productId}
                onChange={e => setProductId(e.target.value)}
                required
              />
            </div>

            {/* Change type toggle + quantity */}
            <div className="as-fg">
              <label className="as-label">
                Change Type & Quantity <span className="as-req">*</span>
              </label>
              <div className="as-toggle">
                <button
                  type="button"
                  className={`as-toggle-btn${changeType === "in" ? " active-in" : ""}`}
                  onClick={() => setChangeType("in")}
                >
                  + Stock In
                </button>
                <button
                  type="button"
                  className={`as-toggle-btn${changeType === "out" ? " active-out" : ""}`}
                  onClick={() => setChangeType("out")}
                >
                  − Stock Out
                </button>
              </div>
              <input
                className="as-input"
                type="number"
                min="1"
                placeholder="Quantity (positive number)"
                value={change}
                onChange={e => setChange(e.target.value)}
                required
              />
              {change && Number(change) > 0 && (
                <div className="as-qty-preview">
                  <span>Will record change:</span>
                  <span>{changeType === "out" ? "-" : "+"}{Math.abs(Number(change))} units</span>
                </div>
              )}
              <p className="as-hint">Use Stock In for purchases/returns, Stock Out for sales/loss.</p>
            </div>

            {/* Reason */}
            <div className="as-fg">
              <label className="as-label">Reason</label>
              <input
                className="as-input"
                type="text"
                placeholder="e.g. Purchase, adjustment, damaged…"
                value={reason}
                onChange={e => setReason(e.target.value)}
              />
            </div>

            <hr className="as-divider" />

            {/* Buttons */}
            <div className="as-btn-row">
              <button type="submit" className="as-btn-save" disabled={loading}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 14, height: 14,
                      border: "2px solid rgba(255,255,255,.4)",
                      borderTopColor: "#fff", borderRadius: "50%",
                      display: "inline-block",
                      animation: "as-spin .7s linear infinite",
                    }} />
                    Saving…
                  </span>
                ) : "Add Stock"}
              </button>
              <button
                type="button"
                className="as-btn-cancel"
                onClick={() => navigate("/dashboard/manager/stock")}
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

export default AddStock;
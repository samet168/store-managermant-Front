/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

// ── All styles live here — no external .css file needed ────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

:root {
  --cat-bg:    #0b0e14;
  --cat-surf:  #111520;
  --cat-surf2: #171c2b;
  --cat-brd:   #1e2538;
  --cat-brd2:  #2e3d6a;
  --cat-acc:   #4f7cff;
  --cat-acc2:  #00e5c0;
  --cat-acc3:  #ff4f82;
  --cat-t1:    #e8eaf4;
  --cat-t2:    #8a90ab;
  --cat-t3:    #535870;
  --cat-r:     12px;
  --cat-rs:    7px;
  --cat-tr:    .18s cubic-bezier(.4,0,.2,1);
}

.cat-page {
  min-height: 100vh;
  background: var(--cat-bg);
  background-image:
    radial-gradient(ellipse 80% 50% at 10% -10%, rgba(79,124,255,.10) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 90% 110%, rgba(0,229,192,.07) 0%, transparent 55%);
  padding: 40px 32px;
  font-family: 'Syne', sans-serif;
  color: var(--cat-t1);
}

.cat-card {
  background: var(--cat-surf);
  border-radius: 18px;
  border: 1px solid var(--cat-brd);
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--cat-brd), 0 24px 64px rgba(0,0,0,.55);
}

.cat-top {
  padding: 28px 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid var(--cat-brd);
  background: linear-gradient(180deg, var(--cat-surf2) 0%, var(--cat-surf) 100%);
}

.cat-title {
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -.5px;
  color: var(--cat-t1);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.cat-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 21px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--cat-acc), var(--cat-acc2));
}

.cat-controls-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
}

.cat-search-wrap {
  display: flex;
  align-items: center;
  background: var(--cat-bg);
  border: 1px solid var(--cat-brd);
  border-radius: var(--cat-rs);
  overflow: hidden;
  flex: 1 1 210px;
  min-width: 170px;
  max-width: 300px;
  transition: border-color var(--cat-tr), box-shadow var(--cat-tr);
}
.cat-search-wrap:focus-within {
  border-color: var(--cat-acc);
  box-shadow: 0 0 0 3px rgba(79,124,255,.16);
}
.cat-search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 9px 13px;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  color: var(--cat-t1);
}
.cat-search-input::placeholder { color: var(--cat-t3); }

.cat-btn-search {
  background: transparent;
  border: none;
  border-left: 1px solid var(--cat-brd);
  padding: 9px 11px;
  cursor: pointer;
  font-size: 14px;
  color: var(--cat-t2);
  transition: color var(--cat-tr), background var(--cat-tr);
}
.cat-btn-search:hover { background: var(--cat-brd); color: var(--cat-acc); }

.cat-btn {
  background: transparent;
  border: 1px solid var(--cat-brd);
  border-radius: var(--cat-rs);
  padding: 9px 15px;
  font-family: 'Syne', sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--cat-t2);
  cursor: pointer;
  transition: all var(--cat-tr);
  white-space: nowrap;
}
.cat-btn:hover { border-color: var(--cat-brd2); color: var(--cat-t1); background: var(--cat-surf2); }

.cat-per-page {
  background: var(--cat-bg);
  border: 1px solid var(--cat-brd);
  border-radius: var(--cat-rs);
  padding: 9px 12px;
  font-family: 'DM Mono', monospace;
  font-size: 12.5px;
  color: var(--cat-t2);
  cursor: pointer;
  outline: none;
  transition: border-color var(--cat-tr);
}
.cat-per-page:focus { border-color: var(--cat-acc); }

.cat-btn-primary {
  background: linear-gradient(135deg, var(--cat-acc) 0%, #3a63e8 100%);
  color: #fff;
  border: none;
  border-radius: var(--cat-rs);
  padding: 9px 20px;
  font-family: 'Syne', sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: .3px;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(79,124,255,.35);
  transition: all var(--cat-tr);
  white-space: nowrap;
  margin-left: auto;
}
.cat-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(79,124,255,.5);
  filter: brightness(1.08);
}
.cat-btn-primary:active { transform: translateY(0); }

.cat-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
.cat-table thead tr {
  background: var(--cat-surf2);
  border-bottom: 1px solid var(--cat-brd);
}
.cat-table th {
  padding: 13px 20px;
  text-align: left;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--cat-t3);
  font-family: 'DM Mono', monospace;
}
.cat-table tbody tr {
  border-bottom: 1px solid var(--cat-brd);
  transition: background var(--cat-tr);
}
.cat-table tbody tr:last-child { border-bottom: none; }
.cat-table tbody tr:hover { background: rgba(79,124,255,.05); }
.cat-table td {
  padding: 14px 20px;
  color: var(--cat-t2);
  vertical-align: middle;
}
.cat-table td:first-child {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: var(--cat-t3);
}

.cat-name-cell { display: flex; align-items: center; gap: 12px; }

.cat-avatar {
  width: 36px; height: 36px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid var(--cat-brd);
  flex-shrink: 0;
}
.cat-avatar-ph {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, var(--cat-acc) 0%, var(--cat-acc2) 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Syne', sans-serif;
  flex-shrink: 0;
}
.cat-name-main { font-weight: 600; font-size: 13.5px; color: var(--cat-t1); }
.cat-name-slug {
  font-size: 11.5px;
  color: var(--cat-t3);
  font-family: 'DM Mono', monospace;
  margin-top: 2px;
}

.cat-actions { display: flex; gap: 8px; }
.cat-btn-edit {
  background: rgba(79,124,255,.12);
  color: var(--cat-acc);
  border: 1px solid rgba(79,124,255,.25);
  border-radius: var(--cat-rs);
  padding: 6px 14px;
  font-family: 'Syne', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--cat-tr);
}
.cat-btn-edit:hover {
  background: rgba(79,124,255,.22);
  border-color: var(--cat-acc);
  box-shadow: 0 2px 12px rgba(79,124,255,.25);
}
.cat-btn-delete {
  background: rgba(255,79,130,.10);
  color: var(--cat-acc3);
  border: 1px solid rgba(255,79,130,.22);
  border-radius: var(--cat-rs);
  padding: 6px 14px;
  font-family: 'Syne', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--cat-tr);
}
.cat-btn-delete:hover {
  background: rgba(255,79,130,.20);
  border-color: var(--cat-acc3);
  box-shadow: 0 2px 12px rgba(255,79,130,.22);
}

.cat-empty {
  text-align: center !important;
  padding: 52px 20px !important;
  color: var(--cat-t3) !important;
  font-size: 14px;
  font-style: italic;
}

.cat-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 18px 24px;
  border-top: 1px solid var(--cat-brd);
  background: var(--cat-surf2);
}
.cat-page-info {
  font-family: 'DM Mono', monospace;
  font-size: 12.5px;
  color: var(--cat-t3);
}
.cat-btn-page {
  background: transparent;
  border: 1px solid var(--cat-brd);
  border-radius: var(--cat-rs);
  padding: 7px 16px;
  font-family: 'Syne', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--cat-t2);
  cursor: pointer;
  transition: all var(--cat-tr);
}
.cat-btn-page:not(:disabled):hover {
  border-color: var(--cat-acc);
  color: var(--cat-acc);
  background: rgba(79,124,255,.08);
}
.cat-btn-page:disabled { opacity: .3; cursor: not-allowed; }

@media (max-width: 680px) {
  .cat-page { padding: 20px 12px; }
  .cat-top  { padding: 20px 16px 16px; }
  .cat-controls-row { flex-direction: column; align-items: stretch; }
  .cat-search-wrap  { max-width: 100%; }
  .cat-btn-primary  { margin-left: 0; text-align: center; }
  .cat-table thead  { display: none; }
  .cat-table tbody tr {
    display: block;
    margin: 12px 16px;
    border: 1px solid var(--cat-brd);
    border-radius: var(--cat-r);
    padding: 14px;
    background: var(--cat-surf2);
  }
  .cat-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 4px;
    border-bottom: 1px solid var(--cat-brd);
  }
  .cat-table td:last-child { border-bottom: none; padding-top: 10px; }
  .cat-table td::before {
    content: attr(data-label);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--cat-t3);
    font-family: 'DM Mono', monospace;
    min-width: 90px;
  }
  .cat-pagination { justify-content: center; padding: 14px 16px; }
}
`;

// Inject once into <head>
function injectStyles() {
  if (document.getElementById("cat-admin-styles")) return;
  const tag = document.createElement("style");
  tag.id = "cat-admin-styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

// ── Debounce hook ──────────────────────────────────────────
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ── Main component ─────────────────────────────────────────
const CategoryAdmin = () => {
  const [categories, setCategories]   = useState([]);
  const [search, setSearch]           = useState("");
  const debouncedSearch               = useDebounce(search, 350);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage]       = useState(1);
  const [perPage, setPerPage]         = useState(10);
  const [loading, setLoading]         = useState(false);

  const navigate = useNavigate();

  // inject CSS on first mount
  useEffect(() => { injectStyles(); }, []);

  // ── Fetch ────────────────────────────────────────────────
  const fetchCategories = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await api.get(
          `admin/categories?search=${encodeURIComponent(debouncedSearch)}&page=${page}&per_page=${perPage}`
        );
        setCategories(res.data.data ?? res.data ?? []);
        setCurrentPage(res.data.current_page ?? 1);
        setLastPage(res.data.last_page ?? 1);
      } catch (err) {
        console.error("Fetch categories failed", err);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, perPage]
  );

  useEffect(() => { fetchCategories(1); }, [fetchCategories]);

  // ── Delete ───────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`admin/categories/${id}`);
      fetchCategories(currentPage);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ── Pagination ───────────────────────────────────────────
  const handlePrevPage = () => { if (currentPage > 1)        fetchCategories(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < lastPage) fetchCategories(currentPage + 1); };

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="cat-page">
      <div className="cat-card">

        {/* Top controls */}
        <div className="cat-top">
          <h2 className="cat-title">Categories</h2>

          <div className="cat-controls-row">
            <div className="cat-search-wrap">
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="cat-search-input"
              />
              <button
                className="cat-btn-search"
                aria-label="Search"
                onClick={() => fetchCategories(1)}
              >
                🔍
              </button>
            </div>

            <button className="cat-btn">Filter</button>
            <button className="cat-btn">Export</button>

            <select
              className="cat-per-page"
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>

            <button
              className="cat-btn-primary"
              onClick={() => navigate("/dashboard/admin/categories/add")}
            >
              + Add Category
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="cat-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th width="160">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="cat-empty">Loading…</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan="4" className="cat-empty">No categories found</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td data-label="ID">{cat.id}</td>

                  <td data-label="Name">
                    <div className="cat-name-cell">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="cat-avatar" />
                      ) : (
                        <div className="cat-avatar-ph">
                          {(cat.name || "").charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="cat-name-main">{cat.name}</div>
                        <div className="cat-name-slug">
                          {cat.slug || (cat.code ? `#${cat.code}` : "—")}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td data-label="Description">
                    {cat.description || <span style={{ color: "var(--cat-t3)" }}>—</span>}
                  </td>

                  <td data-label="Action">
                    <div className="cat-actions">
                      <button
                        className="cat-btn-edit"
                        onClick={() => navigate(`/dashboard/admin/categories/edit/${cat.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="cat-btn-delete"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="cat-pagination">
          <button
            className="cat-btn-page"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <div className="cat-page-info">{currentPage} / {lastPage}</div>
          <button
            className="cat-btn-page"
            onClick={handleNextPage}
            disabled={currentPage === lastPage}
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
};

export default CategoryAdmin;
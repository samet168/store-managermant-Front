/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./style/User.css";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef();

  const [user, setUser] = useState({ name: "", email: "", role: "", password: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data || res.data;
        setUser({ name: data.name || "", email: data.email || "", role: data.role || "", password: "" });
        setPreview(data.image || "");
      } catch {
        setError("Failed to load user");
      }
    };
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("role", user.role);
    if (user.password) formData.append("password", user.password);
    if (image) formData.append("image", image);

    try {
      await api.post(`admin/users/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert("User updated successfully");
      navigate("/dashboard/admin/users");
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message);
      else if (err.response?.data?.errors) setError(Object.values(err.response.data.errors).flat().join(", "));
      else setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-user-container">
      <div className="edit-user-card">

        <h2>Edit User</h2>
        <p className="subtitle">Update user information and permissions</p>

        {error && <div className="error">{error}</div>}

        {/* Avatar */}
        <div className="avatar" onClick={() => fileRef.current.click()}>
          {preview ? (
            <img src={preview} alt="avatar" />
          ) : (
            <div className="placeholder">Upload</div>
          )}
        </div>
        <p className="upload-hint">Click to upload new photo</p>

        <input ref={fileRef} type="file" hidden accept="image/*" onChange={handleImage} />

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="field-group">
            <label className="field-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              Full Name
            </label>
            <input name="name" placeholder="Full name" value={user.name} onChange={handleChange} required />
          </div>

          {/* Email */}
          <div className="field-group">
            <label className="field-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              Email Address
            </label>
            <input name="email" type="email" placeholder="Email address" value={user.email} onChange={handleChange} />
          </div>

          {/* Role */}
          <div className="field-group">
            <label className="field-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2 7h7l-5.5 4 2 7L12 17l-5.5 3 2-7L3 9h7z"/></svg>
              Role
            </label>
            <div className="select-wrapper">
              <select name="role" value={user.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="cashier">Cashier</option>
                <option value="supplier">Supplier</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>

          <div className="divider" />

          {/* Buttons */}
          <div className="btn-row">
            <button type="button" className="btn-cancel" onClick={() => navigate("/dashboard/admin/users")}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? <span className="spinner" /> : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              )}
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api"; // Axios instance with baseURL
import "./style/AddProduct.css";

const AddProductManager = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category_id: "",
    status: "active",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token"); 

  // Fetch categories from Laravel
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/admin/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories", err.response?.data || err.message);
        alert("Failed to fetch categories. Check your login.");
      }
    };
    if (token) fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "image" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Unauthorized. Please login.");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("category_id", formData.category_id);
      data.append("status", formData.status);
      if (formData.image) data.append("image", formData.image);

      const res = await api.post("/admin/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product added:", res.data);
      alert("Product added successfully!");
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.error("Add product failed:", err.response?.data || err.message);
      alert("Failed to add product. Check console for details.");
    }
  };

  const handleClose = () => navigate("/dashboard/admin/products");

  return (
    <div className="add-product-container">
      <div className="form-card">
        <button className="close-x" onClick={handleClose}>×</button>
        <h2 className="form-title">Add New Product</h2>
        <form className="product-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} required>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" name="image" onChange={handleChange} accept="image/*" required />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Product</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProductManager;
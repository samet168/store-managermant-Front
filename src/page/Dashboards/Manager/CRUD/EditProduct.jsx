import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../services/api";
import "./style/AddProduct.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category_id: "",
    status: "active",
    image: null,
    preview: null,
  });

  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token"); // Ensure admin token is stored

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/manager/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data.data;
        setProduct({
          ...p,
          image: null,
          preview: p.image, // existing image URL
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
        alert("Cannot fetch product data.");
      }
    };
    fetchProduct();
  }, [id, token]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/manager/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        alert("Cannot fetch categories.");
      }
    };
    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setProduct({
        ...product,
        image: files[0],
        preview: URL.createObjectURL(files[0]),
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("category_id", product.category_id);
    formData.append("status", product.status);
    if (product.image) formData.append("image", product.image);

    try {
      await api.post(`/manager/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      navigate("/dashboard/manager/products");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="add-product-container">
      <div className="form-card">
        <button className="close-x" onClick={() => navigate("/dashboard/manager/products")}>×</button>
        <h2 className="form-title">Edit Product</h2>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category_id" value={product.category_id} onChange={handleChange} required>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={product.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Change Image</label>
            <input type="file" name="image" onChange={handleChange} accept="image/*" />
            {product.preview && <img src={product.preview} alt="Preview" style={{ marginTop: 10, maxWidth: 120 }} />}
          </div>

          <div className="form-actions">
            <button className="save-btn" type="submit">Update Product</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;
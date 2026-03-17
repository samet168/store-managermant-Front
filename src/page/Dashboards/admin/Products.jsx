import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Product.css";
import api from "../../../services/api";

const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Fetch products with pagination
  const fetchProducts = async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/products/list?page=${page}&search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data.data || []);
      setCurrentPage(res.data.current_page || 1);
      setLastPage(res.data.last_page || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err.response?.data || err.message);
      alert("Failed to fetch products. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Unauthorized. Please login.");
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [token, navigate]);

  // DELETE product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh current page
      fetchProducts(currentPage);
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete product. Check console for details.");
    }
  };

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination buttons
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <button
          key={i}
          className={i === currentPage ? "pagination-btn active" : "pagination-btn"}
          onClick={() => fetchProducts(i, search)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="product-page">
      <div className="product-header">
        <h2>📦 Product Management</h2>
        <button className="btn-add" onClick={() => navigate("/dashboard/admin/add-product")}>
          + Add Product
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchProducts(1, e.target.value); // fetch first page with search term
          }}
        />
      </div>

      <div className="table-wrapper">
        {loading ? (
          <p className="loading-text">Loading products...</p>
        ) : (
          <>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="no-data">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td><img src={p.image} alt={p.name} className="product-img" /></td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>
                        <span className={p.quantity < 10 ? "low-stock" : "in-stock"}>
                          {p.quantity}
                        </span>
                      </td>
                      <td>
                        <button className="btn-edit" onClick={() => navigate(`/dashboard/admin/edit-product/${p.id}`)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="pagination">{renderPagination()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
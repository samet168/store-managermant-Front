import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import '../../assets/style//Front/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`); // no token
      setProduct(response.data.data);
    } catch (error) {
      console.error("Fetch product failed:", error.response?.data || error.message);
    }
  };
  fetchProduct();
}, [id]);
  if (!product) return <p className="loading-text">Loading...</p>;

  return (
    <div className="main-content">
      <div className="product-detail-card">
        <div className="product-image">
          <img
            src={product.image ? `${product.image}` : "/placeholder.png"}
            alt={product.name}
          />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <button className="btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
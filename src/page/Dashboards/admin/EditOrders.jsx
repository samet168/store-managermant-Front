import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
// import './Orders.css';

const EditOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    customer_id: '',
    status: ''
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/orders/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Updated!');
      navigate('/dashboard/admin/orders');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Order</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer ID</label>
          <input
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <input
            name="status"
            value={form.status}
            onChange={handleChange}
          />
        </div>

        <button className="btn-submit">Update</button>
      </form>
    </div>
  );
};

export default EditOrders;
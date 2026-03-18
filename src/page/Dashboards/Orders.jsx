import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // axios instance

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState('');

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch orders from API with token
  const fetchOrders = async (page = 1, searchTerm = '') => {
    try {
      const res = await api.get(`/admin/orders?page=${page}&search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchOrders(1, value);
  };

  const handleNext = () => currentPage < lastPage && fetchOrders(currentPage + 1, search);
  const handlePrev = () => currentPage > 1 && fetchOrders(currentPage - 1, search);

  const handleAdd = () => navigate('/dashboard/admin/orders/add-order');
  const handleEdit = (id) => navigate(`/dashboard/admin/orders/edit/${id}`);
  const handleShow = (id) => navigate(`/dashboard/admin/orders/show/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await api.delete(`/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchOrders(currentPage, search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Orders List</h1>
      <input
        type="text"
        placeholder="Search by customer or status..."
        value={search}
        onChange={handleSearch}
      />
      <button onClick={handleAdd}>Add Order</button>

      <table border="1" cellPadding="5" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer.name}</td>
              <td>
                {o.details.map(d => (
                  <div key={d.id}>{d.product.name} x {d.quantity} (${d.price})</div>
                ))}
              </td>
              <td>{o.total_amount}</td>
              <td>{o.status}</td>
              <td>{new Date(o.order_date).toLocaleString()}</td>
              <td>
                <button onClick={() => handleShow(o.id)}>View</button>
                <button onClick={() => handleEdit(o.id)}>Edit</button>
                <button onClick={() => handleDelete(o.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {lastPage}</span>
        <button onClick={handleNext} disabled={currentPage === lastPage}>Next</button>
      </div>
    </div>
  );
};

export default Orders;
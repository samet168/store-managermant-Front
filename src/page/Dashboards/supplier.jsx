/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import '../../assets/style/Dashboard/supplier.css';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; 

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchSuppliers = async (page = 1) => {
    try {
      const res = await api.get('admin/suppliers', {
        ...config,
        params: { search, page },
      });
      setSuppliers(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
    }
  };

  useEffect(() => {
    fetchSuppliers(currentPage);
  }, [search, currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await api.delete(`admin/suppliers/${id}`, config);
        fetchSuppliers(currentPage);
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return (
    <div className="supplier-page">
      <h1 className="page-title">Supplier Management</h1>

      <div className="supplier-actions">
        <button className="btn-add" onClick={() => navigate('/dashboard/admin/suppliers/add')}>Add Supplier</button>
        <button className="btn-export">Export List</button>
        <input
          type="text"
          placeholder="Search supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="supplier-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email || '-'}</td>
              <td>{s.phone || '-'}</td>
              <td>
                <button className="btn-edit" onClick={() => navigate(`/dashboard/admin/suppliers/edit/${s.id}`)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No suppliers found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Supplier;
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
// import './style/AddSupplier.css';

const AddSupplier = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    contact_info: '',
    address: ''
  });
  const [errors, setErrors] = useState({}); // store validation errors

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('admin/suppliers', form, config);
      navigate('/dashboard/admin/suppliers');
    } catch (err) {
      if (err.response && err.response.status === 422) {
        // Laravel validation errors
        setErrors(err.response.data.errors);
      } else {
        console.error('Add supplier failed:', err);
      }
    }
  };

  return (
 <div className="supplier-page-add">
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit} className="supplier-form">
        <div>
          <label>Name *</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>

        <div>
          <label>Contact Info</label>
          <input name="contact_info" value={form.contact_info} onChange={handleChange} />
          {errors.contact_info && <p className="error">{errors.contact_info[0]}</p>}
        </div>

        <div>
          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} />
          {errors.address && <p className="error">{errors.address[0]}</p>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button type="submit" className="btn-add">Save</button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/admin/suppliers')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;
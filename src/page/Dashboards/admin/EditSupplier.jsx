import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
// import '../../assets/style/Dashboard/supplier.css';

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    contact_info: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await api.get(`admin/suppliers/${id}`, config);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch supplier:', err);
        setLoading(false);
      }
    };
    fetchSupplier();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`admin/suppliers/${id}`, form, config);
      navigate('/dashboard/admin/suppliers');
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error('Update failed:', err);
      }
    }
  };

  if (loading) return <p>Loading supplier data...</p>;

  return (
    <div className="supplier-page-edit">
      <h2>Edit Supplier</h2>
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

        <button type="submit" className="btn-add-edit">Update</button>
        <button type="button" className="btn-cancel-edit" onClick={() => navigate('/dashboard/admin/suppliers')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditSupplier;
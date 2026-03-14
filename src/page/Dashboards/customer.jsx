import React from 'react';
import '../../style/customer.css';

const customer = () => {
  return (
    <div className="customer-page">
      <h1 className="page-title">Customer Management</h1>

      {/* Search & Add Button */}
      <div className="customer-actions">
        <input
          type="text"
          placeholder="Search customers..."
          className="search-input"
        />
        <button className="btn-add">Add Customer</button>
      </div>

      {/* Customer Table */}
      <table className="customer-table">
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
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>+855 123 456 789</td>
            <td>
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>+855 987 654 321</td>
            <td>
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default customer;
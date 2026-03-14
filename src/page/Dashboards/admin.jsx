import React from 'react';
import '../../style/admin.css';

const admin = () => {
  return (
    <div className="admin-page">
      <h1 className="page-title">Admin Dashboard</h1>

      {/* Overview Section */}
      <div className="admin-overview">
        <div className="card">
          <h3>Total Sales</h3>
          <p>$25,000</p>
        </div>
        <div className="card">
          <h3>Total Stock</h3>
          <p>1,250 items</p>
        </div>
        <div className="card">
          <h3>Pending Orders</h3>
          <p>18</p>
        </div>
        <div className="card">
          <h3>Profit / Loss</h3>
          <p>$5,200</p>
        </div>
      </div>

      {/* Manage Products */}
      <div className="admin-section">
        <h2>Manage Products</h2>
        <div className="action-buttons">
          <button className="btn-add">Add Product</button>
          <button className="btn-edit">Edit Product</button>
          <button className="btn-delete">Delete Product</button>
          <button className="btn-view">View Products</button>
        </div>
      </div>

      {/* Manage Users */}
      <div className="admin-section">
        <h2>Manage Users</h2>
        <div className="action-buttons">
          <button className="btn-add">Create User</button>
          <button className="btn-edit">Edit User</button>
          <button className="btn-delete">Delete User</button>
          <button className="btn-view">Assign Roles</button>
        </div>
      </div>

      {/* Reports Section */}
      <div className="admin-section">
        <h2>Reports</h2>
        <div className="report-cards">
          <div className="card report-card">Sales Report</div>
          <div className="card report-card">Stock Report</div>
          <div className="card report-card">Purchase Report</div>
        </div>
      </div>

      {/* Stock Logs */}
      <div className="admin-section">
        <h2>Stock Logs</h2>
        <div className="card stock-log">
          <p>[History of stock changes]</p>
        </div>
      </div>
    </div>
  );
};

export default admin;
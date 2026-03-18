import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/style/Dashboard/admin.css';

const Admin = () => {

  const navigate = useNavigate();

  // Product Functions
  const handleAddProduct = () => {
    navigate('/dashboard/admin/add-product');
  };

  const handleEditProduct = () => {
    navigate('/dashboard/admin/edit-product');
  };

  const handleDeleteProduct = () => {
    navigate('/dashboard/admin/delete-product');
  };

  const handleViewProducts = () => {
    navigate('/dashboard/admin/products');
  };

  // User Functions
  const handleCreateUser = () => {
    navigate('/dashboard/admin/create-user');
  };

  const handleEditUser = () => {
    navigate('/dashboard/admin/edit-user');
  };

  const handleDeleteUser = () => {
    navigate('/dashboard/admin/delete-user');
  };

  const handleAssignRoles = () => {
    navigate('/dashboard/admin/roles');
  };

  // Reports
  const handleSalesReport = () => {
    navigate('/dashboard/admin/report/sales');
  };

  const handleStockReport = () => {
    navigate('/dashboard/admin/report/stock');
  };

  const handlePurchaseReport = () => {
    navigate('/dashboard/admin/report/purchase');
  };

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
          <button className="btn-add" onClick={handleAddProduct}>Add Product</button>
          <button className="btn-edit" onClick={handleEditProduct}>Edit Product</button>
          <button className="btn-delete" onClick={handleDeleteProduct}>Delete Product</button>
          <button className="btn-view" onClick={handleViewProducts}>View Products</button>
        </div>
      </div>

      {/* Manage Users */}
      <div className="admin-section">
        <h2>Manage Users</h2>
        <div className="action-buttons">
          <button className="btn-add" onClick={handleCreateUser}>Create User</button>
          <button className="btn-edit" onClick={handleEditUser}>Edit User</button>
          <button className="btn-delete" onClick={handleDeleteUser}>Delete User</button>
          <button className="btn-view" onClick={handleAssignRoles}>Assign Roles</button>
        </div>
      </div>

      {/* Reports Section */}
      <div className="admin-section">
        <h2>Reports</h2>
        <div className="report-cards">
          <div className="card report-card" onClick={handleSalesReport}>Sales Report</div>
          <div className="card report-card" onClick={handleStockReport}>Stock Report</div>
          <div className="card report-card" onClick={handlePurchaseReport}>Purchase Report</div>
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

export default Admin;
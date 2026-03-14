import React from 'react';
import '../../style/supplier.css';

const supplier = () => {
  return (
    <div className="supplier-page">
      <h1 className="page-title">Supplier Management</h1>

      {/* Action Buttons */}
      <div className="supplier-actions">
        <button className="btn-add">Add Supplier</button>
        <button className="btn-export">Export List</button>
      </div>

      {/* Supplier Table */}
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
          <tr>
            <td>1</td>
            <td>ABC Supplies</td>
            <td>abc@supplies.com</td>
            <td>+855 123 456 789</td>
            <td>
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>XYZ Traders</td>
            <td>xyz@traders.com</td>
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

export default supplier;
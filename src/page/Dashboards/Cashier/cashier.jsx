import React from 'react';
import '../../../assets/style/Dashboard/cashier.css';

const cashier = () => {
  return (
    <div className="cashier-page">
      <h1 className="page-title">Cashier Dashboard</h1>

      {/* Quick Actions */}
      <div className="cashier-actions">
        <button className="btn-action">New Sale</button>
        <button className="btn-action">Refund</button>
        <button className="btn-action">Reports</button>
      </div>

      {/* Sales Table */}
      <table className="cashier-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>John Doe</td>
            <td>$120.00</td>
            <td>Paid</td>
            <td>
              <button className="btn-edit">View</button>
            </td>
          </tr>
          <tr>
            <td>002</td>
            <td>Jane Smith</td>
            <td>$80.00</td>
            <td>Pending</td>
            <td>
              <button className="btn-edit">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default cashier;
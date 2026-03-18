import React from 'react';
import '../../assets/style/Dashboard/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      {/* Dashboard cards */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Customers</h3>
          <p>120</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>75</p>
        </div>
        <div className="card">
          <h3>Revenue</h3>
          <p>$12,500</p>
        </div>
        <div className="card">
          <h3>Active Employees</h3>
          <p>15</p>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="dashboard-charts">
        <div className="chart">
          <h3>Sales Overview</h3>
          <div className="chart-placeholder">[Chart]</div>
        </div>
        <div className="chart">
          <h3>Customer Growth</h3>
          <div className="chart-placeholder">[Chart]</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import "../../style/manager.css"; 

const Manager = () => {
  return (
    <div className="manager-page">
      <h1 className="page-title">Manager Dashboard</h1>

      {/* Overview Cards */}
      <div className="manager-cards">
        <div className="card">
          <h3>Total Employees</h3>
          <p>25</p>
        </div>
        <div className="card">
          <h3>Active Projects</h3>
          <p>8</p>
        </div>
        <div className="card">
          <h3>Pending Orders</h3>
          <p>12</p>
        </div>
        <div className="card">
          <h3>Revenue</h3>
          <p>$18,200</p>
        </div>
      </div>

      {/* Reports Section */}
      <div className="manager-reports">
        <div className="report">
          <h3>Project Status</h3>
          <div className="report-placeholder">[Chart]</div>
        </div>
        <div className="report">
          <h3>Employee Performance</h3>
          <div className="report-placeholder">[Chart]</div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
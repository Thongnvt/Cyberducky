import React from 'react';
import './DashBoard.css';
import StaffPage from '../Dashboard/StaffPage';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <StaffPage />

      <h1>DASHBOARD THỐNG KÊ</h1>

      <p>Tháng này bạn chưa có chi tiêu.</p>
    </div>
  );
};

export default Dashboard;

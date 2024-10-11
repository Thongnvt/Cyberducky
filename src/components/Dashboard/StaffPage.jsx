import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './StaffPage.css'

const AdminDashboard = () => {
  return (

    <div className="staffpage">

      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/login">Admin Dashboard</Navbar.Brand>
        <Nav className="staff-page">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/orders">Quản lý đơn hàng</Nav.Link>
          <Nav.Link as={Link} to="/customers">Quản lý khách hàng</Nav.Link>
        </Nav>
      </Navbar>

    </div>

  );
};

export default AdminDashboard;

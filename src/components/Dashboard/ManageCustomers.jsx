import React from 'react';
import { Table } from 'react-bootstrap';
import './ManageCustomers.css';

const ManageCustomers = () => {
  const mockCustomers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0123456789' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', phone: '0987654321' },
    { id: 3, name: 'Lê Minh C', email: 'c@example.com', phone: '0909090909' }
  ];

  return (
    <div className='manage-customers'>
      <h1>QUẢN LÍ KHÁCH HÀNG</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {mockCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageCustomers;

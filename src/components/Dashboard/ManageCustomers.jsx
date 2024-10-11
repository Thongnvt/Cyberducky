import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './ManageCustomers.css';
import StaffPage from '../Dashboard/StaffPage';

const ManageCustomers = () => {
  const [maskInfo, setMaskInfo] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const mockCustomers = [
    { id: 1, name: 'rthsrthrt', email: 'thongnvt16122003@gmail.com', phone: '34556735467', address: 'NULL' },
    { id: 2, name: 'thong', email: 'thongnvtse171008@fpt.edu.vn', phone: '0982143004', address: 'NULL' },
    { id: 3, name: 'string', email: 'string@gmail.com', phone: '0909090909', address: 'NULL' },
    { id: 4, name: 'chacchanlaquocanhdeptrai', email: 'anhvdqse171765@fpt.edu.vn', phone: '111222', address: 'NULL' },
    { id: 6, name: 'Nguyen Thong', email: 'bocuas1mple@gmail.com', phone: '09821430049', address: '144/27 đường Man Thiện quận 9 thành phố Thủ Đức' },
  ];

  const toggleMaskInfo = () => {
    setMaskInfo(!maskInfo);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter customers based on the search query
  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='manage-customers'>
      <StaffPage />
      <h1>QUẢN LÍ KHÁCH HÀNG</h1>
      <Button onClick={toggleMaskInfo} className='mb-3'>
        {maskInfo ? 'Show Details' : 'Hide Details'}
      </Button>

      {/* Search Input */}
      <Form.Control
        type='text'
        placeholder='Search by name...'
        value={searchQuery}
        onChange={handleSearchChange}
        className='mb-3'
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>
                {maskInfo ? customer.email.replace(/(.{2})(.*)(?=@)/, '$1*****') : customer.email}
              </td>
              <td>
                {maskInfo ? customer.phone.replace(/(\d{3})(\d{3})(\d+)/, '$1*****') : customer.phone}
              </td>
              <td>
                {maskInfo ? '*****' : customer.address} {/* Mask entire address */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageCustomers;

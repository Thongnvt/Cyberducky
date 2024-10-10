import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './ManageOrders.css';

const AdminDashboard = () => {
  // Dữ liệu giả (mock data)
  const mockOrders = [
    { id: 1, customerName: 'Nguyễn Văn A', total: '500,000 VND', status: 'Đang xử lý' },
    { id: 2, customerName: 'Trần Thị B', total: '1,200,000 VND', status: 'Đã giao' },
    { id: 3, customerName: 'Lê Minh C', total: '300,000 VND', status: 'Đã hủy' }
  ];



  const [orders, setOrders] = useState(mockOrders);


  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="manage-orders">
      <h1>QUẢN LÍ ĐƠN HÀNG</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Tình trạng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
              <td>
                <Button
                  onClick={() => handleOrderStatusChange(order.id, 'Đã giao')}
                  variant="success"
                >
                  Đánh dấu đã giao
                </Button>
                <Button
                  onClick={() => handleOrderStatusChange(order.id, 'Đã hủy')}
                  variant="danger"
                >
                  Hủy đơn
                </Button>
              </td>
            </tr>
          ))}
        
      

      
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;

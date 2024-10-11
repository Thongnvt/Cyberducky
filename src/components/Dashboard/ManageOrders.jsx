import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './ManageOrders.css';
import StaffPage from '../Dashboard/StaffPage';

const AdminDashboard = () => {
  // Mock data with multiple products for each order
  const mockOrders = [
    {
      id: 1,
      customerName: 'Nguyen Thong',
      products: [
        { name: 'RGB keycap', amount: '1', total: '900000' },
        { name: 'Mini keycap', amount: '1', total: '300000' },
        { name: 'Xa lánh keycap', amount: '1', total: '150000' },
        { name: 'Colorful keycap', amount: '1', total: '60000' }
      ],
      status: 'Đang xử lý',
      dateOrder: '2024-10-11'
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      products: [
        { name: 'Keycap Set', amount: '1', total: '1200000' }
      ],
      status: 'Đã giao',
      dateOrder: '2024-10-10'
    },
    {
      id: 3,
      customerName: 'Lê Minh C',
      products: [
        { name: 'Single Keycap', amount: '5', total: '300000' }
      ],
      status: 'Đã hủy',
      dateOrder: '2024-10-09'
    }
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // To manage which order ID is expanded

  const handleOrderStatusChange = (orderId, newStatus, event) => {
    event.stopPropagation(); // Prevent row click from toggling details
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId); // Toggle order details
  };

  // Filter out orders with id 2 and 3
  const filteredOrders = orders.filter(order => order.id !== 2 && order.id !== 3);

  return (
    <div className="manage-orders">
      <StaffPage />
      <h1>QUẢN LÍ ĐƠN HÀNG</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <React.Fragment key={order.id}>
              <tr onClick={() => toggleOrderDetails(order.id)} style={{ cursor: 'pointer' }}>
                <td>{order.id}</td>
                <td>{order.products?.map(product => product.name).join(', ') || 'N/A'}</td>
                <td>{order.products?.reduce((sum, product) => sum + parseInt(product.amount), 0) || 0}</td>
                <td>{order.products?.reduce((sum, product) => sum + parseInt(product.total), 0) || 0} VND</td>
                <td>
                  <Button
                    onClick={(event) => handleOrderStatusChange(order.id, 'Đã giao', event)} // Pass the event
                    variant="success"
                  >
                    Đánh dấu đã giao
                  </Button>
                  <Button
                    onClick={(event) => handleOrderStatusChange(order.id, 'Đã hủy', event)} // Pass the event
                    variant="danger"
                  >
                    Hủy đơn
                  </Button>
                </td>
              </tr>
              {expandedOrderId === order.id && (
                <tr>
                  <td colSpan={2}>Khách hàng: {order.customerName}</td>
                  <td>Ngày đặt: {order.dateOrder}</td>
                  <td>Tình trạng: {order.status}</td>
                </tr>
              )}
              {expandedOrderId === order.id && (
                <tr>
                  <td colSpan={5}>
                    <h6>Chi tiết sản phẩm:</h6>
                    <ul>
                      {order.products?.map((product, index) => (
                        <li key={index}>
                          {product.name} - Số lượng: {product.amount}, Tổng: {product.total} VND
                        </li>
                      )) || <li>Không có sản phẩm</li>} {/* Fallback for no products */}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;

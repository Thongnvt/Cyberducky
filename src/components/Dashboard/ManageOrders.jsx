import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import './ManageOrders.css';
import StaffPage from '../Dashboard/StaffPage';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/orders/all');
        const updatedOrders = response.data.map((order) => ({
          ...order,
          // Update status based on paymentDate presence
          status: order.paymentDate ? 1 : 3 // "Đang xử lý" if paid, "Đã hủy" if not paid or failed
        }));
        setOrders(updatedOrders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderStatusChange = async (orderId, newStatus, event) => {
    event.stopPropagation();
    try {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      await axios.patch(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/orders/${orderId}/status`, {
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: order.status } : order
        )
      );
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1: return 'Đang xử lý';
      case 2: return 'Đã giao';
      case 3: return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="manage-orders">
      <StaffPage />
      <h1>QUẢN LÍ ĐƠN HÀNG</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Ngày thanh toán</th>
            <th>Tình trạng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <tr onClick={() => toggleOrderDetails(order.id)} style={{ cursor: 'pointer' }}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{order.priceTotal} VND</td>
                <td>{order.paymentDate || 'Chưa thanh toán'}</td>
                <td>{getStatusText(order.status)}</td>
                <td>
                  <Button
                    onClick={(event) => handleOrderStatusChange(order.id, 1, event)}
                    variant="success"
                  >
                    Đánh dấu đang xử lý
                  </Button>
                  <Button
                    onClick={(event) => handleOrderStatusChange(order.id, 3, event)}
                    variant="danger"
                  >
                    Hủy đơn
                  </Button>
                </td>
              </tr>
              {expandedOrderId === order.id && (
                <tr>
                  <td colSpan={6}>
                    <h6>Chi tiết đơn hàng:</h6>
                    <p>Mã thanh toán: {order.codePay || 'Không có'}</p>
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

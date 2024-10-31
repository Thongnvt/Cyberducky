import React, { useContext } from 'react';
import { UserContext } from '../Login/UserContext'; // Adjust the import path based on your structure';
import './UserDetail.css'; // Optional: add your styling file

const UserDetails = () => {
    const { user } = useContext(UserContext); // Get user data from context

    // Check if user data is available
    if (!user) {
        return <div className="user-details">Vui lòng đăng nhập để xem thông tin tài khoản của bạn.</div>; // Prompt to log in
    }

    return (
        <div className="user-details">
            <h2>Thông Tin Tài Khoản</h2>
            <div className="user-info">
                <p><strong>Tên thật:</strong> {user.name || 'Chưa có thông tin'}</p>
                <p><strong>Tên tài khoản:</strong> {user.email.split('@')[0]}</p>
                <p><strong>Số điện thoại:</strong> {user.phone || 'Chưa có thông tin'}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
            </div>
        </div>
    );
};

export default UserDetails;

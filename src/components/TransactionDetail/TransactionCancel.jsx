import React from 'react';
import './TransactionCancel.css'; // Assuming you have a CSS file for styles
import successImage from '../../assets/cảm ơn rõ.png';
const SuccessPage = () => {
    return (
        <div className="success-page-container">
            <h1>Xác nhận đã huỷ đơn hàng</h1>
            <p>Bạn đã huỷ đơn hàng, hy vọng có thể gặp lại bạn vào lần sau !!</p>
            <img
                src={successImage}
                alt="Order Success"
                className="success-image"
            />
            <button
                onClick={() => window.location.href = '/'} // Navigate back to the homepage
                className="home-button"
            >
                Về trang chủ
            </button>
        </div>
    );
};

export default SuccessPage;

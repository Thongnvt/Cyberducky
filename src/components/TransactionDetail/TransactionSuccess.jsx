import React from 'react';
import './TransactionSuccess.css'; // Assuming you have a CSS file for styles
import successImage from '../../assets/cảm ơn rõ.png';
const SuccessPage = () => {
    return (
        <div className="success-page-container">
            <h1>Đặt hàng thành công!</h1>
            <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.</p>
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

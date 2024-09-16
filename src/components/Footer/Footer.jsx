import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>CYBERDUCKY</h4>
                    <p>CHỨNG NHẬN ĐKKD SỐ: </p>
                    <p>ĐĂNG KÝ</p>
                    <p>EMAIL</p>
                </div>
                <div className="footer-section">
                    <h4>CHÍNH SÁCH BẢO HÀNH</h4>
                    <p>CHÍNH SÁCH BẢO HÀNH</p>
                    <p>CHÍNH SÁCH KIỂM HÀNG</p>
                    <p>CHÍNH SÁCH ĐỔI TRẢ HOÀN TIỀN</p>
                    <p>CHÍNH SÁCH THANH TOÁN</p>
                    <p>CHÍNH SÁCH BẢO MẬT</p>
                    <p>CHÍNH SÁCH VẬN CHUYỂN</p>
                </div>
                <div className="footer-section">
                    <h4>CONTACT</h4>
                    <p>LINK FACEBOOK</p>
                    <p>LINK INSTAGRAM</p>
                    <p>SỐ ĐIỆN THOẠI</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Cyberducky | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;

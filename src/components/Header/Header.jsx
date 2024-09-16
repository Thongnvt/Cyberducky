import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import mainLogo from '../../assets/mainlogo.png';
const Header = () => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <div className="header">
            <div className="top-bar">
                <div className="hotline">
                    <a href="tel:19001809">HOTLINE: 1900 1809   </a>
                </div>
                <img src={mainLogo} alt="Logo" className="logo" />
                <div className="account-cart">
                    <a href="/account">TÀI KHOẢN</a>
                    <a href="/cart">GIỎ HÀNG <span className="cart-count">{cartCount}</span></a>
                </div>
            </div>
            <nav className="row mt-3">
                <div className="col">
                    <button className="btn btn-custom-grey" onClick={() => window.location.href = '/'}>TRANG CHỦ</button>
                </div>
                <div className="col">
                    <button className="btn btn-custom-grey" onClick={() => window.location.href = '/'}>KEYCAPS ĐƠN</button>
                </div>
                <div className="col">
                    <button className="btn btn-custom-grey" onClick={() => window.location.href = '/'}>KEYCAPS LẺ</button>
                </div>
                <div className="col">
                    <button className="btn btn-custom-grey" onClick={() => window.location.href = '/'}>DECAL LAPTOP</button>
                </div>
                <div className="col">
                    <button className="btn btn-custom-grey" onClick={() => window.location.href = '/'}>BÀI VIẾT</button>
                </div>
                <div className="col">
                    <button className="btn btn-custom-grey" onClick={() => window.location.href = '/'}>VỀ CYBER DUCKY</button>
                </div>
            </nav>
        </div>
    );
};

export default Header;
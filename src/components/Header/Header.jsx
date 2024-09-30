// src/components/Header/Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import mainLogo from '../../assets/mainlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onSearchClick }) => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <div className="header">
            <div className="top-bar">
                <div className="hotline">
                    <a href="tel:19001809">HOTLINE: 1900 1809</a>
                </div>
                <img src={mainLogo} alt="Logo" className="logo" />
                <div className="account-cart" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/account">ĐĂNG NHẬP</Link>
                    <Link to="/cart">GIỎ HÀNG <span className="cart-count">{cartCount}</span></Link>
                    <div className="search-icon-header" onClick={onSearchClick} style={{ marginLeft: '15px', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
            </div>
            <nav className="row mt-3">
                <div className="col">
                    <Link to="/" className="btn btn-custom-grey">TRANG CHỦ</Link>
                </div>
                <div className="col">
                    <Link to="/keycaps-single" className="btn btn-custom-grey">KEYCAPS LẺ</Link>
                </div>
                <div className="col">
                    <Link to="/keycaps-set" className="btn btn-custom-grey">KEYCAPS BỘ</Link>
                </div>
                <div className="col">
                    <Link to="/decal-laptop" className="btn btn-custom-grey">DECAL LAPTOP</Link>
                </div>
                <div className="col">
                    <Link to="/articles" className="btn btn-custom-grey">BÀI VIẾT</Link>
                </div>
                <div className="col">
                    <Link to="/about" className="btn btn-custom-grey">VỀ CYBER DUCKY</Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;

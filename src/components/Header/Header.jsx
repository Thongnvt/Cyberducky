import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import mainLogo from '../../assets/mainlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../Pages/Login/UserContext'; // Import UserContext
import { CartContext } from '../../Pages/Cart/CartContext'; // Import CartContext
import { useNavigate } from 'react-router-dom';
const Header = ({ onSearchClick }) => {
    const { user, setUser } = useContext(UserContext); // Get user from context
    const { cart, clearCart } = useContext(CartContext); // Get cart from context
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => setShowDropdown(true);
    const handleMouseLeave = () => setShowDropdown(false);

    const handleLogout = () => {
        clearCart();
        setUser(null); // Clear user from context on logout
        localStorage.removeItem('user'); // Optionally remove user data from local storage
        localStorage.removeItem('token'); // Optionally remove token from local storage
        navigate('/'); // Redirect to home page
    };



    return (
        <div className="header">
            <div className="top-bar">
                <div className="hotline">
                    <a href="tel:19001809">HOTLINE: 1900 1809</a>
                </div>
                <img src={mainLogo} alt="Logo" className="logo" />
                <div className="account-cart" style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        show={showDropdown}
                    >
                        <Dropdown.Toggle as={Button} variant="link" id="dropdown-basic" style={{ textDecoration: 'none' }}>
                            {user ? user.email.split('@')[0] : 'TÀI KHOẢN'} {/* Show email without domain or 'TÀI KHOẢN' */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {user ? (
                                <>
                                    <Dropdown.Item as={Link} to="/user-details">Chi tiết tài khoản</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                                </>
                            ) : (
                                <>
                                    <Dropdown.Item as={Link} to="/login">ĐĂNG NHẬP</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/register">ĐĂNG KÝ</Dropdown.Item>
                                </>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link to="/cart" style={{ marginLeft: '15px' }}>
                        GIỎ HÀNG <span className="cart-count">{cart.length}</span> {/* Update cart count */}
                    </Link>
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

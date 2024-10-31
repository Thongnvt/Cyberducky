import React, { useContext, useEffect, useState } from 'react';
import CartItem from './CartItem';
import './Cart.css';
import { UserContext } from '../../Pages/Login/UserContext'; // Import UserContext
import emptyCartImage from '../../assets/giỏ hàng rõ.png';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Cart = () => {
    const { user } = useContext(UserContext);
    ;// Lấy user từ context
    const [products, setProducts] = useState([]); // State để lưu sản phẩm
    const [loading, setLoading] = useState(true); // State để theo dõi quá trình tải

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (!user) return; // Nếu người dùng chưa đăng nhập thì không gọi API

            try {
                const response = await axios.get(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/orders/customer/${user.id}`);
                console.log('Cart API response:', response.data); // In ra phản hồi từ API
                setProducts(response.data.data.product || []); // Lưu sản phẩm vào state
            } catch (error) {
                console.error('Error fetching cart products:', error);
            } finally {
                setLoading(false); // Đặt loading thành false khi hoàn thành
            }
        };

        fetchCartProducts();
    }, [user]);

    // Calculate total price
    const totalPrice = products.reduce((total, item) => total + item.price, 0);

    if (loading) {
        return <div>Loading...</div>; // Hiển thị khi đang tải
    }

    return (
        <div className="cart-container">
            <nav className="breadcrumb"></nav>
            <h2>Giỏ Hàng ({products.length} Sản Phẩm)</h2>

            <div className="cart-items">
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <CartItem

                            key={`${item.productId}-${item.orderId}-${index}`} // Sử dụng orderId làm key
                            name={item.nameProduct} // Sử dụng tên sản phẩm
                            price={item.price}
                            imageSrc={item.imageUrl} // Sử dụng URL của ảnh
                        />
                    ))
                ) : (
                    <div className="empty-cart">
                        <img src={emptyCartImage} alt="Giỏ hàng rỗng" />
                    </div>
                )}
            </div>

            {products.length > 0 && (
                <div className="cart-summary">
                    <h3>Tổng Tiền: {totalPrice.toLocaleString()} VND</h3> {/* Hiển thị tổng tiền */}
                </div>
            )}

            <div className="cart-buttons">
                {/* Use Link for navigation to the payment section */}
                <Link to="/payment">
                    <button className="checkout-button">THANH TOÁN</button>
                </Link>
                <Link to="/">
                    <button className="back-button">VỀ TRANG CHỦ</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;

import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../Pages/Cart/CartContext'; // Context to get cart items
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import { UserContext } from '../../Pages/Login/UserContext';
import { Modal } from 'react-bootstrap'; // Import the success modal
import './TransactionDetail.css'; // Assume this CSS file exists for styling
import { QRCode } from 'qrcode.react';

const SuccessModal = ({ isOpen, onClose }) => (
    <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Đặt hàng thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn sớm nhất.</Modal.Body>
        <Modal.Footer>
            <button onClick={onClose}>Đóng</button>
        </Modal.Footer>
    </Modal>
);

const CancelOrderModal = ({ isOpen, onClose, onConfirm }) => (
    <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Xác nhận hủy đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn hủy đơn hàng này?</Modal.Body>
        <Modal.Footer>
            <button onClick={onConfirm} className="confirm-cancel-btn">Có, hủy đơn hàng</button>
            <button onClick={onClose}>Không</button>
        </Modal.Footer>
    </Modal>
);

const TransactionDetail = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation


    const { cart, clearCart } = useContext(CartContext); // Retrieve cart and clearCart from CartContext
    const { user } = useContext(UserContext);
    const userId = user.id;
    const [orderId, setOrderId] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        fullName: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        note: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    console.log('Order ID from cart:', orderId);
    // Calculate total cost when cart updates


    useEffect(() => {
        const fetchCurrentOrderIdAndProducts = async () => {
            try {
                const response = await axios.get(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/orders/customer/${userId}`);
                console.log('API Response:', response.data); // Log the API response

                // Extract products and orderId from the response
                if (response.data && response.data.data.product && response.data.data.product.length > 0) {
                    // Set products to state

                    // Extracting orderId from the first product
                    const firstProduct = response.data.data.product[0];
                    setOrderId(firstProduct.orderId); // Set orderId from the first product
                    console.log('Order ID:', firstProduct.orderId); // Log the order ID
                } else {
                    console.error('No orders found for this user.');
                }
            } catch (error) {
                console.error('Error fetching cart products:', error);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchCurrentOrderIdAndProducts(); // Call the function to fetch order details
    }, [userId]);

    useEffect(() => {
        if (Array.isArray(cart)) {
            const total = cart.reduce((acc, item) => acc + item.price, 0);
            const shippingCost = cart.length > 0 ? 30000 : 0; // Add 30,000 shipping only if cart is not empty
            setTotalCost(total + shippingCost); // Update total cost with shipping
        } else {
            setTotalCost(0); // Handle case where cart is not an array
        }
    }, [cart]);

    // Handle input changes
    const handleInputChange = (e) => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required fields are missing
        const { email, fullName, phone, address, city, district, ward } = customerInfo;
        if (!email || !fullName || !phone || !address || !city || !district || !ward) {
            alert('Vui lòng điền đầy đủ thông tin khách hàng');
            return;
        }

        // Check if the payment method is selected
        if (!paymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán');
            return;
        }




        // Create order payload for API call
        const orderData = {
            customer: customerInfo,
            cartItems: cart,
            totalCost: totalCost,
            paymentMethod: paymentMethod,
        };
        if (!orderId) {
            alert('Order ID không hợp lệ. Vui lòng kiểm tra lại.');
            return;
        }


        if (!orderId) {
            alert('Order ID không hợp lệ. Vui lòng kiểm tra lại.');
            return;
        }

        // If COD is selected, you can process the order without needing an API payment response
        if (paymentMethod === "COD") {
            // Open success modal directly if COD is selected
            setIsModalOpen(true); // Open success modal
            clearCart(); // Clear the cart upon successful order
            console.log('Đặt hàng thành công lúc:', new Date().toISOString());
            // Navigate to success page after a short delay
            setTimeout(() => {
                navigate('/success'); // Navigate to the success page after a short delay
            }, 2000); // 2 seconds delay

            return; // Exit the function as no API call is needed for COD
        }

        try {
            // Gửi yêu cầu lấy liên kết thanh toán từ PayOS nếu phương thức thanh toán là PayOS
            if (paymentMethod === "PayOS") {

                const successUrl = '/success'; // Link for successful payment redirection
                const cancelUrl = '/cancel';
                console.log('Sending API request with:', { orderId, userId, cancelUrl: cancelUrl, returnUrl: successUrl });
                const paymentLinkResponse = await axios.post('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/orders/create', {
                    orderId: orderId, // Sử dụng orderId đã có
                    userId: userId, // Sử dụng userId từ context
                    cancelUrl: cancelUrl,
                    returnUrl: successUrl,
                });
                console.log('Payment Link Response:', paymentLinkResponse.data);


                if (paymentLinkResponse.status === 200) {
                    const checkoutUrl = paymentLinkResponse.data.data.checkoutUrl;
                    const qrCode = paymentLinkResponse.data.data.qrCode; // Lấy QR code từ phản hồi
                    const paymentLinkId = paymentLinkResponse.data.data.paymentLinkId;// Giả sử phản hồi chứa paymentUrl


                    console.log('Checkout URL:', checkoutUrl);
                    console.log('QR Code Data:', qrCode);
                    console.log('Payment Link ID:', paymentLinkId);

                    if (checkoutUrl) {
                        // Chuyển hướng đến checkout URL
                        window.location.href = checkoutUrl; // Redirect to the payment URL
                    } else {
                        alert('Liên kết thanh toán không hợp lệ.');
                    }
                } else {
                    alert('Không thể tạo liên kết thanh toán. Vui lòng thử lại.');
                }
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Có lỗi xảy ra trong quá trình đặt hàng.');
        }
    };

    // For other payment methods, make the API call
    // Replace with your API endpoint


    const handleCancelOrder = () => {
        setIsCancelModalOpen(true); // Show the cancel confirmation modal
    };

    const handleConfirmCancel = () => {
        setIsCancelModalOpen(false);
        clearCart(); // Clear cart when order is canceled
        navigate('/cancel-success'); // Redirect to cancellation success page
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close success modal
    };

    const handleCloseCancelModal = () => {
        setIsCancelModalOpen(false); // Close cancel modal
    };


    return (
        <div className="transaction-detail-container">
            <h2>Thông tin khách hàng</h2>
            <form onSubmit={handleSubmit} className="customer-info-form">
                {/* Form inputs for customer information */}
                <input
                    type="email"
                    name="email"
                    placeholder="Nhập email..."
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="fullName"
                    placeholder="Họ và tên"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Tỉnh, thành"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="district"
                    placeholder="Quận, huyện"
                    value={customerInfo.district}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="ward"
                    placeholder="Phường, xã"
                    value={customerInfo.ward}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="note"
                    placeholder="Ghi chú (tùy chọn)"
                    value={customerInfo.note}
                    onChange={handleInputChange}
                />

                <h3>Đơn hàng</h3>
                <div className="cart-summary">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="cart-item-image-container">
                                <img src={item['imageUrls'][0]} alt={item['nameProduct']} className="cart-item-image" />
                            </div>
                            <div className="cart-item-details">
                                <p>{item['nameProduct']}</p>
                                <p>{item.price.toLocaleString()}đ</p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <p>Tạm tính: {cart.reduce((acc, item) => acc + item.price, 0).toLocaleString()}đ</p>
                        <p>Phí vận chuyển: 30.000đ</p>
                        <p>Tổng cộng: {totalCost.toLocaleString()}đ</p>
                    </div>
                </div>

                <h3>Thanh toán</h3>
                <div className="payment-options">
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="PayOS"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        />
                        Thanh toán qua PayOS
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Visa/Mastercard"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        />
                        Thanh toán qua Visa, Mastercard, Internet Banking
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        />
                        Thanh toán khi nhận hàng (COD)
                    </label>
                </div>

                <button type="submit" className="order-button">Đặt hàng</button>
                <button onClick={handleCancelOrder} className="cancel-button">Hủy đơn hàng</button>
            </form>

            {/* Success Modal */}
            <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <CancelOrderModal isOpen={isCancelModalOpen} onClose={handleCloseCancelModal} onConfirm={handleConfirmCancel} />
        </div>
    );
};

export default TransactionDetail;

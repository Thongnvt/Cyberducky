import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';
import CheckExample from './CheckBox';
import { Link } from 'react-router-dom';
import slugify from '../../utils/slugify';
import PaginationComponent from '../../Pages/Pagination/Pagination';
import { CartContext } from '../../Pages/Cart/CartContext';
import { UserContext } from '../../Pages/Login/UserContext'; // Import UserContext
import { Modal } from 'react-bootstrap';

const ProductList = ({ title }) => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(UserContext); // Get user from context
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async (page) => {
            try {
                const response = await axios.get(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products?page=${page}&pageSize=12`);

                console.log(response.data); // Kiểm tra dữ liệu trả về từ API

                setProducts(response.data.data.listData || []);
                setOriginalProducts(response.data.data.listData || []);
                setTotalPages(response.data.data.totalPage || 1);

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchProducts(currentPage);
    }, [currentPage]);

    const handleSort = (checked) => {
        if (checked) {
            const sortedProducts = [...products].sort((a, b) => a.price - b.price);
            setProducts(sortedProducts);
        } else {
            setProducts(originalProducts);
        }
    };





    const handleAddToCart = async (product, e) => {
        e.preventDefault();
        e.stopPropagation();

        // Check if user is logged in
        if (!user) {
            setModalMessage('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.'); // Alert message for not logged in
            setShowModal(true); // Show modal
            console.log('Attempted to add product without login:', product)
            return;
        }

        console.log('Attempting to add product to cart: ', {
            id: product.id,
            name: product['nameProduct'],
            price: product.price,
            imageUrl: product['imageUrls'] && product['imageUrls'][0] ? product['imageUrls'][0] : 'no image available'
        })



        // Proceed to add to cart if user is logged in
        try {
            const userId = user.id; // Get the user ID from context
            const productId = product.id; // Get the product ID

            // Call the API to add the product to the user's order
            const response = await axios.post(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/orders/${userId}/${productId}`);
            console.log(response.data);
            // Check for a successful response

            if (response.status === 200) {
                const orderId = response.data.orderId; // Assuming the API returns an orderId
                console.log(`Order ID: ${orderId}`);

                addToCart(product); // Add product to cart
                console.log(`Successfully added to cart: ID = ${product.id}, Name = ${product['nameProduct']}`);
                setModalMessage(`${product['nameProduct']} đã được thêm vào giỏ hàng.`); // Success message
            } else {
                setModalMessage('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.'); // Error message
            }
        } catch (error) {
            console.error('Error adding product to order:', error);
            setModalMessage('Đã xảy ra lỗi, vui lòng thử lại sau.'); // Show error message
        } finally {
            setShowModal(true); // Show success or error modal
        }
    };

    const handleCloseModal = () => setShowModal(false);

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator
    }

    if (!Array.isArray(products) || products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <section className="my-4">
            <div className="product-list-container">
                <h2 className="text-center mb-4">SẢN PHẨM MỚI</h2>
                <CheckExample onChange={(checked) => handleSort(checked)} />
                <Row className="g-4">
                    {products.map((product) => {
                        console.log(product);
                        const productName = product['nameProduct'] || 'default-name'; // Sử dụng tên mặc định nếu không có name-product
                        const imageUrl = product['imageUrls'] && product['imageUrls'][0] ? product['imageUrls'][0] : 'path/to/default-image.jpg'; // Sử dụng ảnh mặc định nếu không có image-urls

                        return (
                            <Col key={product.id} md={3} sm={4} xs={12}>
                                <Link to={`/product/${slugify(productName)}`}>
                                    <Card className="h-100">
                                        <Card.Img variant="top" src={imageUrl} alt={productName} className="card-img-top" />
                                        <Card.Body>
                                            <Card.Title>{productName}</Card.Title>
                                            <Card.Text>{product.price} VND</Card.Text>
                                            <Button
                                                variant="custom"
                                                className="btn-custom"
                                                onClick={(e) => {
                                                    handleAddToCart(product, e);
                                                }}
                                            >
                                                Add to cart
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>

                <PaginationComponent
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    );
};

export default ProductList;

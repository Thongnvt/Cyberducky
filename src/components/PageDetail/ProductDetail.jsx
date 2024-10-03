import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import slugify from '../../utils/slugify'; // Import slugify function

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('Text');
    const [product, setProduct] = useState(null);
    const { productName } = useParams(); // Get productName from URL

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products?page=1&pageSize=37',

                );
                const products = response.data.data['list-data'];
                const productData = products.find((prod) => slugify(prod['name-product']) === productName); // Match by slugified product name
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productName]); // Re-fetch product when productName changes

    if (!product) {
        return <p>Xin chờ...</p>;
    }

    return (
        <div className="product-detail-container">
            <Row className="my-5">
                <Col md={6}>
                    <img
                        variant="top"
                        src={product['image-urls']}
                        alt={product['name-product']}
                        className="product-image"
                    />
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <h3 className='product-name'>{product['name-product']}</h3>
                    <p>Thương hiệu: {product.brand}</p>
                    <h4 className="product-price">{product.price} VND</h4>
                    <p>Đã bao gồm VAT</p>
                    <div className="variant-selection">
                        <p>Phiên bản:</p>
                        <Button
                            variant={variant === 'Text' ? 'dark' : 'light'}
                            onClick={() => setVariant('Text')}
                            className="variant-button"
                        >
                            TEXT
                        </Button>
                        <Button
                            variant={variant === 'Icon' ? 'dark' : 'light'}
                            onClick={() => setVariant('Icon')}
                            className="variant-button"
                        >
                            ICON
                        </Button>
                    </div>
                    <div className="quantity-selection">
                        <p>Số lượng:</p>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            className="quantity-input"
                        />
                    </div>
                    <Button variant="warning" className="add-to-cart-button">
                        Thêm vào giỏ hàng
                    </Button>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <h5 className='mota'>MÔ TẢ</h5>
                    <div className="description-box">
                        {product.description || 'Thông tin chi tiết về sản phẩm'}
                    </div>
                </Col>
            </Row>
            <Row className="related-products">
                <h5 className='sanphamlienquan'>SẢN PHẨM LIÊN QUAN</h5>
                {/* Example Related Products */}
                <Col md={3} sm={6} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="related-product-1.jpg" alt="Related Product 1" />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;

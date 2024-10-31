import React, { useState } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetail.css';

const ProductDetail = () => {
    // State hooks for quantity and variant selection
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('Text');

    return (
        <div className="product-detail-container">
            <Row className="my-5">
                {/* Product Image */}
                <Col md={6}>
                    <img
                        src="your-image-url" // Replace with your actual image URL
                        alt="Product"
                        className="product-image"
                    />
                </Col>

                {/* Product Details */}
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <h3 className='product-name'>BỘ KEYCAPS</h3>
                    <p>Thương hiệu: XYZ</p>
                    <h4 className="product-price">999.999₫</h4>
                    <p>Đã bao gồm VAT</p>

                    {/* Variant Selection */}
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

                    {/* Quantity Selection */}
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

                    {/* Add to Cart Button */}
                    <Button variant="warning" className="add-to-cart-button">
                        Thêm vào giỏ hàng
                    </Button>
                </Col>
            </Row>

            {/* Product Description */}
            <Row className="my-4">
                <Col>
                    <h5 className='mota'>MÔ TẢ</h5>
                    <div className="description-box">
                        {'Thông tin chi tiết về sản phẩm'}
                    </div>
                </Col>
            </Row>

            {/* Related Products */}
            <Row className="related-products">
                <h5 className='sanphamlienquan'>SẢN PHẨM LIÊN QUAN</h5>
                <Col md={3} sm={6} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="related-product-1.jpg" alt="Related Product 1" />
                    </Card>
                </Col>
                <Col md={3} sm={6} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="related-product-2.jpg" alt="Related Product 2" />
                    </Card>
                </Col>
                <Col md={3} sm={6} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="related-product-3.jpg" alt="Related Product 3" />
                    </Card>
                </Col>
                <Col md={3} sm={6} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="related-product-4.jpg" alt="Related Product 4" />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;

import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import slugify from '../../utils/slugify'; // Import slugify function

const mapTypeProduct = (typeId) => {
    const types = {
        1: 'Decal',
        2: 'Keycap lẻ',
        3: 'Keycap bộ',
    };
    return types[typeId] || 'Không rõ';
};

// Hàm ánh xạ colorId
const mapColorId = (colorId) => {
    const colors = {
        1: 'Đỏ',
        2: 'Trắng',
        3: 'Xanh lá',
        4: 'Vàng',
        5: 'Xanh dương',
        6: 'Cam',
        7: 'Đen',
    };
    return colors[colorId] || 'Không rõ';
};

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('Text');
    const [product, setProduct] = useState(null);
    const { productName } = useParams(); // Get productName from URL

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products?page=1&pageSize=51');
                console.log('API Response:', response.data);

                const products = response.data.data?.listData;
                console.log('Products:', products);
                console.log('Product Name from URL:', productName);

                if (!products || products.length === 0) {
                    console.error('No products found in listData');
                    return;
                }

                const productData = products.find((prod) => {
                    if (prod.nameProduct) { // Thay đổi thành nameProduct
                        const slugifiedName = slugify(prod.nameProduct);
                        console.log(`Slugified Name: ${slugifiedName}`);
                        console.log(`Comparing: ${slugifiedName} with ${productName}`);
                        return slugifiedName === productName;
                    }
                    return false;
                });

                if (!productData) {
                    console.error('Product not found with name:', productName);
                    return;
                }
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productName]);



    // Re-fetch product when productName changes

    if (!product) {
        return <p>Xin chờ...</p>;
    }

    return (
        <div className="product-detail-container">
            <Row className="my-5">
                <Col md={6}>
                    <img
                        variant="top"
                        src={product['imageUrls']}
                        alt={product['nameProduct']}
                        className="product-image"
                    />
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <h3 className='productName'>{product['nameProduct']}</h3>
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
                    <h5 className="mota">MÔ TẢ</h5>
                    <div className="description-box">
                        {product ? (
                            <div>
                                <p><strong>Tên sản phẩm:</strong> {product.nameProduct}</p>
                                <p><strong>Giá:</strong> {product.price} VND</p>
                                <p><strong>Màu sắc:</strong> {mapColorId(product.colorId)}</p>
                                <p><strong>Loại sản phẩm:</strong> {mapTypeProduct(product.typeProductId)}</p>

                            </div>
                        ) : (
                            'Thông tin chi tiết về sản phẩm chưa có'
                        )}
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
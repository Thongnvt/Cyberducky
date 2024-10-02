import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './KeycapSetProduct.css'; // Ensure this is applied properly
import CheckExample from '../ProductList/CheckBox';

const ProductList = ({ title }) => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]); // Store original product list

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products/type?page=1&pageSize=12&idtype=3');
            setProducts(response.data.data['list-data']);
            setOriginalProducts(response.data.data['list-data']); // Store original product list
        };

        fetchProducts();
    }, []);

    const handleSort = (checked) => {
        if (checked) {
            const sortedProducts = [...products].sort((a, b) => a.price - b.price);
            setProducts(sortedProducts);
        } else {
            setProducts(originalProducts); // Reset to original list
        }
    };

    return (
        <section className="my-4">
            <div className="product-list-container">
                <h2 className="text-center mb-4">KEYCAP BỘ</h2>

                {/* Checkbox component */}
                <CheckExample onChange={(checked) => handleSort(checked)} />

                <Row className="g-4">
                    {products.map((product) => (
                        <Col key={product.id} md={3} sm={4} xs={12}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={product['image-urls'][0]} alt={product['name-product']} className="card-img-top" />
                                <Card.Body>
                                    <Card.Title>{product['name-product']}</Card.Title>
                                    <Card.Text>{product.price} VND</Card.Text>
                                    <Button variant="custom" className="btn-custom">Add to cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default ProductList;

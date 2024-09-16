import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css'; // Import the CSS file

const ProductList = ({ title, products }) => {
    return (
        <section className="my-4">
            <div className="product-list-container">
                <h2 className="text-center mb-4">{title}</h2>
                <Row className="g-4">
                    {products.map((product, index) => (
                        <Col key={index} md={3} sm={4} xs={12}>  {/* Change to md={2} */}
                            <Card className="h-100">
                                <Card.Img variant="top" src={product.image} alt={product.name} className="card-img-top" />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.price}</Card.Text>
                                    <Button variant="custom" className="btn-custom">Price</Button>
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

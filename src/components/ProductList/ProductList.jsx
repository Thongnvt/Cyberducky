// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
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

const ProductList = ({ title }) => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Adjust this based on your API response

    useEffect(() => {
        const fetchProducts = async (page) => {
            try {
                const response = await axios.get(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products?page=${page}&pageSize=12`);
                setProducts(response.data.data['list-data']);
                setOriginalProducts(response.data.data['list-data']); // Store original product list
                setTotalPages(response.data.data['total-page']); // Adjust to your actual response structure
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(currentPage);
    }, [currentPage]); // Fetch products whenever currentPage changes

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
                <h2 className="text-center mb-4">SẢN PHẨM MỚI</h2>

                {/* Checkbox component */}
                <CheckExample onChange={(checked) => handleSort(checked)} />

                <Row className="g-4">
                    {products.map((product) => (
                        <Col key={product.id} md={3} sm={4} xs={12}>
                            <Link to={`/product/${slugify(product['name-product'])}`}>
                                <Card className="h-100">
                                    <Card.Img variant="top" src={product['image-urls'][0]} alt={product['name-product']} className="card-img-top" />
                                    <Card.Body>
                                        <Card.Title>{product['name-product']}</Card.Title>
                                        <Card.Text>{product.price} VND</Card.Text>
                                        <Button variant="custom" className="btn-custom">Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>

                {/* Pagination Component */}
                <PaginationComponent
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </section>
    );
};

export default ProductList;

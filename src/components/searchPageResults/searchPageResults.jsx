// src/components/SearchResultsPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom'; // To get the search term from the URL
import 'bootstrap/dist/css/bootstrap.min.css';
import './searchPageResults.css'; // Reusing the same CSS
import slugify from '../../utils/slugify';
import { Link } from 'react-router-dom';
const SearchResultsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('query'); // Get the query parameter from the URL

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset error state

            try {
                const response = await axios.get(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products?page=1&pageSize=37&search=${searchTerm}`);
                setProducts(response.data.data['list-data']);
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProducts(); // Fetch products when component mounts
    }, [searchTerm]);

    return (
        <section className="my-4">
            <div className="page-product-container">
                <h2 className="text-center mb-4">KẾT QUẢ TÌM KIẾM CHO: "{searchTerm}"</h2>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && products.length === 0 && <p>No products found.</p>}

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
            </div>
        </section>
    );
};

export default SearchResultsPage;

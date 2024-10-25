import React, { useState, useEffect, useCallback } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import './ProductManage.css';
import StaffPage from '../Dashboard/StaffPage';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeId, setTypeId] = useState(1);
    const [inputId, setInputId] = useState('');

    // Wrap fetchProductsByType in useCallback
    const fetchProductsByType = useCallback(async () => {
        try {
            const response = await fetch(``);
            if (response.ok) {
                const data = await response.json();
                console.log("Data fetched from API:", data);
                if (Array.isArray(data.data["list-data"])) {
                    setProducts(data.data["list-data"]);
                } else {
                    console.error("API response does not contain a valid 'list-data' array");
                    setProducts([]);
                }
            } else {
                console.error('Failed to fetch products, response status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [typeId]);

    // New function to fetch product by ID
    const fetchProductById = async (id) => {
        try {
            const response = await fetch(``);
            if (response.ok) {
                const data = await response.json();
                console.log("Product fetched from API by ID:", data);
                // Assuming data contains a product object
                if (data) {
                    setProducts([data]); // Set single product as array
                } else {
                    console.error("No product found with this ID");
                    setProducts([]);
                }
            } else {
                console.error('Failed to fetch product by ID, response status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching product by ID:', error);
        }
    };

    useEffect(() => {
        fetchProductsByType(); // Fetch products based on type on component mount
    }, [typeId, fetchProductsByType]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleIdInputChange = (e) => {
        setInputId(e.target.value);
    };

    const handleExecuteClick = () => {
        if (inputId) {
            fetchProductById(inputId); // Fetch product by ID on button click
        }
    };

    // Filter products based on search query
    const filteredProducts = (products || []).filter((product) =>
        product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='manage-products'>
            <StaffPage />
            <h1>QUẢN LÝ SẢN PHẨM</h1>

            {/* Input for selecting type ID */}
            <Form.Control
                type='number'
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                className='mb-3'
                placeholder='Enter product type ID...'
            />

            {/* Input for entering product ID */}
            <Form.Control
                type='text'
                value={inputId}
                onChange={handleIdInputChange}
                className='mb-3'
                placeholder='Enter product ID...'
            />

            <Button onClick={handleExecuteClick} variant="primary" className='mb-3'>
                Execute
            </Button>

            {/* Search input */}
            <Form.Control
                type='text'
                placeholder='Search by product name...'
                value={searchQuery}
                onChange={handleSearchChange}
                className='mb-3'
            />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageProducts;

import React, { useState, useEffect, useCallback } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import './ProductManage.css';
import StaffPage from '../Dashboard/StaffPage';

const ManageProducts = () => {
    const [products, setProducts] = useState([]); // Holds all products
    const [searchQuery, setSearchQuery] = useState('');
    const [typeId, setTypeId] = useState(1);
    const [inputId, setInputId] = useState('');
    const [showAddProduct, setShowAddProduct] = useState(false); // State to toggle the add product form

    // State for new product
    const [newProduct, setNewProduct] = useState({
        id: 0,
        name: '',
        description: '',
        key: '',
        price: 0,
        quantity: 0,
        colorId: 0,
        materialId: 0,
        typeProductId: 0,
    });

    const fetchProductsByType = useCallback(async () => {
        try {
            const response = await fetch(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products/type?page=1&pageSize=50&idtype=${typeId}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Data fetched from API:", data); // Log the entire response

                // Access the correct key in the response
                if (data.success && data.data && Array.isArray(data.data.listData)) {
                    setProducts(data.data.listData); // Use listData instead of list-data
                } else {
                    console.error("API response does not contain a valid 'listData' array");
                    setProducts([]); // Reset products if the array is invalid
                }
            } else {
                console.error('Failed to fetch products, response status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [typeId]);

    const fetchProductById = async (id) => {
        try {
            const response = await fetch(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Product fetched from API by ID:", data);
                if (data) {
                    setProducts([data]); // Set the fetched product as the only item in the array
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
        } else {
            // If no input ID is provided, fetch all products by type
            fetchProductsByType();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: name === 'id' || name === 'price' || name === 'quantity' || name === 'colorId' || name === 'materialId' || name === 'typeProductId' ? parseInt(value) : value
        }));
    };

    const handleAddProduct = async () => {
        try {
            const response = await fetch('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id': newProduct.id, // Include the user-provided id
                    'nameProduct': newProduct.name,
                    'descriptionProduct': newProduct.description,
                    key: newProduct.key,
                    price: newProduct.price,
                    quantity: newProduct.quantity,
                    'colorId': newProduct.colorId,
                    'materialId': newProduct.materialId,
                    'typeProductId': newProduct.typeProductId,
                }),
            });

            if (response.ok) {
                const data = await response.json(); // Get the response data
                console.log("Product added successfully:", data);
                fetchProductsByType(); // Refresh the product list after adding a new product
                // Reset newProduct state if needed
                setNewProduct({
                    id: 0,
                    name: '',
                    description: '',
                    key: '',
                    price: 0,
                    quantity: 0,
                    colorId: 0,
                    materialId: 0,
                    typeProductId: 0,
                });
                setShowAddProduct(false); // Hide the add product form after successful addition
            } else {
                console.error('Failed to add product, response status:', response.status);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const filteredProducts = products.filter((product) =>
        product['nameProduct'] && product['nameProduct'].toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleDeleteProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Product with ID ${id} deleted successfully.`);
                fetchProductsByType(); // Refresh the product list after deletion
            } else {
                console.error('Failed to delete product, response status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

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

            {/* Button to toggle Add New Product form */}
            <Button onClick={() => setShowAddProduct(!showAddProduct)} variant="info" className='mb-3'>
                {showAddProduct ? 'Hide Add Product' : 'Add Product'}
            </Button>

            {/* Conditionally render the Add New Product section */}
            {showAddProduct && (
                <>
                    <h2>Add New Product</h2>

                    {/* Product ID */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Product ID</Form.Label>
                        <Form.Control
                            type='number'
                            name='id'
                            value={newProduct.id}
                            onChange={handleInputChange}
                            placeholder='Enter product ID...'
                        />
                    </Form.Group>

                    {/* Product Name */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            value={newProduct.name}
                            onChange={handleInputChange}
                            placeholder='Enter product name...'
                        />
                    </Form.Group>

                    {/* Product Description */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            name='description'
                            value={newProduct.description}
                            onChange={handleInputChange}
                            placeholder='Enter product description...'
                        />
                    </Form.Group>

                    {/* Key */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Key (if applicable)</Form.Label>
                        <Form.Control
                            type='text'
                            name='key'
                            value={newProduct.key}
                            onChange={handleInputChange}
                            placeholder='Enter key (if applicable)...'
                        />
                    </Form.Group>

                    {/* Product Price */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            name='price'
                            value={newProduct.price}
                            onChange={handleInputChange}
                            placeholder='Enter product price...'
                        />
                    </Form.Group>

                    {/* Product Quantity */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type='number'
                            name='quantity'
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                            placeholder='Enter product quantity...'
                        />
                    </Form.Group>

                    {/* Color ID */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Color ID</Form.Label>
                        <Form.Control
                            type='number'
                            name='colorId'
                            value={newProduct.colorId}
                            onChange={handleInputChange}
                            placeholder='Enter color ID...'
                        />
                    </Form.Group>

                    {/* Material ID */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Material ID</Form.Label>
                        <Form.Control
                            type='number'
                            name='materialId'
                            value={newProduct.materialId}
                            onChange={handleInputChange}
                            placeholder='Enter material ID...'
                        />
                    </Form.Group>

                    {/* Type Product ID */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Type Product ID</Form.Label>
                        <Form.Control
                            type='number'
                            name='typeProductId'
                            value={newProduct.typeProductId}
                            onChange={handleInputChange}
                            placeholder='Enter type product ID...'
                        />
                    </Form.Group>


                    {/* Add Product Button */}
                    <Button onClick={handleAddProduct} variant="success" className='mb-3'>
                        Add Product
                    </Button>
                </>
            )}

            {/* Products Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Key</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Color ID</th>
                        <th>Material ID</th>
                        <th>Type ID</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product['nameProduct']}</td>
                                <td>{product['descriptionProduct']}</td>
                                <td>{product.key}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product['colorId']}</td>
                                <td>{product['materialId']}</td>
                                <td>{product['typeProductId']}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteProduct(product.id)}
                                        size="sm"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageProducts;

// src/components/SearchModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './SearchBar.css'; // CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon
import ResultList from './ResultList'; // Import the ResultList component
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]); // State to store API results
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // Hook to navigate

    // Fetch products based on search term for recommendations
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading state
            setError(null); // Reset error state

            if (searchTerm.trim() === '') {
                setProducts([]); // Clear products if the search term is empty
                setLoading(false); // Set loading to false
                return;
            }

            try {
                // API call with search term
                const response = await axios.get(
                    `https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/products?page=1&pageSize=12&search=${searchTerm}`
                );
                setProducts(response.data.data['list-data']); // Update state with product data
            } catch (err) {
                setError(err.message); // Handle error
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchProducts(); // Call fetchProducts whenever searchTerm changes
    }, [searchTerm]); // Dependency array includes searchTerm

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update search term state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            // Navigate to search results page and close the modal
            navigate(`/search-results?query=${searchTerm}`);
            handleClose(); // Close the modal after searching
        }
    };

    const handleClose = () => {
        // Reset all states when modal is closed
        setSearchTerm('');
        setProducts([]);
        setLoading(false);
        setError(null);
        onClose(); // Trigger the parent component's close function
    };

    if (!isOpen) return null; // Return null if modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Search</h2>
                <form onSubmit={handleSubmit} className="search-form">
                    <div className="search-bar">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Type your search..."
                        />
                        <button type="submit" className="search-icon-modal">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Render the ResultList component for recommendations */}
                <ResultList products={products} />

                <button onClick={handleClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default SearchModal;

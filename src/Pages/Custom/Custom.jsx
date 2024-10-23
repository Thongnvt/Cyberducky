// src/components/CustomForm.jsx
import React, { useState } from 'react';
import "./Custom.css";

const CustomForm = ({ onSubmit }) => {
    const [keyboardBrand, setKeyboardBrand] = useState('');
    const [keycapType, setKeycapType] = useState('');
    const [keyboardSize, setKeyboardSize] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ keyboardBrand, keycapType, keyboardSize, image });
        setKeyboardBrand('');
        setKeycapType('');
        setKeyboardSize('');
        setImage(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Hãng Bàn Phím:</label>
                <input type="text" value={keyboardBrand} onChange={(e) => setKeyboardBrand(e.target.value)} required />
            </div>
            <div>
                <label>Loại Keycap:</label>
                <input type="text" value={keycapType} onChange={(e) => setKeycapType(e.target.value)} required />
            </div>
            <div>
                <label>Size Bàn Phím:</label>
                <input type="text" value={keyboardSize} onChange={(e) => setKeyboardSize(e.target.value)} required />
            </div>
            <div>
                <label>Upload Hình Ảnh:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && <img src={image} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}
            </div>
            <button type="submit">Gửi</button>
        </form>
    );
};

export default CustomForm;

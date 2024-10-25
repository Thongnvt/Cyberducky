import React, { useState } from 'react';
import "./Custom.css"; // Dùng CSS cho hiệu ứng mượt mà
import { useNavigate } from 'react-router-dom';

const CustomForm = ({ onSubmit }) => {
    const [step, setStep] = useState(0); // Bước 0 là chọn loại bàn phím
    const [keyboardType, setKeyboardType] = useState(''); // "full-keyboard" hoặc "one-key"
    const [keyboardBrand, setKeyboardBrand] = useState('');
    const [customBrand, setCustomBrand] = useState(''); // Trạng thái cho tên hãng tùy chỉnh
    const [keycapType, setKeycapType] = useState('');
    const [keyboardSize, setKeyboardSize] = useState('');
    const [specialKey, setSpecialKey] = useState(''); // Chỉ khi chọn "phím đặc biệt"
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleKeyboardTypeChange = (type) => {
        setKeyboardType(type);
        setStep(1); // Tự động chuyển bước sau khi chọn loại bàn phím
    };

    const handleBrandChange = (event) => {
        setKeyboardBrand(event.target.value);
        if (event.target.value !== 'other') {
            setCustomBrand('');
        }
    };



    const handleNavigate = () => {
        const formData = {
            keyboardType,
            keyboardBrand: keyboardBrand === 'other' ? customBrand : keyboardBrand,
            keycapType,
            keyboardSize,
            specialKey,
            image
        };
        console.log(formData);
        // Optionally, you can do something with formData here, like saving it.

        // Navigate to the desired route
        navigate('/custom-success'); // Change '/custom-success' to your desired route
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            keyboardType,
            keyboardBrand: keyboardBrand === 'other' ? customBrand : keyboardBrand, // Sử dụng tên hãng tùy chỉnh nếu chọn "other"
            keycapType,
            keyboardSize,
            specialKey,
            image
        };
        onSubmit(formData);
        resetForm();
    };

    const resetForm = () => {
        setKeyboardBrand('');
        setCustomBrand(''); // Reset tên hãng tùy chỉnh
        setKeycapType('');
        setKeyboardSize('');
        setSpecialKey('');
        setImage(null);
        setKeyboardType('');
        setStep(0); // Quay lại bước đầu tiên sau khi submit
    };

    const handleBack = () => {
        // Khi quay lại, reset tất cả các trạng thái
        resetForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            {step === 0 && (
                <div className="fade-in">
                    <label>Chọn loại bàn phím:</label>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="full-keyboard"
                            name="keyboardType"
                            value="full-keyboard"
                            onChange={() => handleKeyboardTypeChange('full-keyboard')}
                        />
                        <label htmlFor="full-keyboard">Full Keyboard</label>
                    </div>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="one-key"
                            name="keyboardType"
                            value="one-key"
                            onChange={() => handleKeyboardTypeChange('one-key')}
                        />
                        <label htmlFor="one-key">One Key</label>
                    </div>
                </div>
            )}

            {step === 1 && keyboardType === 'full-keyboard' && (
                <div className="fade-in">
                    <div>
                        <label>Hãng Bàn Phím:</label>
                        <select
                            value={keyboardBrand}
                            onChange={handleBrandChange}
                            required
                            className="custom-dropdown"
                        >
                            <option value="">Chọn hãng</option>
                            <option value="Logitech">Logitech</option>
                            <option value="Akko">Akko</option>
                            <option value="FL-Esport">FL-Esport</option>
                            <option value="Vortex">Vortex</option>
                            <option value="Filco">Filco</option>
                            <option value="Razer">Razer</option>
                            <option value="Corsair">Corsair</option>
                            <option value="Leopold">Leopold</option>
                            <option value="E-dra">E-dra</option>
                            <option value="SteelSeries">SteelSeries</option>
                            <option value="other">Các hãng khác...</option>
                        </select>
                    </div>
                    {keyboardBrand === 'other' && (
                        <div>
                            <label>Nhập tên hãng bạn muốn:</label>
                            <input
                                type="text"
                                value={customBrand}
                                onChange={(e) => setCustomBrand(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label>Loại Keycap:</label>
                        <select
                            value={keycapType}
                            onChange={(e) => setKeycapType(e.target.value)}
                            required
                            className="custom-dropdown"
                        >
                            <option value="">Chọn loại keycap</option>
                            <option value="ABS">ABS</option>
                            <option value="PBT">PBT</option>
                            <option value="POM">POM</option>
                        </select>
                    </div>
                    <div>
                        <label>Size Bàn Phím:</label>
                        <select
                            value={keyboardSize}
                            onChange={(e) => setKeyboardSize(e.target.value)}
                            required
                            className="custom-dropdown"
                        >
                            <option value="">Chọn kích thước</option>
                            <option value="Full Size">Full Size</option>
                            <option value="Tenkeyless">Tenkeyless</option>
                            <option value="seventy-five">75%</option>
                            <option value="sixty">60%</option>
                        </select>
                    </div>
                    <div>
                        <label>Upload Hình Ảnh:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {image && <img src={image} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={handleBack}>Back</button>
                        <button type="button" onClick={handleNavigate}>Gửi</button>
                    </div>
                </div>
            )}

            {step === 1 && keyboardType === 'one-key' && (
                <div className="fade-in">
                    <label>Chọn loại phím:</label>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="normal-key"
                            name="keyType"
                            value="normal"
                            onChange={() => setSpecialKey('')}
                        />
                        <label htmlFor="normal-key">Phím thường</label>
                    </div>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="special-key"
                            name="keyType"
                            value="special"
                            onChange={() => setSpecialKey('special')}
                        />
                        <label htmlFor="special-key">Phím đặc biệt</label>
                    </div>

                    {specialKey === 'special' && (
                        <div>
                            <label>Ghi rõ loại phím đặc biệt:</label>
                            <input
                                type="text"
                                value={specialKey}
                                onChange={(e) => setSpecialKey(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label>Upload Hình Ảnh:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {image && <img src={image} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={handleBack}>Back</button>
                        <button type="button" onClick={handleNavigate}>Gửi</button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default CustomForm;

// src/components/CustomHistory.jsx
import React from 'react';

const CustomHistory = ({ history }) => {
    if (history.length === 0) {
        return <p>Không có lịch sử tùy chỉnh.</p>;
    }

    return (
        <ul>
            {history.map((item, index) => (
                <li key={index}>
                    <p>Hãng Bàn Phím: {item.keyboardBrand}</p>
                    <p>Loại Keycap: {item.keycapType}</p>
                    <p>Size Bàn Phím: {item.keyboardSize}</p>
                    {item.image && <img src={item.image} alt="Custom" style={{ width: '100px', height: '100px' }} />}
                </li>
            ))}
        </ul>
    );
};

export default CustomHistory;

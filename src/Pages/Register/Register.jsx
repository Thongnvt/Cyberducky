import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.css'; // Optional, if you want to style it differently from login

function TextControlsExample() {
    const [formData, setFormData] = useState({
        name: '',
        accountName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '' // Added phone number field
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission

        // Validation: Check if any fields are empty
        if (!formData.name || !formData.accountName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber) {
            window.alert('Vui lòng điền vào tất cả các trường bắt buộc.');
            return;
        }

        // Additional validation for matching passwords
        if (formData.password !== formData.confirmPassword) {
            window.alert('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            window.alert('Email không hợp lệ.');
            return;
        }

        // Form is valid, proceed with submission (e.g., API call)
        console.log('Form submitted successfully', formData);
        // You can redirect or handle successful registration here
    };

    return (
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Tên <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên.."
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="accountName">
                    <Form.Label>Tên tài khoản <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên tài khoản.."
                        value={formData.accountName}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Nhập email.."
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập số điện thoại.."
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mật khẩu <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu.."
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Xác nhận mật khẩu <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập lại mật khẩu.."
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Đăng ký</Button>
            </Form>
        </div>
    );
}

export default TextControlsExample;

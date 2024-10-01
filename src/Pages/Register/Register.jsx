import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // Import Axios
import './Register.css'; // Optional, if you want to style it differently from login

function TextControlsExample() {
    // Updated formData to include full-name
    const [formData, setFormData] = useState({
        fullName: '', // Changed to fullName to match the input field
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission

        // Validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber) {
            window.alert('Vui lòng điền vào tất cả các trường bắt buộc.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            window.alert('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(formData.phoneNumber)) {
            window.alert('Số điện thoại phải là 10 chữ số.');
            return;
        }

        // Proceed with API call
        try {
            // Create the payload to match API expectations
            const payload = {
                email: formData.email,
                password: formData.password,
                "full-name": formData.fullName, // Map fullName to full-name
                "telephone-number": formData.phoneNumber // Map phoneNumber to telephone-number
            };

            const response = await axios.post('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/authentication/register', payload);
            console.log('Registration successful:', response.data);
            // Handle success (e.g., redirect or show a success message)
            window.alert('Đăng ký thành công!');
        } catch (error) {
            console.error('There was an error registering:', error);
            window.alert('Đăng ký không thành công. Vui lòng thử lại.');
        }
    };

    return (
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            <Form onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Tên đầy đủ <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên đầy đủ.."
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Nhập email.."
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Phone Number Field */}
                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Số điện thoại <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập số điện thoại.."
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mật khẩu <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu.."
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Confirm Password Field */}
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

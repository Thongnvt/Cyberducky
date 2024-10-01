import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
<<<<<<< HEAD
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

=======
import './Register.css'; // Optional, if you want to style it differently from login

function TextControlsExample() {
    // State to store form input values
    const [formData, setFormData] = useState({
        name: '',
        accountName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Function to handle input changes and update state
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

<<<<<<< HEAD
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission

        // Validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber) {
=======
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission

        // Validation: Check if any fields are empty
        if (!formData.name || !formData.accountName || !formData.email || !formData.password || !formData.confirmPassword) {
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
            window.alert('Vui lòng điền vào tất cả các trường bắt buộc.');
            return;
        }

<<<<<<< HEAD
=======
        // Additional validation for matching passwords
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
        if (formData.password !== formData.confirmPassword) {
            window.alert('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

<<<<<<< HEAD
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
=======
        // Form is valid, proceed with submission (e.g., API call)
        console.log('Form submitted successfully', formData);
        // You can redirect or handle successful registration here
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
    };

    return (
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            <Form onSubmit={handleSubmit}>
<<<<<<< HEAD
                {/* Full Name Field */}
                <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Tên <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập họ tên.."
                        value={formData.fullName}
=======
                {/* Name field */}
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Tên <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên.."
                        value={formData.name}
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
                        onChange={handleInputChange}
                    />
                </Form.Group>

<<<<<<< HEAD
                {/* Email Field */}
=======
                {/* Account name field */}
                <Form.Group className="mb-3" controlId="accountName">
                    <Form.Label>Tên tài khoản <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên tài khoản.."
                        value={formData.accountName}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Email field */}
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Nhập email.."
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

<<<<<<< HEAD
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
=======
                {/* Password field */}
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mật khẩu <span className="required">*</span>:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu.."
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </Form.Group>

<<<<<<< HEAD
                {/* Confirm Password Field */}
=======
                {/* Confirm password field */}
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
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

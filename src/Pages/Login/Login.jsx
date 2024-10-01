import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Login.css';

function TextControlsExample() {
    // State for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Hardcoded user data for validation
    const hardcodedUser = {
        email: 'thongnvtse171008@fpt.edu.vn', // Change this to your test email
        password: 'password123' // Change this to your test password
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if email or password is empty
        if (!email || !password) {
            window.alert('Vui lòng điền vào tất cả các trường.');
            return;
        }

        // Validate the email and password against the hardcoded values
        if (email !== hardcodedUser.email) {
            window.alert('Tài khoản không tồn tại.');
        } else if (password !== hardcodedUser.password) {
            window.alert('Mật khẩu không chính xác.');
        } else {
            // Successful login (you can redirect to another page here)
            window.alert('Đăng nhập thành công!');
            // Reset form or redirect to another page
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Đăng nhập tài khoản</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="emailControl">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Nhập Email.."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordControl">
                    <Form.Label>Mật khẩu:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu.."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Đăng nhập</Button>
            </Form>
            <div className="register-link">
                <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!!</Link></p>
            </div>
        </div>
    );
}

export default TextControlsExample;

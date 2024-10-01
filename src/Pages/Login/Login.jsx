import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import './Login.css';

function TextControlsExample() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext); // Get setUser from UserContext
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            window.alert('Vui lòng điền vào tất cả các trường.');
            return;
        }

        try {
            const response = await axios.post('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/authentication/login', {
                email,
                password
            });

            if (response.status === 200 && response.data.success) {
                window.alert('Đăng nhập thành công!');
                setUser({ email }); // Set the global user state
                navigate('/'); // Redirect to homepage
            } else {
                window.alert('Đăng nhập thất bại, vui lòng kiểm tra lại.');
            }
        } catch (error) {
            window.alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
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

import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import './Login.css';
import Modal from 'react-bootstrap/Modal';

function TextControlsExample() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [loading, setLoading] = useState(false); // State to handle loading

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setModalMessage('Vui lòng điền vào tất cả các trường.');
            setShowModal(true);
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await axios.post('https://cyberducky-gtbsaceffbhthhc5.eastus-01.azurewebsites.net/api/authentication/login', {
                email,
                password
            });

            if (response.status === 200 && response.data.success) {
                const userData = { email, id: response.data.id, token: response.data.token };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                setModalMessage('Đăng nhập thành công! Bạn sẽ được chuyển đến trang chủ trong giây lát.');
                setShowModal(true);

                // Automatically redirect after 2 seconds
                setTimeout(() => {
                    navigate('/'); // Redirect to homepage
                }, 2000);
            } else {
                setModalMessage('Đăng nhập thất bại, vui lòng kiểm tra lại.');
                setShowModal(true);
            }
        } catch (error) {
            setModalMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
            setShowModal(true);
        } finally {
            setLoading(false); // Stop loading
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
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
            </Form>
            <div className="register-link">
                <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!!</Link></p>
            </div>
            <div className="staff-link">
                <p><Link to="/login/staff">Staff</Link></p>
            </div>

            {/* Modal for successful login or errors */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMessage.includes('thành công') ? 'Thông báo' : 'Lỗi'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TextControlsExample;

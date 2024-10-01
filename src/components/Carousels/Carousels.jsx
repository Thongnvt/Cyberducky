import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import keyboard2 from '../../assets/keyboard2.jpg';
import OIP from '../../assets/OIP.jpg';
import banphim from '../../assets/banphim.jpg';
import './Carousels.css'; // Import file CSS của bạn

function DarkVariantExample() {
    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <div className="image-carousels"> {/* Thêm container */}
                    <img
                        className="custom-image"
                        src={keyboard2}
                        alt="keyboard2"
                    />
                </div>
               
            </Carousel.Item>
            <Carousel.Item>
                <div className="image-carousels"> {/* Thêm container */}
                    <img
                        className="custom-image"
                        src={OIP}
                        alt="OIP"
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="image-carousels"> {/* Thêm container */}
                    <img
                        className="custom-image"
                        src={banphim}
                        alt="banphim"
                    />
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default DarkVariantExample;

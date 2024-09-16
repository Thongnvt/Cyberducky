import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import keyboard2 from '../../assets/keyboard2.jpg';
import OIP from '../../assets/OIP.jpg'
import banphim from '../../assets/banphim.jpg'
function DarkVariantExample() {
    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={keyboard2}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h4>Sản phẩm mới</h4>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={OIP}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h4>Sản phẩm mới</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={banphim}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5>Third slide label</h5>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default DarkVariantExample;

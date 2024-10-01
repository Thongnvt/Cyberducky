import React from "react";
import Image from 'react-bootstrap/Image';
import aboutus from '../../assets/aboutus.png';
import './AboutUs.css'

function AboutUsImage() {
  return (
    <div className="image-aboutus">
     
      <Image src={aboutus}  />
      <p className="text-aboutus">CYBERDUCKY - Phụ kiện công nghệ mang đậm dấu ấn cá nhân dành riêng cho bạn</p>


      
    </div>
  );
}

export default AboutUsImage;




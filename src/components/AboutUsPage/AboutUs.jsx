import React from "react";
import Image from 'react-bootstrap/Image';
import aboutus from '../../assets/aboutus.png';
import './AboutUs.css'

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="image-aboutus">
        <Image src={aboutus} />
        <p className="text-aboutus1">CYBERDUCKY - PHỤ KIỆN CÔNG NGHỆ ĐẬM CHẤT “RIÊNG”</p>
        <p className="text-aboutus2">CyberDucky là thương hiệu startup chuyên cung cấp các sản phẩm công nghệ tiện ích, bao gồm keycap, decal laptop và các sản phẩm độc đáo khác. Chúng tôi hoạt động với tiêu chí mang đến cho khách hàng những giải pháp tiện lợi, sáng tạo và cá nhân hóa trong thế giới công nghệ hiện đại.</p>
        <p className="text-aboutus2">Với tất cả các sản phẩm được thiết kế và sản xuất trực tiếp, CyberDucky cam kết chất lượng và tính sáng tạo, giúp khách hàng thể hiện phong cách cá nhân qua từng món đồ công nghệ. Chúng tôi chỉ bán các sản phẩm trực tuyến qua website chính thức và các nền tảng mạng xã hội như Facebook và Instagram, tạo sự thuận tiện cho khách hàng trong quá trình mua sắm.</p>
        <p className="text-aboutus2">CyberDucky không ngừng cập nhật các sản phẩm và thiết kế mới, bắt kịp xu hướng, cùng mức giá hợp lý để khách hàng có nhiều sự lựa chọn phù hợp với phong cách riêng. Đồng thời, chúng tôi thường xuyên triển khai các chương trình ưu đãi và chăm sóc khách hàng nhằm tri ân sự đồng hành của khách hàng với CyberDucky.</p>
        <p className="text-aboutus2">Đội ngũ CyberDucky luôn sẵn sàng hỗ trợ khách hàng với sự nhiệt tình và chuyên nghiệp, cam kết mang đến trải nghiệm mua sắm thuận tiện và hài lòng nhất. Chúng tôi mong muốn đồng hành cùng bạn trong việc khám phá những sản phẩm công nghệ tiện ích và sáng tạo, giúp cuộc sống của bạn trở nên dễ dàng và thú vị hơn mỗi ngày.</p>
        <p className="text-aboutus2">CyberDucky xin cảm ơn quý khách đã tin tưởng và ủng hộ. Sự hài lòng của bạn là niềm tự hào của chúng tôi!</p>
      </div>
      
      <div className="contact-info">
        <p>Hotline: <a href="tel:+842812345678">+84 28 1234 5678</a></p>
        <p>Email: <a href="mailto:support@cyberducky.vn">support@cyberducky.vn</a></p>
        <p>Website: <a href="https://cyberducky.vercel.app" target="_blank" rel="noopener noreferrer">cyberducky.vercel.app</a></p>
        <p>Facebook: <a href="https://www.facebook.com/cyberducky" target="_blank" rel="noopener noreferrer">facebook.com/cyberducky</a></p>
        <p>Instagram: <a href="https://www.instagram.com/cyberducky_/" target="_blank" rel="noopener noreferrer">instagram.com/cyberducky_</a></p>
        <p>Thời gian làm việc: từ 9:00 đến 20:30 từ Thứ 2 đến Thứ 7</p>
      </div>
    </div>
  );
}

export default AboutUs;




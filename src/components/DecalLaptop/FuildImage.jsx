import Image from 'react-bootstrap/Image';
import mainDecalLaptop from '../../assets/Decallaptopimage.png'; 
import './FuildImage.css'

function DecalLaptopImage() {
  return (
    <div className="image-decallaptop">
      <Image src={mainDecalLaptop} fluid className="custom-image" />
    </div>
  );
}

export default DecalLaptopImage;

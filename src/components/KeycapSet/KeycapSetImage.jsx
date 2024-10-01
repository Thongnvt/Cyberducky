import Image from 'react-bootstrap/Image';
import Setkeycapimage from '../../assets/Setkeycapimage.png'; 
import './KeycapSetImage.css';

function SetKeycapImage() {
  return (
    <div className="image-setkeycap">
      <Image src={Setkeycapimage} fluid className="custom-image" />
    </div>
  );
}

export default SetKeycapImage;

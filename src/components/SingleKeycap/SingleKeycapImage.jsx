import Image from 'react-bootstrap/Image';
import Singlekeycapimage from '../../assets/Singlekeycapimage.png'; 
import './SingleKeycapImage.css';

function SingleKeycapExample() {
  return (
    <div className="image-singlekeycap">
      <Image src={Singlekeycapimage} fluid className="custom-image" />
    </div>
  );
}

export default SingleKeycapExample;

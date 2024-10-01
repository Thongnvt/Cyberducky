import Image from 'react-bootstrap/Image';
import Articles from '../../assets/Articles.png'; 
import './ArticlesImage.css';

function ArticlesImage() {
  return (
    <div className="image-articles">
      <Image src={Articles} />
    </div>
  );
}

export default ArticlesImage;

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Articles.css'; // Đảm bảo bạn đã import file CSS

function BasicExample() {
  const cards = Array(8).fill(0); // Mảng có 8 thẻ

  return (
    <div className="cards-container">
      {cards.map((_, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body className="card-body">
            <Card.Title>Text {index + 1}</Card.Title>
            <Card.Text>
              Xem những tin tức mới nhất của chúng tôi
            </Card.Text>
            <Button variant="primary">Nhấn để xem</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default BasicExample;

import Pagination from 'react-bootstrap/Pagination';
import './Pagination.css';
function AdvancedExample() {
  return (
    <Pagination className="custom-pagination">
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
    </Pagination>
  );
}

export default AdvancedExample;

import Form from 'react-bootstrap/Form';
import './CheckBox.css'; // Ensure your custom CSS file is being imported

function CheckExample({ onChange }) {
    return (
        <Form>
            <div key="default-checkbox" className="mb-3 d-flex align-items-center"> {/* Add flex to align items */}
                <span className="me-2">Xếp theo:</span> {/* Add label here */}
                <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    label="Sort by ascending price"
                    className="custom-checkbox" // Custom class for styling
                    onChange={(e) => onChange(e.target.checked)}
                />
            </div>
        </Form>
    );
}

export default CheckExample;

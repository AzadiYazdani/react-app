import './LocationModal.css';
import Form from 'react-bootstrap/Form';

export default function CityButton({city}) {

    return (
        <div className="container">
            <a className="nav-link" href="#">
                <div className="row justify-content-center">
                    <div className="col-10 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
                        <Form.Check
                            id={city.id}
                            label={city.title}
                        />
                    </div>
                </div>
                <hr className="hr-divider"/>
            </a>
        </div>
    );
}

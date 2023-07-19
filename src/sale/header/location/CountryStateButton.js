import './LocationModal.css';
import arrow from '../../../resource/baseline-keyboard-arrow-left.svg'

export default function CountryStateButton(props) {

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
                    <a className="nav-link" href="#!">{props.text}</a>
                </div>
                <div className="col-2 state-height">
                    <a href="#" rel="noreferrer">
                        <img src={arrow} alt="Coding Beauty logo"></img>
                    </a>
                </div>
            </div>
        </div>
    );
}

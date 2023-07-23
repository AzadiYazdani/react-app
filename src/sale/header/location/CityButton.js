import './LocationModal.css';

export default function CityButton({city, onChanged}) {

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id={city.id} onChange={onChanged}/>
                        <label className="form-check-label" htmlFor={city.id} onChange={onChanged}>{city.title} </label>
                        <hr className="hr-divider"/>
                    </div>
                </div>
            </div>
        </div>


        // <div className="container">
        // <a className="nav-link" href="#">
        // <div className="row justify-content-center">
        // <div className="col-10 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
        // <Form.Check
        //                     value={city.id}
        //                     id={city.id}
        //                     label={city.title}
        //                 />
        //             </div>
        //         </div>
        //         <hr className="hr-divider"/>
        //     </a>
        // </div>
    );
}

import './LocationModal.css';
import React from "react";
import { ChangeEvent } from 'react';
import * as events from "events";

export default function CityButton(props)  {

    const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            props.onCityAdded(event.target.value);
        } else {
            props.onCityRemoved(event.target.value);
        }
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
                    <div className="form-check">
                        {/*onChange={()=>onChanged(city.id)}*/}
                        <input className="form-check-input" type="checkbox" id={props.city.id} value={props.city.id} onChange={onChanged}/>
                        <label className="form-check-label" htmlFor={props.city.id} onChange={onChanged}>{props.city.title} </label>
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

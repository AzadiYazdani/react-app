import './Location.css';
import React, {ChangeEvent} from "react";
import {Form} from "react-bootstrap";

export default function CityButton(props)  {

    const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            props.onCityAdded(event.target.value, event.target.name);
        } else {
            props.onCityRemoved(event.target.value, event.target.name);
        }
    }

    return (
        <Form>
            {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                    />
                    <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                    />
                    <Form.Check
                        inline
                        disabled
                        label="3 (disabled)"
                        type={type}
                        id={`inline-${type}-3`}
                    />
                </div>
            ))}
        </Form>
        // <div className="container">
        //     <div className="row justify-content-center">
        //         <div className="col-10 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
        //             <div className="form-check">
        //                 <input className="form-check-input" type="checkbox"
        //                        id={props.city.id}
        //                        name={props.city.title}
        //                        defaultChecked={props.value}
        //                        value={props.city.id}
        //                        onChange={onChanged}
        //                 />
        //                 <label className="form-check-label"
        //                        htmlFor={props.city.id}
        //                        onChange={onChanged}>{props.city.title}</label>
        //                 <hr className="hr-divider"/>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );

}

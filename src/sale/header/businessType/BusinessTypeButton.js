import '../location/Location.css';
import React, {ChangeEvent} from "react";

export default function BusinessTypeButton(props)  {


    const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('AZADI Am');
        if (event.target.checked) {
            props.onBusinessTypeAdded(event.target.value, event.target.name);
        } else {
            props.onBusinessTypeRemoved(event.target.value, event.target.name);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                               id={props.businessType.id}
                               name={props.businessType.title}
                               defaultChecked={props.value}
                               value={props.businessType.id}
                               onChange={onChanged}
                        />
                        <label className="form-check-label"
                               htmlFor={props.businessType.id}
                               onChange={onChanged}>{props.businessType.title}</label>
                        <hr className="hr-divider"/>
                    </div>
                </div>
            </div>
        </div>
    );

}

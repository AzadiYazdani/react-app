import './Location.css';
import React, {ChangeEvent, useState} from "react";

export default function CityButton(props)  {

    const [checked, setChecked] = useState(false);

    const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(!checked);
        if (event.target.checked) {
            props.onCityAdded(event.target.value, event.target.name);
        } else {
            props.onCityRemoved(event.target.value, event.target.name);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                               id={props.city.id}
                               name={props.city.title}
                               // checked={props.value}
                               value={props.city.id}
                               onChange={onChanged}
                        />
                        <label className="form-check-label"
                               htmlFor={props.city.id}
                               onChange={onChanged}>{props.city.title}</label>
                        <hr className="hr-divider"/>
                    </div>
                </div>
            </div>
        </div>
    );

}

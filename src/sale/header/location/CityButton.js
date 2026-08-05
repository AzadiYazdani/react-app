import "./Location.css";
import React from "react";

export default function CityButton({
    city,
    value,
    onCityAdded,
    onCityRemoved
}) {

    const onChanged = (event) => {
        if (event.target.checked) {
            onCityAdded(city);
        } else {
            onCityRemoved(city);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 state-height me-auto mb-2 mb-lg-0 ms-lg-4">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`city-${city.id}`}
                            checked={value}
                            onChange={onChanged}
                        />

                        <label className="form-check-label" htmlFor={`city-${city.id}`} >
                            {city.name}
                        </label>
                    </div>
                    <hr className="hr-divider"/>
                </div>
            </div>
        </div>
    );
}

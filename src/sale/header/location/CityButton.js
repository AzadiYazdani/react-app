import React from "react";
import "./LocationModal.css";

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
        <label className="city-item">

            <input
                className="city-checkbox"
                type="checkbox"
                checked={value}
                onChange={onChanged}
            />

            <span className="city-name">
                {city.name}
            </span>

        </label>
    );
}

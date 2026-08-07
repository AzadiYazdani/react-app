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

            if (onCityAdded) {
                onCityAdded(city);
            }

        }
        else {

            if (onCityRemoved) {
                onCityRemoved(city);
            }

        }

    };



    return (

        <label className="city-item">


            <input

                className="city-checkbox"

                type="checkbox"

                checked={Boolean(value)}

                onChange={onChanged}

            />



            <span className="city-name">

                {city.name}

            </span>


        </label>

    );

}

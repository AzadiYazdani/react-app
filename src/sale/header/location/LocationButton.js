import React from "react";


export default function LocationButton({onClick, numberOfCities}) {

    return (
        <li>
            <div className="d-flex">
                <button className="btn btn-light" onClick={onClick}>
                    <i className='bi bi-geo-alt'></i>
                    {numberOfCities}شهر
                </button>
            </div>
        </li>
    )
};
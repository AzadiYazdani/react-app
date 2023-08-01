import React from "react";


export default function LocationSelectButton({onClick, numberOfCities}) {

    return (
        <li className="nav-item">
            <a className="nav-link btn-light" href="#" onClick={onClick}>
                <i className='bi bi-geo-alt'></i>
                {numberOfCities}
            </a>
        </li>
    )
};
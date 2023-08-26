import React from "react";


export default function LocationSelectButton({onClick, numberOfCities}) {

    return (
        <div>
            <button type="button" className="btn btn-light btn-rounded text-nowrap" onClick={onClick}>
                <div className="font-vazir-13">
                    <i className='bi bi-geo-alt'/>
                    {numberOfCities}
                </div>
            </button>
        </div>
    )
};
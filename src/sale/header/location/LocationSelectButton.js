import React from "react";


export default function LocationSelectButton({onClick, numberOfCities}) {

    return (
        <div className="m-0 p-0">
            <button type="button" className=" m-0 btn btn-light btn-rounded text-nowrap" onClick={onClick}>
                <div className="font-vazir-13">
                    <i className='bi bi-geo-alt'/>
                    {numberOfCities}
                </div>
            </button>
        </div>
    )
};
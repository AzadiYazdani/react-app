import React from "react";


export default function LocationSelectButton(props) {

    return (
        <div className="m-0 p-0">
            <button type="button" className=" m-0 btn btn-light btn-rounded text-nowrap" onClick={props.onClick}>
                <div className="font-vazir-13">
                    <i className='bi bi-geo-alt'/>
                    {props.numberOfCities}
                </div>
            </button>
        </div>
    )
};
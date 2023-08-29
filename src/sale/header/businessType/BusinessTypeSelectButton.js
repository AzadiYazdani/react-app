import React from "react";
import store from './seller.png'


export default function BusinessTypeSelectButton({onClick, numberOfBusinessTypes}) {

    return (
        <div className="container m-0 p-0">
            <button type="button" className="btn btn-light btn-rounded text-nowrap" onClick={onClick}>
                <div className="font-vazir-13">
                    <i resource={store}>
                        <img src={store} alt="انتخاب نوع کسب و کار" width="25" height="25"/>
                    </i>
                    {numberOfBusinessTypes}
                </div>
            </button>
        </div>
    )
};
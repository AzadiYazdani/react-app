import React from "react";
import store from './seller.png'


export default function BusinessTypeSelectButton({onClick, numberOfBusinessTypes}) {

    return (
        <li className="nav-item">
            <a className="nav-link btn-light" href="#"  onClick={onClick}>
                <i resource={store}><img src={store} alt="انتخاب نوع کسب و کار" width="25" height="25"></img></i>
                {numberOfBusinessTypes}</a>
        </li>


    // <li>
    //     <button className="btn btn-light" onClick={onClick}>
    //         <i resource={store}><img src={store} alt="انتخاب نوع کسب و کار" width="25" height="25"></img></i>
    //         {numberOfBusinessTypes}
    //     </button>
    // </li>
)
};
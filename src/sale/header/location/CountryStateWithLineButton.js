import './LocationModal.css';
import arrow from '../../../resource/baseline-keyboard-arrow-left.svg';
import {useEffect, useState} from "react";

export default function CountryStateWithLineButton({state, show_cities}) {

    return (
        <div className="container">
            <a className="nav-link" onClick = {() => show_cities(state.id)} href="#!">
                <div className="row justify-content-center">
                    <div className="col-8 state-height  me-auto mb-2 mb-lg-0 ms-lg-4">
                        <p>{state.title}</p>
                    </div>
                    <div className="col-2 state-height">
                        <img src={arrow} alt="Coding Beauty logo"></img>
                    </div>
                </div>
                <hr className="hr-divider"/>
            </a>
        </div>
    );
}

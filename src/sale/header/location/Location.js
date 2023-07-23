import React from "react";
import Button from "react-bootstrap/Button";

export default function Location({onClick, numberOfCities}) {

    return (
        <li className="nav-item">
            <Button type="button" className="btn btn-light" onClick={onClick} >
               <p>{numberOfCities}شهر </p>
            </Button>
        </li>
    )};
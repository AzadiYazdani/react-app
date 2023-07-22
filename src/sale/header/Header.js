import './Header.css'

import Cart from "./cart/Cart";
import logo from '../../resource/1.jpg';
import StateModal from "./location/StateModal";
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import CityModal from "./location/CityModal";


export default function Header() {

    const [statesModalShow, setStatesModalShow] = useState(false);

    const handleStatesClose = () => {
        setStatesModalShow(false);
        setCitiesModalShow(false);
    }
    const handleStatesShow = () => {
        setStatesModalShow(true);
    }

    const [citiesModalShow, setCitiesModalShow] = useState(false);
    const [cities, setCities] = useState([]);

    const handleCitiesClose = () => {
        setStatesModalShow(true);
        setCitiesModalShow(false);
    }
    const handleCitiesShow = async  (id) => {
        try {
            const data = await (await fetch(`http://localhost:8081/location/states/${id}/cities`)).json()
            setCities(data)
        } catch (err) {
            console.log(err.message)
        }

        setStatesModalShow(false);
        setCitiesModalShow(true);
    }

    return (
        <div className="Header-style app-right-to-left">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#"><img className="Header-logo" src={logo}
                                                               alt="Coding Beauty logo"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item">
                                <Button variant="primary" onClick={handleStatesShow}>
                                    انتخاب شهر
                                </Button>

                                <StateModal
                                    show={statesModalShow}
                                    onHide={handleStatesClose}
                                    onStateClick={handleCitiesShow}
                                />
                                <CityModal
                                    show={citiesModalShow}
                                    onHide={handleCitiesClose}
                                    arr={cities}
                                />
                            </li>
                            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">All Products</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Popular Items</a></li>
                                    <li><a className="dropdown-item" href="#">New Arrivals</a></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                    <Cart/>
                </div>
            </nav>

        </div>);
}

import './Header.css'

import Cart from "./cart/Cart";
import logo from '../../resource/1.jpg';
import StateModal from "./location/StateModal";
import React, {useState} from "react";
import CityModal from "./location/CityModal";
import Location from "./location/Location";


export default function Header() {



    // Show State modal

    const [statesModalShow, setStatesModalShow] = useState(false);

    const handleStatesClose = () => {
        setStatesModalShow(false);
        setCitiesModalShow(false);
    }
    const handleStatesShow = () => {
        setStatesModalShow(true);
    }


    // Show Location modal

    const [citiesModalShow, setCitiesModalShow] = useState(false);
    const [cities, setCities] = useState([]);

    const handleCitiesClose = () => {
        setStatesModalShow(true);
        setCitiesModalShow(false);
    }

    const handleCitiesShow = async (id) => {
        try {
            const data = await (await fetch(`http://localhost:8081/location/states/${id}/cities`)).json()
            setCities(data)
        } catch (err) {
            console.log(err.message)
        }

        setStatesModalShow(false);
        setCitiesModalShow(true);
    }


    // Select Cities

    const [selectedCities, setSelectedCities] = useState([]);
    const [numberOfCities, setNumberOfCities] = useState("انتخاب ");


    const onCityAdded = (id) => {
        setSelectedCities([...selectedCities, id])
    }

    const onCityRemoved = (id) => {
        setSelectedCities(selectedCities.filter((item) =>item !== id))
    }

    const submitCities = () => {
        if (selectedCities.length > 0)
            setNumberOfCities(selectedCities.length.toString());
        else
            setNumberOfCities("انتخاب ");
        handleCitiesClose();
    }


    return (
        <div className="Header-style app-right-to-left">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#">
                        <img className="Header-logo" src={logo} alt="Coding Beauty logo"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item">
                               <Location onClick={handleStatesShow} numberOfCities={numberOfCities}/>
                                <StateModal
                                    show={statesModalShow}
                                    onHide={handleStatesClose}
                                    onStateClick={handleCitiesShow}
                                />
                                <CityModal
                                    show={citiesModalShow}
                                    onHide={handleCitiesClose}
                                    onSubmit={submitCities}
                                    onCityAdded={onCityAdded}
                                    onCityRemoved={onCityRemoved}
                                    arr={cities}
                                />
                            </li>
                            <li className="nav-item"><a className="nav-link" href="#">درباره ما</a></li>
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
                        <Cart/>
                    </div>
                </div>
            </nav>
        </div>);
}

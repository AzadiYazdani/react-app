import './Header.css'

import Cart from "./cart/Cart";
import logo from '../../resource/1.jpg';
import StateModal from "./location/StateModal";
import React, {useState} from "react";
import CityModal from "./location/CityModal";
import LocationButton from "./location/LocationButton";
import BusinessTypeButton from "./businessType/BusinessTypeButton";
import BusinessTypeModal from "./businessType/BusinessTypeModal";


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


    // Show LocationButton modal

    const [citiesModalShow, setCitiesModalShow] = useState(false);
    const [cities, setCities] = useState([]);

    const handleCitiesClose = () => {
        setStatesModalShow(true);
        setCitiesModalShow(false);
    }

    const handleCitiesShow = async (id) => {
        try {
            const data = await (await fetch(`http://localhost:8081/location/states/${id}/cities`)).json();
            setCities(data);
        } catch (err) {
            console.log(err.message);
        }
        setStatesModalShow(false);
        setCitiesModalShow(true);
    }


    // Select Cities

    const [selectedCities, setSelectedCities] = useState([]);
    const [numberOfCities, setNumberOfCities] = useState("انتخاب شهر");


    const onCityAdded = (id, title) => {
        let city = {"id": id, "title": title};

        const found = selectedCities.find(obj => {
            return obj.id === id;
        });
        if (!found) {
            setSelectedCities([...selectedCities, city]);
        }
        updateNumberOfCities();
    }

    const onCityRemoved = (checkedId, title) => {
        let city = {"id": checkedId, "title": title};

        let index = selectedCities.indexOf(city);
        if (index >= -1) {
            //Removing values from array
            selectedCities.splice(index, 1);
        }
        setSelectedCities([...selectedCities]);
        updateNumberOfCities();
    }

    const updateNumberOfCities = () => {
        if (selectedCities.length === 1) {
            let city = selectedCities[0];
            setNumberOfCities(city.title);
        }
        else if (selectedCities.length === 2) {
            let city1 = selectedCities[0];
            let city2 = selectedCities[1];
            setNumberOfCities(city1.title +', ' + city2.title);
        }
        else if (selectedCities.length > 2) {
            let city1 = selectedCities[0];
            let city2 = selectedCities[1];
            setNumberOfCities(city1.title +', ' + city2.title + '...');
        }
        else
            setNumberOfCities("انتخاب شهر");
    }


    const submitCities = () => {
        updateNumberOfCities();
        handleCitiesClose();
    }


    // Show BusinessTypeModal

    const [businessTypeModalShow, setBusinessTypeModalShow] = useState(false);

    const handleBusinessTypeModalClose = () => {
        setBusinessTypeModalShow(false);
    }

    const handleBusinessTypeModalShow = () => {
        setBusinessTypeModalShow(true);
    }

    const [selectedBusinessTypes, setSelectedBusinessTypes] = useState([]);
    const [numberOfBusinessTypes, setNumberOfBusinessTypes] = useState("انتخاب نوع کسب و کار");


    const onBusinessTypeAdded = (id, title) => {
        let businessType = {"id": id, "title": title};

        const found = selectedBusinessTypes.find(obj => {
            return obj.id === id;
        });
        if (!found) {
            setSelectedBusinessTypes([...selectedBusinessTypes, businessType]);
        }
        updateNumberOfBusinessTypes();
    }

    const onBusinessTypeRemoved = (checkedId, title) => {
        let businessType = {"id": checkedId, "title": title};

        let index = selectedCities.indexOf(businessType);
        if (index >= -1) {
            //Removing values from array
            selectedBusinessTypes.splice(index, 1);
        }
        setSelectedBusinessTypes([...selectedBusinessTypes]);
        updateNumberOfBusinessTypes();
    }

    const updateNumberOfBusinessTypes = () => {
        if (selectedBusinessTypes.length === 1) {
            let city = selectedBusinessTypes[0];
            setNumberOfBusinessTypes(city.title);
        }
        else if (selectedBusinessTypes.length === 2) {
            let businessType1 = selectedBusinessTypes[0];
            let businessType2 = selectedBusinessTypes[1];
            setNumberOfBusinessTypes(businessType1.title +', ' + businessType2.title);
        }
        else if (selectedBusinessTypes.length > 2) {
            let businessType1 = selectedBusinessTypes[0];
            let businessType2 = selectedBusinessTypes[1];
            setNumberOfBusinessTypes(businessType1.title +', ' + businessType2.title + '...');
        }
        else
            setNumberOfBusinessTypes("انتخاب نوع کسب و کار");
    }


    const submitBusinessTypes = () => {
        updateNumberOfBusinessTypes();
        handleBusinessTypeModalClose();
    }


    return (
        <div className="Header-style app-right-to-left">
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#">
                        <img className="Header-logo" src={logo} alt="Haraji Home"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item">
                                <LocationButton onClick={handleStatesShow} numberOfCities={numberOfCities}/>
                                <StateModal
                                    selectedCities={selectedCities}
                                    show={statesModalShow}
                                    onHide={handleStatesClose}
                                    onCityRemoved={onCityRemoved}
                                    onStateClick={handleCitiesShow}
                                />
                                <CityModal
                                    selectedCities={selectedCities}
                                    show={citiesModalShow}
                                    onHide={handleCitiesClose}
                                    onSubmit={submitCities}
                                    onCityAdded={onCityAdded}
                                    onCityRemoved={onCityRemoved}
                                    arr={cities}
                                />
                                <BusinessTypeButton onClick={handleBusinessTypeModalShow} numberOfBusinessTypes={numberOfBusinessTypes}/>
                                <BusinessTypeModal
                                    selectedBusinessTypes={selectedBusinessTypes}
                                    show={businessTypeModalShow}
                                    onHide={handleBusinessTypeModalClose}
                                    onSubmit={submitBusinessTypes}
                                    onBusinessTypeAdded={onBusinessTypeAdded}
                                    onBusinessTypeRemoved={onBusinessTypeRemoved}
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
                        <Cart number="2"/>
                    </div>
                </div>
            </nav>
        </div>);
}

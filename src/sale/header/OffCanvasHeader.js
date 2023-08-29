import '../../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {useState} from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchBar from "./searchBar/SearchBar";
import Cart from "./cart/Cart";
import LocationSelectButton from "./location/LocationSelectButton";
import StateModal from "./location/StateModal";
import CityModal from "./location/CityModal";
import BusinessTypeSelectButton from "./businessType/BusinessTypeSelectButton";
import BusinessTypeModal from "./businessType/BusinessTypeModal";
import ImagesPage from "./logo/ImagesPage";

export default function OffCanvasHeader() {


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
    const [numberOfCities, setNumberOfCities] = useState("شهر");

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
        } else if (selectedCities.length === 2) {
            let city1 = selectedCities[0];
            let city2 = selectedCities[1];
            setNumberOfCities(city1.title + ', ' + city2.title);
        } else if (selectedCities.length > 2) {
            let city1 = selectedCities[0];
            let city2 = selectedCities[1];
            setNumberOfCities(city1.title + ', ' + city2.title + '...');
        } else
            setNumberOfCities("شهر");
    }

    const submitCities = () => {
        updateNumberOfCities();
        handleStatesClose();
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
    const [numberOfBusinessTypes, setNumberOfBusinessTypes] = useState("نوع کسب و کار");


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
        } else if (selectedBusinessTypes.length === 2) {
            let businessType1 = selectedBusinessTypes[0];
            let businessType2 = selectedBusinessTypes[1];
            setNumberOfBusinessTypes(businessType1.title + ', ' + businessType2.title);
        } else if (selectedBusinessTypes.length > 2) {
            let businessType1 = selectedBusinessTypes[0];
            let businessType2 = selectedBusinessTypes[1];
            setNumberOfBusinessTypes(businessType1.title + ', ' + businessType2.title + '...');
        } else
            setNumberOfBusinessTypes("نوع کسب و کار");
    }


    const submitBusinessTypes = () => {
        updateNumberOfBusinessTypes();
        handleBusinessTypeModalClose();
    }


    return (
        <Navbar expand="lg" className="m-0 p-0 bg-body-tertiary col-12 ">
            <Container fluid>
                <Navbar.Brand><Cart number="2"/></Navbar.Brand>
                <div id="middle" className="d-block d-lg-none me-5">
                    <ImagesPage/>
                </div>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-LG`}/>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-LG`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-LG`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-LG`}>
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="app-right-to-left justify-content-start flex-grow-1">
                            <Nav.Link className="m-0 mt-3 mb-2 p-0">
                                <LocationSelectButton onClick={handleStatesShow}
                                                      numberOfCities={numberOfCities}/>
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
                            </Nav.Link>
                            <Nav.Link className="m-0 mt-2 p-0">
                                <BusinessTypeSelectButton onClick={handleBusinessTypeModalShow}
                                                          numberOfBusinessTypes={numberOfBusinessTypes}/>
                                <BusinessTypeModal
                                    selectedBusinessTypes={selectedBusinessTypes}
                                    show={businessTypeModalShow}
                                    onHide={handleBusinessTypeModalClose}
                                    onSubmit={submitBusinessTypes}
                                    onBusinessTypeAdded={onBusinessTypeAdded}
                                    onBusinessTypeRemoved={onBusinessTypeRemoved}
                                />
                            </Nav.Link>
                            <Nav.Link  className="m-0 mt-1 p-0"><SearchBar/></Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            <div id="right" className="d-none d-lg-block pe-2">
                <ImagesPage/>
            </div>
        </Navbar>
    );
}

import '../../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchBar from "./searchBar/SearchBar";
import Cart from "./cart/Cart";
import LocationSelectButton from "./location/LocationSelectButton";
import StateModal from "./location/StateModal";
import CityModal from "./location/CityModal";
import BusinessTypeSelectButton from "./businessType/BusinessTypeSelectButton";
import BusinessTypeModal from "./businessType/BusinessTypeModal";
import ImagesPage from "./logo/ImagesPage";

export default function Header(props) {

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
                                <LocationSelectButton onClick={props.handleStatesShow}
                                                      numberOfCities={props.numberOfCities}/>
                                <StateModal
                                    selectedCities={props.selectedCities}
                                    show={props.statesModalShow}
                                    onHide={props.onStatesClose}
                                    onCityRemoved={props.onCityRemoved}
                                    onStateClick={props.onStateClick}
                                />
                                <CityModal
                                    selectedCities={props.selectedCities}
                                    show={props.citiesModalShow}
                                    onHide={props.handleCitiesClose}
                                    onSubmit={props.submitCities}
                                    onCityAdded={props.onCityAdded}
                                    onCityRemoved={props.onCityRemoved}
                                    cities={props.cities}
                                />
                            </Nav.Link>
                            <Nav.Link className="m-0 mt-2 p-0">
                                <BusinessTypeSelectButton onClick={props.handleBusinessTypeModalShow}
                                                          numberOfBusinessTypes={props.numberOfBusinessTypes}/>
                                <BusinessTypeModal
                                    businessTypes={props.businessTypes}
                                    selectedBusinessTypes={props.selectedBusinessTypes}
                                    show={props.businessTypeModalShow}
                                    onHide={props.handleBusinessTypeModalClose}
                                    onSubmit={props.submitBusinessTypes}
                                    onBusinessTypeAdded={props.onBusinessTypeAdded}
                                    onBusinessTypeRemoved={props.onBusinessTypeRemoved}
                                />
                            </Nav.Link>
                            <Nav.Link className="m-0 mt-1 p-0"><SearchBar/></Nav.Link>
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

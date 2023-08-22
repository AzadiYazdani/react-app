import '../../App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ImagesPage from "./logo/ImagesPage";
import React from "react";
import Cart from "./cart/Cart";

export default function OffCanvasHeader() {
    return (
        <>
            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 ">
                    <Container fluid>
                        <div className="col-2"><Cart/></div>
                        <Navbar.Brand href="#">
                            <div className="d-block d-md-none">
                                <ImagesPage/>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 font-vazir">
                                    <Nav.Link href="#action1">Home</Nav.Link>
                                    <Nav.Link href="#action2">Link</Nav.Link>
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex app-right-to-left font-vazir" style={{width:'23rem'}} >
                                    <Form.Control
                                        type="search"
                                        placeholder="جستجوی نام فروشگاه یا کسب و کار"
                                        className="me-2"
                                        aria-label="جستجوی نام فروشگاه یا کسب و کار"
                                    />
                                    <Button type="submit" variant="outline-success">جستجو</Button>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        <div className="m-1 d-none d-md-block">
                            <ImagesPage/>
                        </div>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}
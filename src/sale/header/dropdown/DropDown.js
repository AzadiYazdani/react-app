import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";

export default function DropDown() {
    return (
        <>
            {['md'].map((expand) => (
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
            ))}
        </>
    );
}
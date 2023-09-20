import '../../../css/App.css';

import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default function SearchBar() {
    return (
        <div>
            <Form className="m-0 p-0 pt-1 d-flex app-right-to-left  font-vazir-15" style={{width: '23rem'}}>
                <Form.Control  style={{ fontSize: 'inherit'}}
                    type="search"
                    placeholder="جستجوی نام فروشگاه یا کسب و کار"
                    className="me-2 "
                    aria-label="جستجوی نام فروشگاه یا کسب و کار"
                />
                <Button type="submit" variant="outline-success" className=" font-vazir-12" style={{ fontSize: 'inherit'}}>جستجو</Button>
            </Form>
        </div>
);
};
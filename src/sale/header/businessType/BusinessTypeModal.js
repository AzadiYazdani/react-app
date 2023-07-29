import {Button, Modal} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import BusinessTypeButton from "./BusinessTypeButton";
import BusinessTypeSelected from "./BusinessTypeSelected";

export default function BusinessTypeModal(props) {

    const [businessTypes, setBusinessTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/businessType/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBusinessTypes(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (<Modal className="app-right-to-left"
                   {...props}
                   size="modal-sm"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter ">
                 نوع کسب و کار
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                {Array.isArray(props.selectedBusinessTypes) ? props.selectedBusinessTypes.map((item) => {
                    return <BusinessTypeSelected key={item.id} businessType={item}
                                         onBusinessTypeRemoved={props.onBusinessTypeRemoved}/>
                }) : ""}
            </div>
            {Array.isArray(businessTypes.response) ? businessTypes.response.map((item) => {
                return <BusinessTypeButton key={item.id} businessType={item}/>
            }) : ""}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onSubmit}>تایید</Button>
            <Button onClick={props.onHide}>انصراف</Button>
        </Modal.Footer>
    </Modal>);
}



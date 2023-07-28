import {Button, Modal} from 'react-bootstrap';
import React from 'react';
import CityButton from "./CityButton";

export default function CityModal(props) {


    return (<Modal className="app-right-to-left"
                   {...props}
                   size="modal-sm"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter ">
                انتخاب شهر
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {Array.isArray(props.arr.response) ? props.arr.response.map((item) => {

                const found = props.selectedCities.some(element => {
                    if (element.id.toString() === item.id.toString()) {
                        return true;
                    }
                });
                return <CityButton key={item.id} city={item}
                                   value={found}
                                   onCityAdded={props.onCityAdded}
                                   onCityRemoved={props.onCityRemoved}/>
            }) : ""}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onSubmit}>تایید</Button>
            <Button onClick={props.onHide}>انصراف</Button>
        </Modal.Footer>
    </Modal>);
}



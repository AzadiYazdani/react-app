import {Button, Modal} from 'react-bootstrap';
import React from 'react';
import BusinessTypeButton from "./BusinessTypeButton";
import BusinessTypeSelected from "./BusinessTypeSelected";

export default function BusinessTypeModal(props) {

    return (<Modal className="app-right-to-left"
                   {...props}
                   size="modal-sm"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
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
            {Array.isArray(props.businessTypes.response) ? props.businessTypes.response.map((item) => {
                return <BusinessTypeButton
                    key={item.id}
                    businessType={item}
                    onBusinessTypeAdded ={props.onBusinessTypeAdded }
                    onBusinessTypeRemoved={props.onBusinessTypeRemoved}/>
            }) : ""}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onSubmit}>تایید</Button>
            <Button onClick={props.onHide}>انصراف</Button>
        </Modal.Footer>
    </Modal>);
}



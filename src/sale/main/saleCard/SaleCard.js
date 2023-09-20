import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";
import './SaleCard.css'


export default function SaleCard(props) {
    return (
        <div className=" m-0 p-0">
            <Card className=" m-0 p-0 mb-3 mt-2 h-100 hover-overlay ripple align-items-lg-center text-center">
                <Card.Img variant="top" src="https://mdbootstrap.com/img/new/standard/nature/111.webp"/>
                <Card.Body className=" m-0 mt-2 p-0 app-right-to-left">
                    <Card.Title className="fw-bolder title-font"><b >{props.title}</b></Card.Title>

                    <Card.Text className="font-vazirmatn-10">

                        <p >{props.type}</p>
                        <p>مکان: <b>{props.city}، {props.place}</b></p>
                        محدوده قیمت:  از <b><span  style={{ color: 'red' }}> {props.lowPrice}</span></b> - تا {props.highPrice}
                        <p>درصد تخفیف:  از {props.lowPercent} - تا <b><span className="sample_farsi_digits" style={{ color: 'red' }}> {props.highPercent}</span></b></p>
                        آغاز حراج: <b> {props.saleStart} </b>
                        <br/>
                        به مدت <b> {props.saleLenght}روز </b>
                        <br/>
                        <p>پایان حراج: {props.saleEnd} </p>
                        {/*<span className="text-muted text-decoration-line-through">${props.oldPrice}</span>*/}
                        {/*${props.newPrice}*/}
                    </Card.Text>
                    <Button variant="primary">افزودن به علاقمندی ها</Button>
                </Card.Body>
            </Card>
        </div>
    )

}

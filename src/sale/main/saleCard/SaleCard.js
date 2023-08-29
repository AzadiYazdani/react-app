import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";
import './SaleCard.css'

export default function SaleCard(props) {
    return (
        <div className=" m-0 p-0">
            <Card className=" m-0 p-0 mb-3 h-100 hover-overlay ripple align-items-lg-center text-center">
                <Card.Img variant="top" src="https://mdbootstrap.com/img/new/standard/nature/111.webp"/>
                <Card.Body className=" m-0 p-0">
                    <Card.Title><h5 className="fw-bolder">{props.title}</h5></Card.Title>
                    <Card.Text >

                        <p>{props.type}</p>
                        <br/>
                        <p>مکان: <b>{props.city}، {props.place}</b></p>
                        ${props.lowPrice} - ${props.highPrice}
                        <span className="text-muted text-decoration-line-through">${props.oldPrice}</span>
                        ${props.newPrice}
                    </Card.Text>
                    <Button variant="primary">افزودن به علاقمندی ها</Button>
                </Card.Body>
            </Card>
        </div>
    )

}
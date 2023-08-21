import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";

export default function NewCard(props) {
    return (
        // style={{ width: '18rem' }}
        <div className="col-9 col-sm-6 col-md-4 col-lg-3 my-2">
            <Card className="h-100 bg-image hover-overlay align-items-lg-center text-center">
                <Card.Img variant="top" src="https://mdbootstrap.com/img/new/standard/nature/111.webp"/>
                <Card.Body>
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
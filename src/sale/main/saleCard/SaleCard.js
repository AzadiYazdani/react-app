import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";


export default function SaleCard(props) {

    const [leftDaysMessage, setLeftDaysMessage] = useState("هنوز وقت داری!");

    useEffect(() => {
        if (props.status === '0') {  //آغاز نشده
            setLeftDaysMessage(props.daysToStart + ' روز مونده به آغاز حراجی!' );
        } else if (props.status === '1') {  // آغاز شده
            setLeftDaysMessage( props.daysToEnd + ' روز دیگه وقت داری!');
        } else if (props.status === '2') {  // پایان یافته
            setLeftDaysMessage(props.daysToEnd + ' روزه تمام شده');

        }
    });


    return (
        <div className=" m-0 p-0 sample_farsi_digits font-Vazirmatn-15">
            <Card className=" m-0 p-0 mb-3 mt-2 h-100 hover-overlay ripple align-items-lg-center text-center ">
                <Card.Img variant="top" src="https://mdbootstrap.com/img/new/standard/nature/111.webp"/>
                <Card.Body className=" m-0 mt-2 p-0 app-right-to-left ">
                    <Card.Title className="fw-bolder me-4"><b >{props.title}</b><span
                        className="badge bg-danger me-2 rounded-5 rounded ">{props.highPercent}</span></Card.Title>
                    <Card.Text >
                        <p>{props.type}</p>
                        <p><b><i className='bi bi-geo-alt'/>{props.city}، {props.place}</b></p>
                        <span  className="text-key"> محدوده قیمت:</span>
                         <span className="text-value-normal-14"> {props.lowPrice} -  {props.highPrice}</span>
                        <br/>
                        <span  className="text-key">درصد تخفیف: </span>
                        <span  className="text-value-normal-14">{props.lowPercent} تا </span>
                        <span className="text-value-normal-14"> {props.highPercent}</span>
                        <br/>
                        {/*<span  className="text-key">آغاز حراج:</span>*/}
                        {/* /!*<b> {props.} </b>*!/*/}
                        <br/>
                        <span className="text-muted text-value-normal-12 text-decoration-line-through ">{props.oldPrice}</span>
                        <span className="important "> {props.newPrice}</span>
                        <span className="important "> تومان</span>

                        <p ><i className="bi bi-clock"/>{leftDaysMessage}</p>

                    </Card.Text>
                    <Button variant="danger">یادم بمونه!</Button>
                </Card.Body>
            </Card>
        </div>
    )

}

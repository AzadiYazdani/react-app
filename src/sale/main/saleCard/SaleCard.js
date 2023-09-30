import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {Rating, Tooltip} from "@mui/material";


export default function SaleCard(props) {

    const [leftDaysMessage, setLeftDaysMessage] = useState("هنوز وقت داری!");

    useEffect(() => {
        if (props.status === '0') {  //آغاز نشده
            setLeftDaysMessage(props.daysToStart + ' روز مونده به آغاز!');
        } else if (props.status === '1') {  // آغاز شده
            setLeftDaysMessage(props.daysToEnd + ' روز دیگه وقت داری!');
        } else if (props.status === '2') {  // پایان یافته
            // setLeftDaysMessage(props.daysToEnd + ' روزه تمام شده');
            setLeftDaysMessage('پایان یافته');

        }
    });

    function LeftDays(props) {
        if (props.status === '0') {
            return <i className="bi bi-clock"/>;
        }
    }


    return (
        // <div className="box">
        //     <div className="ribbon blue"><span className="red">Popular</span></div>
        // </div>
        <div className=" m-0 p-0 sample_farsi_digits font-Vazirmatn-15">
            <Card className="m-1 mb-1 p-0  h-100 hover-overlay ripple align-items-lg-center text-center ">
                <Card.Img variant="top" src="https://mdbootstrap.com/img/new/standard/nature/111.webp"/>
                <Card.Body className="mt-3 p-0 app-right-to-left ">
                    {/*<div className="box">*/}
                    {/*    <div className="ribbon blue"><span className="red">Popular</span></div>*/}
                    {/*<div className="ribbon-2 ">Sale!</div>*/}
                    <Card.Title className="fw-bolder me-4"><b>{props.title}</b>
                        <span className="badge bg-danger me-2 rounded-5 rounded">{props.highPercent}</span>
                    </Card.Title>
                    <Card.Text>
                        <p>{props.type}</p>
                        <p><b>
                            <svg width="20" height="20" viewBox="0 0 24 24" title="location" stroke="#D73948"
                                 fill="#D73948" stroke-width="0.1">
                                <path
                                    d="M12,2 C16.418278,2 20,5.66312472 20,10.1818181 C20,16.5454545 12,22 12,22 C12,22 4,16.5454545 4,10.1818181 C4,5.66312472 7.58172205,2 12,2 Z M12,7 C10.3431458,7 9,8.34314575 9,10 C9,11.6568542 10.3431458,13 12,13 C13.6568542,13 15,11.6568542 15,10 C15,8.34314575 13.6568542,7 12,7 Z"
                                    stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            {props.city}، {props.place}</b>
                        </p>
                        <p>
                            <span className="text-key"> تخفیف: </span>
                            <span className="text-value-normal-16">
                            {props.lowPercent}
                                <span className="text-key"> ...</span> {props.highPercent}
                            </span>

                            <br/>
                            <span className="text-key">  قیمت ها :</span>
                            <span className="text-value-normal-16">
                            <Tooltip title={<span className="text-value-normal-12">کمترین قیمت فروشگاه</span>}
                                     placement="top-end">
                                 {props.lowPrice}
                            </Tooltip>
                            <Tooltip title={<span className="text-value-normal-12">بیشترین قیمت فروشگاه</span>}
                                     placement="top-end">
                                <span className="text-key"> ...</span> {props.highPrice}
                            </Tooltip>
                            </span>
                        </p>
                        {/*<span  className="text-key">آغاز حراج:</span>*/}
                        {/* /!*<b> {props.} </b>*!/*/}

                        <span
                            className="text-muted text-value-normal-12 text-decoration-line-through ">{props.oldPrice}</span>
                        <span className="important ">&nbsp;&nbsp;&nbsp;{props.newPrice}</span>
                        <span className="important "> تومان</span>

                        {/*<p><LeftDays {...props}/>&nbsp;&nbsp;{leftDaysMessage}</p>*/}
                        <hr className="hr-divider"/>
                        <div className="row-cols-2 text-value-bold">
                            <Tooltip
                                title={<span className="text-value-normal-12">رضایت از حراجی های این فروشگاه</span>}
                                placement="top-end">
                                <span>{props.score}&nbsp;</span>
                                <i className="bi bi-star-fill yellow"/>
                            </Tooltip>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <Tooltip title={<span className="text-value-normal-12">افزودن به علاقمندی ها</span>}
                                     placement="top-end">
                                <span>
                                 <svg fill="#999" width="16" height="16" viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg" title="اطلاع رسانی">
                                     <g>
                                     <path
                                         d="M14.6 21.5C14 22.5 13 23 12 23c-.5 0-1-.1-1.5-.4-.5-.3-.8-.6-1.1-1.1-.3-.5-.1-1.1.4-1.4.5-.3 1.1-.1 1.4.4.1.1.2.3.4.4.5.3 1.1.1 1.4-.4.3-.5.9-.6 1.4-.4.5.2.5.9.2 1.4zM23 17c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1s.4-1 1-1c1.1 0 2-.9 2-2V9c0-4.4 3.6-8 8-8s8 3.6 8 8v5c0 1.1.9 2 2 2 .6 0 1 .4 1 1zm-4.5-1c-.3-.6-.5-1.3-.5-2V9c0-3.3-2.7-6-6-6S6 5.7 6 9v5c0 .7-.2 1.4-.5 2h13z"></path>
                                     </g>
                                 </svg>
                                </span>
                            </Tooltip>
                        </div>
                        {/*<div className="card">*/}

                        {/*    ...*/}
                        {/*</div>*/}
                    </Card.Text>
                    {/*</div>*/}
                </Card.Body>
                {/*<Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />*/}
            </Card>
        </div>
    )

}

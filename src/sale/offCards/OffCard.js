import React from 'react';
import './OffCard.css'

export default function OffCard(props) {
    return (
        <div className="col mb-5">
            <a href="##">
                <div className="card h-100">
                    <div className="bg-image hover-overlay ripple">
                        <img className="card-img-top" src={props.imageUrl} alt={props.alt}/>

                        <div className="card-body p-4">
                            <div className="text-center">
                                <h5 className="fw-bolder">{props.title}</h5>
                                <p>{props.type}</p>
                                <br/>
                                <p>مکان: <b>{props.city}، {props.place}</b></p>
                                ${props.lowPrice} - ${props.highPrice}
                                <span className="text-muted text-decoration-line-through">${props.oldPrice}</span>
                                ${props.newPrice}
                            </div>
                        </div>

                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button type="button" className="hover-overlay btn btn-primary">افزودن به علاقمندی
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>);
}
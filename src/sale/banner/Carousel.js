import React from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import "./Carousel.css";

export default function Carousel() {

    return (
        <div className="sale-carousel">

            <BootstrapCarousel
                indicators={true}
                controls={true}
                fade={true}
                interval={4000}
            >

                <BootstrapCarousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                        alt="بنر اول"
                    />

                    <BootstrapCarousel.Caption>
                        <h5>عنوان بنر اول</h5>
                        <p>
                            توضیح کوتاه برای بنر اول
                        </p>
                    </BootstrapCarousel.Caption>
                </BootstrapCarousel.Item>


                <BootstrapCarousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                        alt="بنر دوم"
                    />

                    <BootstrapCarousel.Caption>
                        <h5>عنوان بنر دوم</h5>
                        <p>
                            توضیح کوتاه برای بنر دوم
                        </p>
                    </BootstrapCarousel.Caption>
                </BootstrapCarousel.Item>


                <BootstrapCarousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                        alt="بنر سوم"
                    />

                    <BootstrapCarousel.Caption>
                        <h5>عنوان بنر سوم</h5>
                        <p>
                            توضیح کوتاه برای بنر سوم
                        </p>
                    </BootstrapCarousel.Caption>
                </BootstrapCarousel.Item>

            </BootstrapCarousel>

        </div>
    );
}

import React from "react";
import Card from "react-bootstrap/Card";
import { Tooltip } from "@mui/material";

export default function SaleCard(props) {

    const getStatusMessage = () => {

        if (props.status === "0") {
            return `${props.daysToStart ?? 0} روز مانده به آغاز`;
        }

        if (props.status === "1") {
            return `${props.daysToEnd ?? 0} روز دیگر`;
        }

        if (props.status === "2") {
            return "پایان یافته";
        }

        return "";
    };

    const statusMessage = getStatusMessage();

    return (
        <div className="sale-card-wrapper sample_farsi_digits font-Vazirmatn-15">

            <Card className="m-0 mb-2 p-0 h-100 hover-overlay ripple align-items-lg-center text-center">
                {/* تصویر */}
                <Card.Img
                    variant="top"
                    src={props.imageUrl}
                    alt={props.alt || props.title}
                />

                <Card.Body className="p-2 app-right-to-left">

                    {/* عنوان و درصد تخفیف */}
                    <div className="d-flex justify-content-between align-items-center mb-2">

                        <Card.Title className="fw-bold m-0">
                            {props.title}
                        </Card.Title>

                        {props.highPercent && (
                            <span className="badge bg-danger rounded-pill">
                                {props.highPercent}
                            </span>
                        )}

                    </div>

                    {/* نوع کسب و کار */}
                    {props.type && (
                        <div className="text-muted mb-2">
                            {props.type}
                        </div>
                    )}

                    {/* مکان */}
                    {(props.city || props.place) && (
                        <div className="mb-2 fw-bold">

                            <i
                                className="bi bi-geo-alt-fill text-danger me-1"
                                title="مکان"
                            />

                            {props.city}

                            {props.place && (
                                <>
                                    {"، "}
                                    {props.place}
                                </>
                            )}

                        </div>
                    )}

                    {/* درصد تخفیف */}
                    {(props.lowPercent || props.highPercent) && (
                        <div className="mb-2">

                            <span className="text-muted">
                                تخفیف:
                            </span>

                            <strong className="ms-1">
                                {props.lowPercent}

                                {props.highPercent && (
                                    <>
                                        {" ... "}
                                        {props.highPercent}
                                    </>
                                )}
                            </strong>

                        </div>
                    )}

                    {/* محدوده قیمت */}
                    {(props.lowPrice || props.highPrice) && (
                        <div className="mb-2">

                            <span className="text-muted">
                                قیمت:
                            </span>

                            {props.lowPrice && (
                                <Tooltip
                                    title="کمترین قیمت فروشگاه"
                                    placement="top"
                                >
                                    <span className="ms-1">
                                        {props.lowPrice}
                                    </span>
                                </Tooltip>
                            )}

                            {props.highPrice && (
                                <>
                                    <span className="mx-1">
                                        ...
                                    </span>

                                    <Tooltip
                                        title="بیشترین قیمت فروشگاه"
                                        placement="top"
                                    >
                                        <span>
                                            {props.highPrice}
                                        </span>
                                    </Tooltip>
                                </>
                            )}

                        </div>
                    )}

                    {/* قیمت قبل و بعد */}
                    {(props.oldPrice || props.newPrice) && (
                        <div className="mb-2">

                            {props.oldPrice && (
                                <span className="text-muted text-decoration-line-through">
                                    {props.oldPrice}
                                </span>
                            )}

                            {props.newPrice && (
                                <span className="important fw-bold ms-2">
                                    {props.newPrice} تومان
                                </span>
                            )}

                        </div>
                    )}

                    <hr className="hr-divider"/>

                    {/* پایین کارت */}
                    <div className="d-flex justify-content-between align-items-center">

                        {/* وضعیت حراج */}
                        <div className="text-muted text-value-normal-12">

                            {props.status === "0" && (
                                <i className="bi bi-clock me-1"/>
                            )}

                            {statusMessage}

                        </div>

                        {/* امتیاز و علاقه مندی */}
                        <div className="d-flex align-items-center gap-3">

                            {props.score !== undefined &&
                                props.score !== null &&
                                props.score !== "" && (

                                    <Tooltip
                                        title="رضایت از حراجی‌های این فروشگاه"
                                        placement="top"
                                    >
                                        <span className="fw-bold">
                                            {props.score}
                                            <i className="bi bi-star-fill text-warning ms-1"/>
                                        </span>
                                    </Tooltip>

                                )}

                            <Tooltip
                                title="افزودن به علاقمندی‌ها"
                                placement="top"
                            >
                                <i
                                    className="bi bi-heart"
                                    role="button"
                                    style={{ cursor: "pointer" }}
                                />
                            </Tooltip>

                        </div>

                    </div>

                </Card.Body>

            </Card>

        </div>
    );
}

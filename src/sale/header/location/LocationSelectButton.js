import React from "react";

export default function LocationSelectButton({
    onClick,
    numberOfCities
}) {
    return (
        <div className="m-0 p-0">
            <button
                type="button"
                className="m-0 btn btn-light btn-rounded text-nowrap"
                onClick={() => {
                    console.log("LOCATION BUTTON CLICKED");
                    onClick();
                }}
            >
                <div className="font-vazir-13">
                    <i className="bi bi-geo-alt me-1"></i>

                    {numberOfCities > 0
                        ? `${numberOfCities} شهر`
                        : "شهر"
                    }
                </div>
            </button>
        </div>
    );
}

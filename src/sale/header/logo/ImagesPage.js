import React from "react";
import logo from "../../../resource/1.jpg";

export default function ImagesPage() {

    return (
        <div className="header-logo">
            <img
                src={logo}
                alt="حراجی"
                className="header-logo-image"
            />
        </div>
    );
}

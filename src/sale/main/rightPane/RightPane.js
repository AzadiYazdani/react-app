import BusinessTypeButton from "../../header/businessType/BusinessTypeButton";
import React from "react";

export default function RightPane(props) {

    return (
    <div className="m-0 p-0 col-md-2 hiding d-none d-md-block rounded-2 bg-danger justify-content-start "  >
            {Array.isArray(props.businessTypes.response) ? props.businessTypes.response.map((item) => {
                return <BusinessTypeButton
                    key={item.id}
                    businessType={item}
                />
            }) : ""}
        </div>
    )

}
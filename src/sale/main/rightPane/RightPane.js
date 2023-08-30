import BusinessTypeButton from "../../header/businessType/BusinessTypeButton";
import React from "react";

export default function RightPane(props) {

    return (
    <div className="m-0 p-0 col-md-2 hiding d-none d-md-block rounded-2 bg-danger justify-content-start "  >
            {Array.isArray(props.businessTypes.response) ? props.businessTypes.response.map((item) => {

                const found = props.selectedBusinessTypes.some(element => {
                    if (element.id.toString() === item.id.toString()) {
                        return true;
                    }
                });

                return <BusinessTypeButton
                    key={item.id}
                    businessType={item}
                    value={found}
                    onBusinessTypeAdded ={props.onBusinessTypeAdded }
                    onBusinessTypeRemoved={props.onBusinessTypeRemoved}/>
            }) : ""}
        </div>
    )

}
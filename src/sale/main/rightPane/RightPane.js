import BusinessTypeButton from "../../header/businessType/BusinessTypeButton";
import React from "react";

export default function RightPane({ businessType }) {

    return (
        <div className="m-0 p-0 col-2 rounded-2 bg-danger">

            {Array.isArray(businessType.businessTypes.response)
                ? businessType.businessTypes.response.map(item => {

                    const found = businessType.selectedBusinessTypes.some(
                        element =>
                            element.id.toString() === item.id.toString()
                    );

                    return (
                        <BusinessTypeButton
                            key={item.id}
                            businessType={item}
                            value={found}
                            onBusinessTypeAdded={
                                businessType.onBusinessTypeAdded
                            }
                            onBusinessTypeRemoved={
                                businessType.onBusinessTypeRemoved
                            }
                        />
                    );
                })
                : null}

        </div>
    );
}

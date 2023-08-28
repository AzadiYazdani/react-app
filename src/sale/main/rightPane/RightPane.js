import BusinessTypeButton from "../../header/businessType/BusinessTypeButton";
import React, {useEffect, useState} from "react";

export default function RightPane() {
    const [businessTypes, setBusinessTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/businesstype/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBusinessTypes(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
    <div className="m-0 p-0 col-md-2 d-none d-md-block rounded-2 bg-danger justify-content-start "  >
            {Array.isArray(businessTypes.response) ? businessTypes.response.map((item) => {
                return <BusinessTypeButton
                    key={item.id}
                    businessType={item}
                />
            }) : ""}
        </div>
    )

}
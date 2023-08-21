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
        <div className="col-md-2 app-left-to-right d-none d-md-block bg-body-secondary border border-1 rounded-2"  >
            {Array.isArray(businessTypes.response) ? businessTypes.response.map((item) => {
                return <BusinessTypeButton
                    key={item.id}
                    businessType={item}
                />
            }) : ""}
        </div>
    )

}
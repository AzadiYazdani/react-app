
import React from "react";

export default function BusinessTypeButton({
    businessType,
    value,
    onBusinessTypeAdded,
    onBusinessTypeRemoved
}) {

    const handleChange = (event) => {
        if (event.target.checked) {
            onBusinessTypeAdded(
                event.target.value,
                event.target.name
            );
        } else {
            onBusinessTypeRemoved(
                event.target.value,
                event.target.name
            );
        }
    };

    return (
        <div className="container m-0 ps-0 app-right-to-left">

            <label
                className="row-cols-1 m-0 p-0"
                htmlFor={businessType.id}
            >
                {businessType.title}
            </label>

            <input
                className="row-cols-1 m-0 p-0"
                type="checkbox"
                id={businessType.id}
                name={businessType.title}
                value={businessType.id}
                checked={value}
                onChange={handleChange}
            />

            <hr className="hr-divider" />
        </div>
    );
}
